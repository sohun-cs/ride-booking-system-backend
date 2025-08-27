import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/jwt";
import { envVar } from "../../configs/env";



const credentialLogin = async (payload: Partial<IUser>) => {

    try {

        const { email, password, ...rest } = payload;

        const isUserExists = await User.findOne({ email });

        if (!isUserExists) {
            throw new AppError(httpStatus.BAD_REQUEST, "User not found");
        }

        const isPasswordMatched = await bcrypt.compare(password as string, isUserExists.password as string);

        if (!isPasswordMatched) {
            throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
        }

        const jwtPayload = {
            email: isUserExists.email,
            ...rest
        }

        const accessToken = generateToken(jwtPayload, envVar.JWT_SECRET, envVar.JWT_EXPIRES);

        return accessToken;

    } catch (error) {

        throw new AppError(httpStatus.BAD_GATEWAY, `You cannot login right now. ${error}`)

    }

};


export const AuthServices = {
    credentialLogin
}