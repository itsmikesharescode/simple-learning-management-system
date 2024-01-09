
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {ZodError, z} from "zod";
import type { PostgrestError } from "@supabase/supabase-js";

const joinClassSchema = z.object({
    classCode: z.string().min(8, {message: "Invalid class code."}),

});


export const load: PageServerLoad = async ({locals: {getSession, supabase, checkRole}}) => {
  
    const session = await getSession();

    if(session){
        const returnQ = () => {
            return `id, user_email, class_code, fullname, created_class_tb(id, class_code, class_name, created_at, class_creator, class_details)`;
        };

        const {data:getDedicatedClass, error:getDedicatedClassError} = await supabase.from("joined_class_tb").select(returnQ()).eq("user_id", session.user.id);

        if(getDedicatedClassError) console.log(getDedicatedClassError.message);
        
        else if (getDedicatedClass) return {getDedicatedClass, session};

    }else throw redirect(302, "/sign-in?You-have-to-login");

    
};


export const actions: Actions = {

    joinClass: async ({request, locals: {supabase, getSession}}) =>
    {   
        const formData = Object.fromEntries(await request.formData());
        const session = await getSession();

        try {
            
            const result = joinClassSchema.parse(formData);
            
            if(session){

                const returnQ = () => {
                    return `id, user_email, class_code, fullname, created_class_tb(id, class_code, class_name, created_at, class_creator, class_details)`;
                };

                const {data:isAlreadyJoined, error:isAlreadyJoinedError} = await supabase.rpc("is_already_joined", {p_class_code: result.classCode}) as {data: boolean, error: PostgrestError | null};

                if(isAlreadyJoined) return fail(402, {msg: "You have already joined this class."});
                else if(isAlreadyJoinedError) return fail(402, {msg: isAlreadyJoinedError.message});
                else {

                    const {error:insertError} = await supabase.from("joined_class_tb").insert([{
                        user_id: session.user.id,
                        user_email: session.user.email,
                        class_code: result.classCode,
                        fullname: session.user.user_metadata.fullname,
                    }]);

                    if(insertError) return fail(402, {msg: insertError.message});

                    else {
                        const {data:getDedicatedClass, error:getDedicatedClassError} = await supabase.from("joined_class_tb").select(returnQ()).eq("user_id", session.user.id);

                        if(getDedicatedClassError) return fail(402, {msg: getDedicatedClassError.message});
                        else if(getDedicatedClass) return {msg: "Joined success.", session, getDedicatedClass};
                    };

                };

            }else throw redirect(302, "/sign-in?You-have-to-login");


        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(403, {errors: fieldErrors});
        };
    }
};