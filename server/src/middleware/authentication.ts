import { NextFunction, Response } from "express";
import CustomError from "../errors";
import { isTokenValid } from "../utils/jwt";
import { AgentData, CustomRequest } from "../types/customRequest";

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }

  try {
    const { name, agentId, role } = isTokenValid(token) as AgentData;
    req.agent = { name, agentId, role };
    next();
  } catch (err) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }
};
