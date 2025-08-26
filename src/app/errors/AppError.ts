class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name

        Object.setPrototypeOf(this, new.target.prototype);

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }

    }
}

export default AppError;