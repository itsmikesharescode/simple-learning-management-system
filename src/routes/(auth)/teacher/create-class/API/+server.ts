import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({request, locals: {supabase}}) =>
{
    const {classCode} = await request.json() as {classCode: string};

    const returnQ = () => {
        return `id, created_at, user_email, class_code, fullname`;
    };

    const { data:enrolledLearners, error: enrolledLearnersError } = await supabase.from("joined_class_tb").select(returnQ()).eq("class_code", classCode);

    if(enrolledLearnersError) return json({status: 402, msg: enrolledLearnersError.message});

    return json({status:200, enrolledLearners});

}