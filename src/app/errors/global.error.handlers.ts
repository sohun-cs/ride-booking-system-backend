/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { envVar } from "../configs/env";


const GlobalErrorHandler = async (err: unknown, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = "Something Went Wrong";

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        err,
        stack: envVar.NODE_ENV === 'development' ? (err as Error).stack : null
    })
};


export default GlobalErrorHandler;