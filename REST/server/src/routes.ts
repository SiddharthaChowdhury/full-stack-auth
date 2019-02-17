import express from "express";
import {userController} from "./features/user/UserController";
import requestIp from "request-ip";

const routes = ($: express.Router) => {

    $.get("/", (req, res, next) => {
        // res.send(req.useragent);
        res.send(requestIp.getClientIp(req))
    });

    $.post('/user-create', userController.createUser);
    $.post('/user-login', userController.login);
    $.get('/token-verify', userController.verifyToken);

return $};

export default routes;