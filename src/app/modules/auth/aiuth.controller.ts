/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../middleware/catch.async";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/send.response";
import httpStatus from 'http-status-codes';



const credentialLogin = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;

    const userLogin = await AuthServices.credentialLogin(payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login successfully",
        data: userLogin
    })

})


export const AuthControllers = {
    credentialLogin
}