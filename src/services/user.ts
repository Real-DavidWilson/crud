import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";
import createServiceError, {
    SERVICE_ERRORS_CODE,
} from "../errors/serviceError";
import UserModel, { UserDTO } from "../models/userModel";

export async function register({ email, name, password }: UserDTO) {
    if (await userExists(email))
        throw createServiceError({
            message: "User already exists.",
            code: SERVICE_ERRORS_CODE.CONFLICT,
        });

    const hash = await bcrypt.hash(
        password,
        await bcrypt.genSalt(config.app.bcryptRounds)
    );

    const user = new UserModel({ email, name, password: hash });
    const { _id: userid } = await user.save();

    return { userid };
}

export async function userExists(email: string) {
    try {
        return !!(await UserModel.findOne({ email }));
    } catch (err) {
        throw err;
    }
}

export async function updateUser(userid: string, user: UserDTO) {
    try {

    } catch (er){
        
    }
}
