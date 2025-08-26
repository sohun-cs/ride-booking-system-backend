import { NextFunction, Request, Response } from "express";


type catchAsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const CatchAsync = (fn: catchAsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err)
    })
}

export default CatchAsync;