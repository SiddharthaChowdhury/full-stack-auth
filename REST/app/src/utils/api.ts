export const domain: string = "http://localhost:3000";

export interface IAPI {
    url: string;
    method: string
}

export const API = {
    LOGIN: {url: domain+'/user-login', method: 'post'},
    // UPLOAD: {url: domain+'/upload', method: 'post'},
    VERIFY_USER: {url: '/token-verify', method: 'get'},
};

// todo: need a script to pull these information from `ws-nas` repo
export interface IAuthRequest {
    email: string;
    password: string;
}