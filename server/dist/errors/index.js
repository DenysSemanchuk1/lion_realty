"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BadRequest_1 = require("./BadRequest");
var NotFound_1 = require("./NotFound");
var UnauthenticatedError_1 = require("./UnauthenticatedError");
exports.default = { BadRequest: BadRequest_1.BadRequest, NotFound: NotFound_1.NotFoundError, Unauthenticated: UnauthenticatedError_1.Unauthenticated };
