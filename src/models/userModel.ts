import mongoose from "mongoose";
import { UserSchema } from "../schemas/userSchema";
export default mongoose.model("user", UserSchema);
