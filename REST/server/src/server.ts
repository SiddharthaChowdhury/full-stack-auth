import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes";

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes(express.Router()));

mongoose.connect(`${process.env.MONGO_URL_LOCAL_CONN}`, { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo connection was successful \n");
        const server = app.listen(3000, function() {
            console.log(`Server listening on port: ${3000}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });