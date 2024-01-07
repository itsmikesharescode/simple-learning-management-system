
export type ServerNews<T> = {
    status: number
    type: string
    data: T
}

export type DecodedToken = {
    aud: string
    exp: number
    iat: number
    iss: string
    sub: string
    email: string
    phone: string
    app_metadata: {
        provider: string
        providers: string[]
    }
    user_metadata: {
        fullname: string
    }
    role: string
    aal: string
    amr: {
        method: string
        timestamp: number
    }[]
    session_id: string
}

  