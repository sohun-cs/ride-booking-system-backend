import AppError from "../../errors/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { envVar } from "../../configs/env";


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




export const UserServices = {
    createUser,
    getAllUser
}