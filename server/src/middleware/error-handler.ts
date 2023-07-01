import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    msg: err.message || "Something went wrong try again later",
  };

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customError)
};
