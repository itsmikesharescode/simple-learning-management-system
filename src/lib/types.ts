
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

//dedicated class tb types
export type JoinedAndCreatedClassTB = {
    id: number
    created_at: string
    user_id: string
    user_email: string
    class_code: string
    fullname: string
    created_class_tb: CreatedCLassTB
}
