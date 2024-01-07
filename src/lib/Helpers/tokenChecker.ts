import type { DecodedToken } from "$lib/types";
import type { Session } from "@supabase/supabase-js";
import type { RequestEvent } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const jwtKey = import.meta.env.VITE_JWT_SECRET_KEY as string;


export const isTokenTrue = (event: RequestEvent) =>
{
    const {cookies} = event;

    try {
        const session: Session = JSON.parse(cookies.get("sb-fmnyedztmvguuxqfmwan-auth-token") as string);
        
        const {user:{role}} = session;
        
        const decode = jwt.verify(session.access_token, jwtKey) as DecodedToken;

        if(role === decode.role){
            return decode.role as "admin" | "authenticated"
        }
        else return "fraud cookie";
        
    } catch (error) {
        
        return "not valid cookie"
    };

}