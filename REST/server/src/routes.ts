import express from "express";

const routes = ($: express.Router) => {

    $.get("/", (req, res, next) => {
        res.send("Hello world");
    });

return $};

export default routes;