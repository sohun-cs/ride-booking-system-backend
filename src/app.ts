import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to ride booking APIs");
})

export default app;