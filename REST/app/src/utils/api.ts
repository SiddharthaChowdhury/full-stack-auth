export const domain: string = "http://localhost:3000";

export interface IAPI {
    url: string;
    method: string
}

export const API = {
    LOGIN: {url: domain+'/login', method: 'post'},
    UPLOAD: {url: domain+'/upload', method: 'post'},
    VERIFY_USER: {url: '/verify', method: 'get'},
};

// todo: need a script to pull these information from `ws-nas` repo
export interface IAuthRequest {
    email: string;
    password: string;
}
export interface IAuthResponse {
    token?: string;
    error?: string;
}

export interface IFiles {
    name: String;
    location?: String;
}
export interface IVerifyResponse {
    email: string;
    password?: string;
    files?: IFiles[]
}