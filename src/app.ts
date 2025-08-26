import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/errors/global.error.handlers';

const app: Application = express();

app.use(express.json());
// for router middleware
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to ride booking APIs");
})


app.use(GlobalErrorHandler)

export default app;