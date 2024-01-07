import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {ZodError, z} from "zod";
import { isTokenTrue } from "$lib/Helpers/tokenChecker";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required"})
});

export const load: PageServerLoad = async ({cookies, locals: {getSession}}) => {

    const session = await getSession();

    if(session){
        const checking = isTokenTrue(session);
        if(checking === "admin") return redirect(302, "/teacher/create-class");
        else if(checking === "authenticated") return redirect(302, "/learner/my-classes");  
        else if(checking === "fraud cookie") cookies.delete("sb-fmnyedztmvguuxqfmwan-auth-token", {path: "/"});
        
    }else cookies.delete("sb-fmnyedztmvguuxqfmwan-auth-token", {path: "/"});


};

export const actions: Actions = {

    signIn: async ({request, locals: {supabase}}) =>
    {
        const formdata = Object.fromEntries(await request.formData());
        console.log("AW")

        try {

            const result = loginSchema.parse(formdata);
            const {email, password} = result;

            const {data: {session}, error:loginError} = await supabase.auth.signInWithPassword({email, password});
            if(session) return fail(200, {msg: "Login sucess.", session});
            else if(loginError) return fail(402, {msg: loginError.message});
            
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            console.log(fieldErrors)
            return fail(403, {errors: fieldErrors});
        }
    }
};