import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { ServiceError, SERVICE_ERRORS_CODE } from "../errors/serviceError";

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ServiceError) {
        switch (err.code) {
            case SERVICE_ERRORS_CODE.CONFLICT:
                throw createHttpError(409, err.data);
            case SERVICE_ERRORS_CODE.NOT_FOUND:
                throw createHttpError(401, err.data);
            default:
                throw createHttpError(
                    503,
                    "Service unavailable, try again later!"
                );
        }
    }

    next(err);
};
