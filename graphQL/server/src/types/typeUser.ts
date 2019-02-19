export interface IUser {
    _id?: any;
    name?: string;
    email: string;
    password: string;
    createdAt?: string;
}

export interface ICreateUserRequest extends IUser {}
export interface IAuthInfo{
    country?: string;
    city?: string;
    region?: string;
    ip?: string;
    browser?: string;
    version?: string;
    os?: string;
    source?: string;
}
export interface ILoginRequest extends IAuthInfo{
    email: string;
    password: string;
}