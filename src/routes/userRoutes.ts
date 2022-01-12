import { Router, RequestHandler } from "express";
import { body, header, validationResult } from "express-validator";
import createHttpError, { HttpError } from "http-errors";
import jwt from "jsonwebtoken";

import { ServiceError, SERVICE_ERRORS_CODE } from "../errors/serviceError";
import { register } from "../services/user";
import handleValidation from "../middlewares/handleValidation";
import config from "../config";

class UserRoutes {
    static register: RequestHandler = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            throw createHttpError(400, {
                message: "Some fields did not pass validation!",
                errors: errors
                    .array()
                    .map((e) => ({ field: e.param, info: e.msg })),
            });

        const { name, email, password } = req.body;
        const { userid } = await register({ name, email, password });
        const token = jwt.sign({ userid }, config.app.jwtSecret, {
            expiresIn: "12h",
        });

        res.status(200).send({
            userid,
            name,
            email,
            token,
        });
    };

    static update: RequestHandler = async (req, res) => {
    };
}

export default {
    use(router: Router) {
        router.post("/user/register", [
            body("name").isString().isLength({ max: 255 }).trim(),
            body("email").isEmail().normalizeEmail(),
            body("password").isLength({ min: 8 }),
            handleValidation,
            UserRoutes.register,
        ]);

        router.put("/user", [
            header("authorization", "Bearer token is required!").isJWT,
            body("userid").isString(),
            body("name").isString().isLength({ max: 255 }).trim(),
            body("email").isEmail().normalizeEmail(),
            body("password").isLength({ min: 8 }),
            handleValidation,
            UserRoutes.update,
        ]);
    },
};
