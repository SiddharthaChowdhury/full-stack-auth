import express from "express";
import bcrypt from "bcrypt";
import {ICreateUserRequest, ILoginRequest} from "../../types/typeUser";
import User from "../../schema/User";
import {token} from "../../config/jwt";

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
                })

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
    }

    public login = (req: express.Request, res: express.Response) => {
        const params: ILoginRequest = req.body;
        if (!params.email || !params.password) {
            res.status(400);
            return res.json({error: "Email and Password are mandatory"});
        }

        User.findOne({email: params.email}, (err, user) => {
            if(err) {
                res.status(500);
                return res.json({err: err});
            }

            if(!user) {
                res.status(400);
                return res.json({msg: "Authentication failed!"});
            }

            const jwt: string = token.create({
                _id: user._id.toString(),
            })

            res.status(200);
            return res.json({msg: "Login successful", token: jwt})
        })
    }
}

export const userController = new UserController();