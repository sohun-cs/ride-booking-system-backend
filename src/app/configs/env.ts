import dotenv from 'dotenv';
dotenv.config();


interface IEnvTypes {
    DB_URL: string,
    PORT: string,
    NODE_ENV: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASS: string,
    BCRYPT_SALT_ROUND: string,
}

const envConfigs = (): IEnvTypes => {

    const envVariablesArr = ["DB_URL", "PORT", "NODE_ENV", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASS", "BCRYPT_SALT_ROUND"];

    envVariablesArr.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing environment keys: ${key}`)
        }
    });

    return {
        DB_URL: process.env.DB_URL as string,
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    }

}

export const envVar: IEnvTypes = envConfigs();