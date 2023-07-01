import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "./CustomError";

export class BadRequest extends CustomErrorApi {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
