import axios, {AxiosError, AxiosResponse} from "axios";
import {IdPersistence, utilPersistence} from "../../utils/utilPersistence";
import {API, IAPI, IAuthRequest, IVerifyResponse} from "../../utils/api";

class Auth {
    public auth = (authInfo: IAuthRequest, cb: (err?: Error, msg?: string) => any) => {
        if (!authInfo.email || !authInfo.password) {
            cb(new Error("Email and Password is mandatory"));
            return;
        }

        const api: IAPI = API.LOGIN;
        axios({
            method: api.method,
            url: api.url,
            data: authInfo
        })
        .then(function (response: AxiosResponse) {
            utilPersistence.setValue(IdPersistence.auth, {token: response.data.token, rememberMe: true});
            cb(undefined, response.data);
            return;
        })
        .catch(function (error: AxiosError) {
            cb(error);
            return;
        });
    };

    public logout = (cb: () => any) => {
        utilPersistence.setValue(IdPersistence.auth, {token: ""});
        cb();
    };

    public isAuthenticated = (token: string) => {
        const api: IAPI = API.VERIFY_USER;
        return axios({
            method: api.method,
            url: api.url,
            headers: {'token': token}
        })
    }
}

export default new Auth();