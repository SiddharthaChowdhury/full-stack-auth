import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import path from "path";
import {ITokenOptions} from "../types/token";

const privateKEY = fs.readFileSync(path.join(__dirname, '../../RSA/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.join(__dirname, '../../RSA/public.key'), 'utf8');

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

export const token = new JWT();