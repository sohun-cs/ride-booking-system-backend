


export enum IsActive {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Blocked = 'BLOCKED'
}


export enum Gender {
    Male = "MALE",
    Female = "FEMALE"
}


export interface IAuthProvider {
    provider: 'google' | 'credentials',
    providerId: string;
}



export interface IUser {

    name?: string,
    email: string,
    password?: string,
    phone?: string,
    gender?: string,
    isVerified?: boolean,
    isActive?: IsActive,
    isDeleted?: boolean,
    auths?: IAuthProvider[];

}