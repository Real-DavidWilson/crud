import mongoose from "mongoose";

import AnnotationDTO from "./annotationDTO";

export default new mongoose.Schema<AnnotationDTO>({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});
