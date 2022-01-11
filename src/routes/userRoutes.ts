import { Router, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import createHttpError, { HttpError } from "http-errors";

import { ServiceError, SERVICE_ERRORS_CODE } from "../errors/serviceError";
import { register } from "../services/user";

class UserRoutes {
    static register: RequestHandler = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                throw createHttpError(400, {
                    message: "Some fields did not pass validation!",
                    errors: errors
                        .array()
                        .map((e) => ({ field: e.param, info: e.msg })),
                });

            const { name, email, password } = req.body;
            const { userid, token } = await register({ name, email, password });

            res.status(200).send({
                userid,
                name,
                email,
                token,
            });
        } catch (err) {
            if (err instanceof HttpError) throw err;
            if (
                err instanceof ServiceError &&
                err.code === SERVICE_ERRORS_CODE.CONFLICT
            )
                throw createHttpError(409, err.payload);

            throw createHttpError(503, "Service unavailable, try again later!");
        }
    };
}

export default {
    use(router: Router) {
        router.post("/register", [
            body("name").isString().isLength({ max: 255 }).trim(),
            body("email").isEmail().normalizeEmail(),
            body("password").isLength({ min: 8 }),
            UserRoutes.register,
        ]);
    },
};
