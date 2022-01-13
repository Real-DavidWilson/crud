import mongoose from "mongoose";

import UserDTO from "./userDTO";
import { AnnotationSchema } from "../annotationsSchema";

export default new mongoose.Schema<UserDTO>({
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
    annotations: [AnnotationSchema],
});
