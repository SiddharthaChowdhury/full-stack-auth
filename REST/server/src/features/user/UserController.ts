import express from "express";
import bcrypt from "bcrypt";
import {ICreateUserRequest, ILoginRequest, IUser} from "../../types/typeUser";
import User from "../../schema/User";
import {token} from "../../util/jwt";
import {ITokenPayload} from "../../types/token";
import requestIp from "request-ip";

class UserController {
    public createUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const params: ICreateUserRequest = req.body;
        if (!params.email || !params.password) {
            res.status(400);
            return res.json({error: "Email and Password are mandatory"});
        }

        bcrypt.hash(params.password, 9, function(err, hash) {
            if(err) {
                res.status(500);
                return res.json({err: err});
            }
            User.findOne({email: params.email}, function(err, existUser) {
                if (err) {
                    res.status(500);
                    return res.json({err})
                }

                if(existUser) {
                    res.status(409)
                    return res.json({msg: "User already exists"});
                }

                const user = new User({
                    ...params,
                    password: hash,
                    createdAt: Date.now()
                });

                user.save()
                    .then((user) => {
                        res.status(201);
                        return res.json({msg: "User is created", data: {...user, _id: user._id.toString()}})
                    })
                    .catch((err) => {
                        res.status(500);
                        return res.json({err})
                    })
            })
        });
    };

    public login = (req: express.Request, res: express.Response) => {

        const params: ILoginRequest = req.body;
        if (!params.email || !params.password) {
            res.status(400);
            return res.json({error: "Email and Password are mandatory"});
        }


        User.findOne({email: params.email}, (err, user: IUser) => {
            if(err) {
                res.status(500);
                return res.json({err: err});
            }

            if(!user) {
                res.status(400);
                return res.json({msg: "Authentication failed!"});
            }

            bcrypt.compare(params.password, user.password, function(err, isValid: boolean) {
                if (err) {
                    res.status(500);
                    return res.json({err: err})
                }
                if (!isValid) {
                    res.status(403);
                    return res.json({err: "Authentication failed!"})
                }

                const {browser, os, version, city, country, region} = req.params;
                const jwtPayload: ITokenPayload = {
                    _id: user._id.toString(),
                    ip: requestIp.getClientIp(req),
                    browser,
                    version,
                    os,
                    country,
                    city,
                    region,
                };
                const jwt: string = token.create(jwtPayload);

                res.status(200);
                return res.json({msg: "Login successful", token: jwt, issued: (+ new Date), _id: user._id.toString()})
            });
        })
    };

    public verifyToken = (req: express.Request, res: express.Response) => {
        const userToken = req.get("token");
        const userId = req.get("_id");

        if (!userToken || !userId) {
            res.status(400);
            return res.json({err: "Invalid token"});
        }

        try {
            const decoded: ITokenPayload = token.verify(userToken) as any;
            if (decoded._id && decoded._id === userId) {
                const {browser, os, ip, version, city, country, region} = req.params;
                if (
                    decoded.ip !== ip ||
                    decoded.browser !== browser ||
                    decoded.version !== version ||
                    decoded.os !== os ||
                    decoded.city !== city ||
                    decoded.country !== country ||
                    decoded.region !== region
                ) {
                    res.status(403);
                    return res.json({err: "Invalid token", decoded, params: req.params})
                }

                res.status(200);
                return res.json({data: decoded});
            }

            res.status(403);
            return res.json({err: "Invalid token"})

        }
        catch (err) {
            res.status(403)
            return res.json({err})
        }
    }
}

export const userController = new UserController();