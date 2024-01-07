import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {ZodError, z} from "zod";
import { isTokenTrue } from "$lib/Helpers/tokenChecker";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required"})
});

export const load: PageServerLoad = async (event) => {

    const checking = isTokenTrue(event);

    if(checking === "admin") return redirect(302, "/teacher/create-class");
    else if(checking === "authenticated") return redirect(302, "/student/my-classes");
    else if(checking === "fraud cookie") {
        event.cookies.delete("sb-fmnyedztmvguuxqfmwan-auth-token", {path: "/"});
        redirect(302, "/sign-in?msg=Fraud-cookie-detected-You-pentesting?.");
    }
    else if(checking === "not valid cookie") {
        event.cookies.delete("sb-fmnyedztmvguuxqfmwan-auth-token", {path: "/"});
        console.log("not valid cookie")
    }

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