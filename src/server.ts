/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import { envVar } from './app/configs/env';
import app from './app';

let server: Server;

const startServer = async () => {
    await mongoose.connect(envVar.DB_URL);
    console.log("MongoDB connected with mongoose")

    server = app.listen(envVar.PORT, () => {
        console.log(`Server is running on ${envVar.PORT}`)
    })
}


startServer();


process.on("unhandledRejection", (err) => {
    console.log("Facing unhandledRejection error. Server is shutting down", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1);
})


process.on("uncaughtException", (err) => {
    console.log("Facing uncaughtException error. Server is shutting down", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1);
})


process.on("SIGTERM", () => {
    console.log("Facing SIGTERM error. Server is shutting down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };

    process.exit(1);
})


process.on("SIGINT", () => {
    console.log("Facing SIGINT error. Server is shutting down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };

    process.exit(1);
})