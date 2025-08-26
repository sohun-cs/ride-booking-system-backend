import { Response } from "express";
import httpStatus from 'http-status-codes';


export const routeNotFound = (res: Response) => {

    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Page not found",
    })

}