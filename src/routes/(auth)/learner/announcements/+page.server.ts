import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals: {supabase, getSession}}) => {
    
    const session = await getSession();

    let dedicatedAnnouncement: any[] = [];

    if(session){
        const {data:joinedClass, error} = await supabase.from("joined_class_tb").select("class_code").match({user_id: session?.user.id});

        if(joinedClass){
            const {data: announcements, error:announcementsError} = await supabase.from("created_announcement_tb").select("id, created_at, created_class_id, created_class_code, announcement_title, announcement_details, announcement_creator, created_class_name");

            if(announcements){
                announcements.map(outerItem => {
                    joinedClass.map(innerItem => {
                        outerItem.created_class_code === innerItem.class_code ? dedicatedAnnouncement.push(outerItem) : console.log("No match");
                    });
                });

                return {dedicatedAnnouncement, session};
            };

        };
    }

};

