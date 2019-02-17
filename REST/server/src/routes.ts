import express from "express";
import {userController} from "./features/user/UserController";
import requestIp from "request-ip";
import {authCheck} from "./middleware/authCheck";

const routes = ($: express.Router) => {

    $.get("/", (req, res, next) => {
        // res.send(req.useragent);
        res.send(requestIp.getClientIp(req))
    });

    $.post('/user-create', userController.createUser);
    $.post('/user-login', authCheck.checkGeoIP, userController.login);
    $.get('/token-verify', authCheck.checkGeoIP,userController.verifyToken);

return $};

export default routes;