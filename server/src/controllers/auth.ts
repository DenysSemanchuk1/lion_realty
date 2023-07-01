import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Agent from "../models/Agent";
import CustomError from "../errors";
import { createTokenAgent } from "../utils/createTokenUser";
import { attachCookiesToResponse } from "../utils/jwt";
export const logoutAgent = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
};
export const registerAgent = async (req: Request, res: Response) => {
  const { name, password, email } = req.body as {
    name: string;
    password: string;
    email: string;
  };
  if (!name || !password || !email) {
    throw new CustomError.BadRequest("Please enter all values");
  }

  const emailAlreadyExists = await Agent.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequest("Email already exists");
  }

  const isFirstAccount = (await Agent.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "agent";

  const agent = await Agent.create({ name, password, email, role });

  const tokenAgent = createTokenAgent(agent);
  attachCookiesToResponse(res, tokenAgent);

  res.status(StatusCodes.CREATED).json({ agent });
};

export const loginAgent = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequest("Please provide email and password");
  }

  const agent = await Agent.findOne({ email });
  if (!agent) {
    throw new CustomError.Unauthenticated("Invalid credentials");
  }
  const isPasswordCorrect = await agent.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated("Invalid credentials");
  }

  const tokenAgent = createTokenAgent(agent);
  attachCookiesToResponse(res, tokenAgent);

  res.status(StatusCodes.OK).json({ agent: tokenAgent });
};
