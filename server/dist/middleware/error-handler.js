"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
var http_status_codes_1 = require("http-status-codes");
var errorHandlerMiddleware = function (err, req, res, next) {
    var customError = {
        msg: err.message || "Something went wrong try again later",
    };
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(customError);
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
