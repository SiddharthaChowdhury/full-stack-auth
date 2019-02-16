import axios, {AxiosError, AxiosResponse} from "axios";
import {IdPersistence, IUtilPersistenceAuth, utilPersistence} from "../../utils/utilPersistence";
import {API, IAPI, IAuthRequest} from "../../utils/api";

class Auth {
    public login = (authInfo: IAuthRequest, cb: (err?: Error, msg?: string) => any) => {
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
                const authInfo: IUtilPersistenceAuth = {
                    token: response.data.token,
                    rememberMe: true,
                    issuedAt: response.data.issued,
                    _id: response.data._id
                };
                utilPersistence.setValue(IdPersistence.auth, authInfo);
                cb(undefined, response.data);
                return;
            })
            .catch(function (error: AxiosError) {
                console.log(error);
                cb(new Error("Authentication failed."));
                return;
            });
    };

    public logout = (cb: () => any) => {
        utilPersistence.setValue(IdPersistence.auth, {token: ""});
        cb();
    };

    public verifyAuth = (cb: (err?: Error, msg?: string) => any) => {
        const authInfo: IUtilPersistenceAuth = utilPersistence.getValue(IdPersistence.auth);
        const api: IAPI = API.VERIFY_USER;
        axios({
            method: api.method,
            url: api.url,
            headers: {
                'token': authInfo.token,
                '_id': authInfo._id
            }
        }).then((response) => {
            cb(undefined, response.data);
            return;
        }).catch((err) => {
            cb(err, undefined);
            return;
        })
    }
}

export default new Auth();