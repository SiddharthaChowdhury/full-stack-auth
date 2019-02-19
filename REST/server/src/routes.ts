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
    // LOGOUT feature
    /*
    * JWT can't be expired manually
    * BUT In production:
    * 1. I would store { userID: [activeTokens] } from loggedIn systems inside a Database (SQL)
    * 2. Run CronJobs to remove expired tokens from database
    * */

return $};

export default routes;