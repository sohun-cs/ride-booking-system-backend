import AppError from "../../errors/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { envVar } from "../../configs/env";
import { JwtPayload } from "jsonwebtoken";


const createUser = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVar.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = {
        provider: 'credentials',
        providerId: email as string
    }

    const userInfo = {
        email: email,
        password: hashedPassword,
        auths: authProvider,
        ...rest
    }

    const user = await User.create(userInfo);

    return user;
};


const getAllUser = async () => {

    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };

}



const updateUser = async (userId: string, payload: Partial<IUser>, accessToken: JwtPayload) => {

    const isUserExists = await User.findById(userId);

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    };


    if (payload.email) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email cannot be changed")
    }


    if (payload.role) {
        if (accessToken.role === Role.User || accessToken.role === Role.Driver) {
            throw new AppError(httpStatus.BAD_REQUEST, "You're not permitted")
        }

        if (payload.role === Role.SuperAdmin && accessToken.role === Role.Admin) {
            throw new AppError(httpStatus.BAD_REQUEST, "You're not permitted")
        }
    };

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (accessToken.role === Role.User || accessToken.role === Role.Driver) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email cannot be changed")
        }
    };

    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

    return updatedUser;

}




export const UserServices = {
    createUser,
    getAllUser,
    updateUser
}