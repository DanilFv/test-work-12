export interface IUserFields{
    _id: string;
    username: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    avatar: string | null;
}

interface RegisterResponse {
    message: string;
    user: IUserFields;
}

interface LoginMutation {
    username: string;
    password: string;
}