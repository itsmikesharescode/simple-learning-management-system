import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {ZodError, z} from "zod";


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required"})
});

const registerSchema = z.object({
    whoareyou: z.string().min(1, {message: "Please select who you are."}).max(10, {message: "Please follow what the front end said."}),
    fName: z.string().min(1, {message: "First name is required."}).max(20, {message: "First name must be less than 20 characters."}),
    mName: z.string().min(1, {message: "Middle name is required."}).max(20, {message: "Middle name must be less than 20 characters."}),
    lName: z.string().min(1, {message: "Last name is required."}).max(20, {message: "Last name must be less than 20 characters."}),
    email: z.string().email().max(30, {message: "Email must be less than 20 characters."}),
    password: z.string().min(1, {message: "Password is required."}).max(20, {message: "Password must be less than 20 characters."}),
    confirmPassword: z.string().min(1, {message: "Confirm password is required."}),
});

export const load: PageServerLoad = async ({cookies, locals: { getSession, checkRole }}) => {

    const session = await getSession();

    if(session){
        const value = await checkRole();
        if(value === "has teacher") throw redirect(302, "/teacher/create-class");
        else if(value === "no teacher") throw redirect(302, "/learner/my-classes");
        else if(value === "has error") {
            cookies.delete("sb-jiertmisgqphuonnvwrx-auth-token", {path: "/"});
            throw redirect(302, "/?there-is-an-error");
        }
    }

    
};

export const actions: Actions = {

    signIn: async ({request, locals: {supabase}}) =>
    {
        const formdata = Object.fromEntries(await request.formData());

        try {

            const result = loginSchema.parse(formdata);
            const {email, password} = result;

            const {data: {session}, error:loginError} = await supabase.auth.signInWithPassword({email, password});
            if(session) return fail(200, {msg: "Login sucess.", session});
            else if(loginError) return fail(402, {msg: loginError.message});
            
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
        };
    },

    signUp: async ({request, locals: {supabase}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = registerSchema.parse(formData);

            const {email, password, fName, mName, lName, whoareyou, confirmPassword} = result;

            if(password === confirmPassword){
                const {data: {session}, error:signUpError} = await supabase.auth.signUp({email, password, options: {data: {fullname: `${lName}, ${fName} ${mName}.`, role: whoareyou}}});
                if(session){
                    const {error:userInsertError} = await supabase.from("users_list").insert([{
                        user_id: session.user.id,
                        role_name: whoareyou,
                    }]);

                    if(userInsertError) return fail(402, {msg: userInsertError.message});
                    else return fail(200, {msg: "Sign up success.", session});
                }

            }else return fail(402, {msg: "Password not same."});

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
        }

    },

    resetPass: async () =>
    {

    },

    signOut: async ({locals: {supabase}}) =>
    {
        const {error:signOutError} = await supabase.auth.signOut();

        if(signOutError) return fail(402, {msg: signOutError.message});
        else return fail(200, {msg: "Sign out success."});
    }
};