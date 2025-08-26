import dotenv from 'dotenv';
dotenv.config();


interface IEnvTypes {
    DB_URL: string,
    PORT: string,
}

const envConfigs = (): IEnvTypes => {

    const envVariablesArr = ["DB_URL", "PORT"];

    envVariablesArr.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing environment keys: ${key}`)
        }
    });

    return {
        DB_URL: process.env.DB_URL as string,
        PORT: process.env.PORT as string,
    }

}

export const envVar: IEnvTypes = envConfigs();