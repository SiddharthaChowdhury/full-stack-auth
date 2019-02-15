import mongoose from "mongoose";
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
    createdAt: Date
});
export default mongoose.model('User', UserSchema);
