
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

export type LearnersType = {
    id: number
    created_at: string
    user_email: string
    class_code: string
    fullname: string
}

export type ClassName = {
    id: number
    created_at: string
    class_name: string
    class_code: string
}

//created announcement tb
export type CreatedAnnouncementTB = {
    id: number
    created_at: string
    created_class_id: number
    created_class_name: string
    created_class_code: string
    announcement_title: string
    announcement_details: string
    announcement_creator: string
}