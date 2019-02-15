import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGO_URL_LOCAL_CONN}`, { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo connection was successful \n");
        const server = app.listen(3000, function() {
            console.log(`Server listening on port: ${3000}`);
        });
    })
    .catch((err) => {
        console.log(err)
    })