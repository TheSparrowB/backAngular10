import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/log";


export interface IError extends Error {
	status?: number;
}


const errorsHandler = {
	notFound: (req: Request, res: Response, next: NextFunction) => {
		const error: IError = new Error("Path not found");
		error.status = 404;
		next(error);
	},
	catchError: (
		ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
	) => {
		return (req: Request, res: Response, next: NextFunction) => {
			return ftn(req, res, next).catch((error: IError) => {
				error.status = 500;
				next(error);
			});
		};
	},
	general: (error: IError, req: Request, res: Response, next: NextFunction) => {
		const message = error.message;

		logger.error(`MESSAGE: ${message} - STACK: ${error.stack} - STATUS: ${error.status}`);

		if (!process.env.NODE_ENV || process.env.NODE_ENV.trim() === "development") {
			res.status(error.status).json({
				status: error.status,
				message,
				stack: error.stack
				
			});
		} else {
			res.status(error.status).json({
				status: error.status,
				message				
			});
		}
	}
};


export { errorsHandler };
