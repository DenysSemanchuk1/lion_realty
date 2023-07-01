import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "./CustomError";

export class Unauthenticated extends CustomErrorApi {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}