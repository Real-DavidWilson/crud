import mongoose from "mongoose";

export interface UserDTO {
    email: string;
    name: string;
    password: string;
}

const schema = new mongoose.Schema<UserDTO>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("user", schema);
