export interface IUser {
    _id?: any;
    name?: string;
    email: string;
    password: string;
    createdAt?: string;
}

export interface ICreateUserRequest extends IUser {}
export interface ILoginRequest {
    email: string;
    password: string;
}