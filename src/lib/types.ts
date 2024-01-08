
export type ServerNews<T> = {
    status: number
    type: string
    data: T
}

//created class tb types
export type CreatedCLassTB = {
    id: number
    created_at: string
    class_name: string 
    class_details: string
    class_code: string
    class_creator: string
    user_id: number
};

  