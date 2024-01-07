import type { DecodedToken } from "$lib/types";
import type { Session } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const jwtKey = import.meta.env.VITE_JWT_SECRET_KEY as string;


export const isTokenTrue = ( session: Session ) =>
{    
    const {user:{role}} = session;
    console.log(role)
    const decode = jwt.verify(session.access_token, jwtKey) as DecodedToken;

    if(role === decode.role) {
        console.log(decode.role)
        return decode.role as "admin" | "authenticated";
    }
    
    else return "fraud cookie";

};