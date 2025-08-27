/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../middleware/catch.async";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/send.response";
import httpStatus from 'http-status-codes';
import { verifyToken } from "../../utils/jwt";
import { envVar } from "../../configs/env";
import { JwtPayload } from "jsonwebtoken";




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



const updateUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const token = req.headers.authorization;
    const userId = req.params.id;
    const payload = req.body;

    // const verifiedToken = verifyToken(token as string, envVar.JWT_SECRET) as JwtPayload;

    const verifiedToken = req.user;

    const updatedUser = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: updatedUser
    })


})


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}