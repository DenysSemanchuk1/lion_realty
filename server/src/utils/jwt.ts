import { Response } from "express";
import jwt from "jsonwebtoken";

export const createJWT = ({ payload }: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string);

export const attachCookiesToResponse = (res: Response, agent: {}) => {
  const token = createJWT({ payload: agent });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
