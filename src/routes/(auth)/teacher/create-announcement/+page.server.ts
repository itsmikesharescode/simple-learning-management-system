import { fail, redirect, type Actions } from "@sveltejs/kit";
import {ZodError, z} from "zod";
import type { PageServerLoad } from "./$types";
import { decryptMessage } from "$lib/Helpers/clientEncryption";
import type { ClassName } from "$lib/types";

const createAnnouncementSchema = z.object({
    className: z.string().min(1, {message: "Class name must not be empty."}),
    classTitle: z.string().min(5, {message: "Class announcement title must not be empty."}),
    announcementDetails: z.string().min(5, {message: "Announcement details must not be empty."}),
});

export const load: PageServerLoad = async ({locals: {supabase, getSession}}) => {
  
    const session = await getSession();

    if(session){
        const {data:className, error:classNameError} = await supabase.from("created_class_tb").select("id, created_at, class_name, class_code").eq("user_id", session.user.id);

        if(className){
            const {data:getAnnouncement, error:getAnnouncementError} = await supabase.from("created_announcement_tb")
            .select("id, created_at, created_class_id, created_class_name, created_class_code, announcement_title, announcement_details, announcement_creator")
            .eq("user_id", session.user.id);

            if(getAnnouncement) return {session, className, getAnnouncement};

        }
    };
    

};

export const actions: Actions = {

    createAnnouncement: async ({request, locals: {supabase, getSession}}) =>
    {
        const formData = Object.fromEntries(await request.formData());
        const session = await getSession();

        try {
            const result = createAnnouncementSchema.parse(formData);
           
            if(session){
                const className: ClassName = JSON.parse(decryptMessage(result.className));

                const { error:insertError } = await supabase.from("created_announcement_tb").insert([{
                    created_class_id: className.id,
                    created_class_name: className.class_name,
                    created_class_code: className.class_code,
                    announcement_title: result.classTitle,
                    announcement_details: result.announcementDetails,
                    announcement_creator: session.user.user_metadata.fullname,
                    user_id: session.user.id,
                }]);

                if(insertError) return fail(402, {msg: insertError.message});
                else{
                    const {data:getAnnouncement, error:getAnnouncementError} = await supabase.from("created_announcement_tb")
                    .select("id, created_at, created_class_id, created_class_name, created_class_code, announcement_title, announcement_details, announcement_creator")
                    .eq("user_id", session.user.id);

                    if(getAnnouncementError) return fail(402, {msg: getAnnouncementError.message});
                    else if(getAnnouncement) return fail(200, {msg: "Announcement created.", session, getAnnouncement});
                }
                
            }else throw redirect(302, "/sign-in?you-have-to-sign-in");

            
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
           
        }
    }
};