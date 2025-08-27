import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from 'http-status-codes';
import { verifyToken } from "../utils/jwt";
import { envVar } from "../configs/env";


export const CheckAuth = (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {

    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(httpStatus.FORBIDDEN, "You're not authorized");
        };

        const token = verifyToken(accessToken, envVar.JWT_SECRET) as { role: string }

        if (!allowedRoles.includes(token.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "You're not permitted to view this route");
        }

        req.user = verifyToken // custom express type

        next();

    } catch (error) {
        next(error)
    }

}