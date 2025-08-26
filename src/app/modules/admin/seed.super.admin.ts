/* eslint-disable no-console */
import { User } from "../user/user.model"
import { envVar } from "../../configs/env"
import bcrypt from 'bcryptjs';
import { IAuthProvider, Role } from "../user/user.interface";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status-codes'


export const seedSuperAdmin = async () => {

    try {

        const isSuperAdminExists = await User.findOne({ email: envVar.SUPER_ADMIN_EMAIL });

        if (isSuperAdminExists) {
            return "Super Admin already Exists";
        }

        console.log("Creating a super admin");

        const hashedPassword = await bcrypt.hash(envVar.SUPER_ADMIN_PASS, Number(envVar.BCRYPT_SALT_ROUND));

        const authProvider: IAuthProvider = {
            provider: 'credentials',
            providerId: envVar.SUPER_ADMIN_EMAIL,

        }

        const superAdminInfo = {
            email: envVar.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: Role.SuperAdmin,
            isVerified: true,
            auths: [authProvider]
        }

        const superAdmin = await User.create(superAdminInfo);

        console.log(superAdmin)

    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, `Unable to create Super Admin. ${error}`,)
    }

}