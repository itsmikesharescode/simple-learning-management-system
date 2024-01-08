import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import {ZodError, z} from "zod";
import { generateCode } from "$lib/Helpers/generateCode";
import { decryptMessage } from "$lib/Helpers/clientEncryption";
import type { CreatedCLassTB } from "$lib/types";

const createClassSchema = z.object({
    className: z.string().min(1, {message: "Class name must not be empty."}),
    classDetails: z.string().min(5, {message: "Enter a valid details."}),
});

const dropClassSchema = z.object({
    confirm: z.string().refine(value => value === "Drop this class.", {message: "Your input does not match the instructions."}),
    classRef: z.string().min(1, {message: "Class is missing."}),
})

export const load: PageServerLoad = async ({locals: { supabase, getSession }}) => {

    const session = await getSession();

    if(session){
        const {data:getClass, error} = await supabase.from("created_class_tb").select("*").eq("user_id", session.user.id);

        return {session, getClass};
    };
    
};

export const actions: Actions = {

    createClass: async ({request, locals: {supabase, getSession}}) =>
    {
        const formData = Object.fromEntries(await request.formData());
        const session = await getSession();
        try {
            const code = generateCode(8);
            const result = createClassSchema.parse(formData);
            const {className, classDetails} = result;

            if(session){

                const { error:insertClassError } = await supabase.from("created_class_tb").insert([{
                    class_name: className,
                    class_details: classDetails,
                    class_code: code,
                    class_creator: session.user.user_metadata.fullname,
                    user_id: session.user.id,
                }]);
    
                if(insertClassError) return fail(402, {msg: insertClassError.message});
                else {
                    const {data:getClass, error:getClassError} = await supabase.from("created_class_tb").select("*").eq("user_id", session.user.id);
                    if(getClassError) return fail(402, {msg: getClassError.message});
                    else return fail(200, {msg: "Class created.", session, getClass});
                };

            }else throw redirect(302, "/sign-in?You-have-to-login");
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
        
        };
    },

    dropClass: async ({request, locals: {supabase, getSession}}) =>
    {
        const formData = Object.fromEntries(await request.formData());
        const session = await getSession();

        try {
            const result = dropClassSchema.parse(formData);

            if(session){
                const classRef = JSON.parse(decryptMessage(result.classRef)) as CreatedCLassTB;

                const {error: deleteError} = await supabase.from("created_class_tb").delete().match({id: classRef.id, user_id: session.user.id});

                if(deleteError) return fail(402, {msg: deleteError.message});
                else {
                    const {data:getClass, error:getClassError} = await supabase.from("created_class_tb").select("*").eq("user_id", session.user.id);
                    if(getClassError) return fail(402, {msg: getClassError.message});
                    else return fail(200, {msg: "Class deleted.", session, getClass});
                }

            }else throw redirect(302, "/sign-in?You-have-to-login");

            

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            
            return fail(403, {errors: fieldErrors});
        }
    }
};