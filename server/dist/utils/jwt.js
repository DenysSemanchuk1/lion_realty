"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJWT = function (_a) {
    var payload = _a.payload;
    var token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
exports.createJWT = createJWT;
var isTokenValid = function (token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.isTokenValid = isTokenValid;
var attachCookiesToResponse = function (res, agent) {
    var token = (0, exports.createJWT)({ payload: agent });
    var oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
