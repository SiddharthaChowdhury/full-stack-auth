import express from "express";
import {userController} from "./features/user/UserController";

const routes = ($: express.Router) => {

    $.get("/", (req, res, next) => {
        res.send("Hello world");
    });

    $.post('/user-create', userController.createUser);
    $.post('/user-login', userController.login);

return $};

export default routes;