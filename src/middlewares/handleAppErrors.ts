import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";

export default (err: any, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof HttpError) res.status(err.status).send(err);
    else
        res.status(500).send({
            message: "An unexpected error has ocurred, try again later!",
        });
};
