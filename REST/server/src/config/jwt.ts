import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import {ITokenOptions} from "../types/token";

const privateKEY = fs.readFileSync('../RSA/private.key', 'utf8');
const publicKEY = fs.readFileSync('../RSA/public.key', 'utf8');

const signOptions: ITokenOptions = {
    issuer: 'Austin4Silvers', // usually organization
    expiresIn: '1hr',
    algorithm: "RS256"
};

const verifyOptions: ITokenOptions = {...signOptions};

class JWT {
    public create = (payload: Object): string => {
        return jwt.sign(payload, privateKEY, signOptions);
    }

    public verify = (token: string): Object | Error => {
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch (err) {
            return err;
        }
    }
}

export default new JWT();