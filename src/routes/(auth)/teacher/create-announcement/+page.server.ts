import { fail, type Actions } from "@sveltejs/kit";
import {ZodError, z} from "zod";

const createAnnouncementSchema = z.object({
    className: z.string().min(1, {message: "Class name must not be empty."}),
    classTitle: z.string().min(5, {message: "Class announcement title must not be empty."}),
    announcementDetails: z.string().min(5, {message: "Announcement details must not be empty."}),
});

export const actions: Actions = {

    createAnnouncement: async ({request, locals: {supabase, getSession}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = createAnnouncementSchema.parse(formData);
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
           
        }
    }
};