import { model, Schema } from "mongoose";
import { Gender, IAuthProvider, IsActive, IUser } from "./user.interface";
import validator from 'validator';



const authProviderSchema = new Schema<IAuthProvider>({

    provider: { type: String, required: true },
    providerId: { type: String, required: true }

}, {
    _id: false,
    versionKey: false
})


const userSchema = new Schema<IUser>({
    name: { type: String, minLength: [2, "Name must contain at least 2 characters"], maxLength: [20, "Name more than 20 characters are not allowed"] },
    email: { type: String, validate: [validator.isEmail, "Invalid Email"], required: true },
    password: { type: String },
    phone: { type: String, validate: [validator.isMobilePhone, "Invalid Mobile Number"] },
    gender: { type: String, enum: Object.values(Gender) },
    isVerified: { type: Boolean, default: false },
    isActive: { type: String, enum: Object.values(IsActive), default: IsActive.Active },
    isDeleted: { type: Boolean, default: false },
    auths: [authProviderSchema],
}, {
    versionKey: false,
    timestamps: true
})


export const User = model<IUser>("User", userSchema)