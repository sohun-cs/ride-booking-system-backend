import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/errors/global.error.handlers';
import { routeNotFound } from './app/middleware/not.found.route';
import { router } from './app/routes/routes';

const app: Application = express();

app.use(express.json());
app.use("/api/v1", router);
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to ride booking APIs");
})


// Global Error Handler
app.use(GlobalErrorHandler);

// 404 Page Not Found
app.use(routeNotFound);

export default app;