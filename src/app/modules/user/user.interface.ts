


export enum IsActive {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Blocked = 'BLOCKED'
}


export enum Gender {
    Male = "MALE",
    Female = "FEMALE"
}

export enum Role {
    SuperAdmin = "SUPER_ADMIN",
    Admin = "ADMIN",
    Driver = "DRIVER",
    User = "USER"
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
    role?: Role,
    isVerified?: boolean,
    isActive?: IsActive,
    isDeleted?: boolean,
    auths?: IAuthProvider[];

}