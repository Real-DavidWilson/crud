import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export default async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw createHttpError(400, {
            message: "Some fields did not pass validation!",
            errors: errors
                .array()
                .map((e) => ({ field: e.param, info: e.msg })),
        });

    next();
};
