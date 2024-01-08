
import { createServerClient } from '@supabase/ssr';
import type { PostgrestError } from '@supabase/supabase-js';
import { redirect, type Handle } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve, }) => {

    event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options ) => {
                event.cookies.set(key, value, options = { path: "/"} )
            },
            remove: (key, options ) => {
                event.cookies.delete(key, options = { path: "/"} )
            },
        },
    });

    event.locals.supabaseAdmin = createServerClient(supabaseURL, supabaseAdminKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options ) => {
                event.cookies.set(key, value, options as CookieSerializeOptions & { path: string } )
            },
            remove: (key, options ) => {
                event.cookies.delete(key, options as CookieSerializeOptions & { path: string } )
            },
        },
        
    });

    event.locals.getSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession()
        return session
    };

    event.locals.checkRole = async () => {

        const {data:hasTeacher, error} = await event.locals.supabase.rpc("is_teacher") as {data: boolean | null, error: PostgrestError | null};

        if(hasTeacher) return "has teacher";
        else if(error) return "has error";
        else return "no teacher";

    };

    const session = await event.locals.getSession();

    // route protection
    if(event.url.pathname.startsWith("/learner/")){
       
        if(session){
            const value = await event.locals.checkRole();

            if(value === "has error"){

                event.cookies.delete("sb-jiertmisgqphuonnvwrx-auth-token", {path: "/"});
                throw redirect(302, "/?there-is-an-error");

            }else if(value === "has teacher") throw redirect(302, "/teacher/create-class");

        }else throw redirect(302, "/sign-in?you-have-to-sign-in")

    }else if(event.url.pathname.startsWith("/teacher/")){

        if(session){
            const value = await event.locals.checkRole();
            
            if(value === "has error"){

                event.cookies.delete("sb-jiertmisgqphuonnvwrx-auth-token", {path: "/"});
                throw redirect(302, "/?there-is-an-error");

            }else if(value !== "has teacher") throw redirect(302, "/learner/my-classes");

        }else throw redirect(302, "/sign-in?you-have-to-sign-in");
    };


    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    });
}