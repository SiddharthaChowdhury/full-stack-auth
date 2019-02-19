import mongoose from "mongoose";
import {IdModel} from "./IdModel";
import {IUser} from "./User";

export interface IPost {
    _id?: string;
    title: string;
    description?: string;
    createdBy?: IUser | string;
    createdAt?: Object;
}

const Schema = mongoose.Schema;
const PostSchema = new Schema({
   title: {
       type: String,
       required: true
   },
    description: {
       type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date
});

export default mongoose.model(IdModel.POST, PostSchema)