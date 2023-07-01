import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "./CustomError";

export class NotFoundError extends CustomErrorApi {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
