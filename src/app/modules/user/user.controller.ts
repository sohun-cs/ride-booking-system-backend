/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../middleware/catch.async";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/send.response";
import httpStatus from 'http-status-codes';




const createUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body;

    const user = await UserServices.createUser(userData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user
    })

});


const getAllUsers = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const users = await UserServices.getAllUser();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Retrieved Successfully",
        data: users.data,
        meta: users.meta
    })

})


export const UserControllers = {
    createUser,
    getAllUsers
}