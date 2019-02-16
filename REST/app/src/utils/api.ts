export const domain: string = "http://localhost:3000";

export interface IAPI {
    url: string;
    method: string
}

export const API = {
    LOGIN: {url: domain+'/user-login', method: 'post'},
    VERIFY_USER: {url: domain+'/token-verify', method: 'get'},
};

// todo: need a script to pull these information from `ws-nas` repo
export interface IAuthRequest {
    email: string;
    password: string;
}