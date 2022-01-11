import bcrypt, { compare } from "bcryptjs";

import config from "../config";
import UserModel from "../models/userModel";
import { UserDTO } from "../models/userModel";

interface AuthDTO {
    userid: number;
    password: string;
}

export async function authUser(data: AuthDTO, user: UserDTO) {
    try {
        if (!(await compare(data.password, user.password))) 
            throw new Error("Invalid user");
    } catch(err){

    }
}
