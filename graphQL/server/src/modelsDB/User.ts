import mongoose from "mongoose";
import {IdModel} from "./IdModel";
import {IPost} from "./Post";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    posts?: IPost[];
    createdAt?: string;
}

const Schema = mongoose.Schema;
const UserSchema = new Schema ({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdAt: Date
});
export default mongoose.model(IdModel.USER, UserSchema);
