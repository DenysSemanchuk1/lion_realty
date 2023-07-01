"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgent = exports.getSingleAgent = exports.deleteAgent = exports.getAllAgents = exports.loginAgent = exports.registerAgent = exports.logoutAgent = void 0;
var http_status_codes_1 = require("http-status-codes");
var Agent_1 = __importDefault(require("../models/Agent"));
var errors_1 = __importDefault(require("../errors"));
var createTokenUser_1 = require("../utils/createTokenUser");
var jwt_1 = require("../utils/jwt");
var logoutAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie("token", "logout", {
            httpOnly: true,
            expires: new Date(Date.now() + 1000),
        });
        return [2 /*return*/];
    });
}); };
exports.logoutAgent = logoutAgent;
var registerAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, email, emailAlreadyExists, isFirstAccount, role, agent, tokenAgent;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, password = _a.password, email = _a.email;
                if (!name || !password || !email) {
                    throw new errors_1.default.BadRequest("Please enter all values");
                }
                return [4 /*yield*/, Agent_1.default.findOne({ email: email })];
            case 1:
                emailAlreadyExists = _b.sent();
                if (emailAlreadyExists) {
                    throw new errors_1.default.BadRequest("Email already exists");
                }
                return [4 /*yield*/, Agent_1.default.countDocuments({})];
            case 2:
                isFirstAccount = (_b.sent()) === 0;
                role = isFirstAccount ? "admin" : "agent";
                return [4 /*yield*/, Agent_1.default.create({ name: name, password: password, email: email, role: role })];
            case 3:
                agent = _b.sent();
                tokenAgent = (0, createTokenUser_1.createTokenAgent)(agent);
                (0, jwt_1.attachCookiesToResponse)(res, tokenAgent);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ agent: agent });
                return [2 /*return*/];
        }
    });
}); };
exports.registerAgent = registerAgent;
var loginAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, agent, isPasswordCorrect, tokenAgent;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new errors_1.default.BadRequest("Please provide email and password");
                }
                return [4 /*yield*/, Agent_1.default.findOne({ email: email })];
            case 1:
                agent = _b.sent();
                if (!agent) {
                    throw new errors_1.default.Unauthenticated("Invalid credentials");
                }
                return [4 /*yield*/, agent.comparePassword(password)];
            case 2:
                isPasswordCorrect = _b.sent();
                if (!isPasswordCorrect) {
                    throw new errors_1.default.Unauthenticated("Invalid credentials");
                }
                tokenAgent = (0, createTokenUser_1.createTokenAgent)(agent);
                (0, jwt_1.attachCookiesToResponse)(res, tokenAgent);
                res.status(http_status_codes_1.StatusCodes.OK).json({ agent: tokenAgent });
                return [2 /*return*/];
        }
    });
}); };
exports.loginAgent = loginAgent;
var getAllAgents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Agent_1.default.find({})];
            case 1:
                agents = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ agents: agents });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllAgents = getAllAgents;
var deleteAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, agent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Agent_1.default.findById(id)];
            case 1:
                agent = _a.sent();
                if (!agent) {
                    throw new errors_1.default.BadRequest("Invalid agent value");
                }
                return [4 /*yield*/, agent.deleteOne()];
            case 2:
                _a.sent();
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json({ message: "Agent ".concat(agent.name, " was removed successfully"), agent: agent });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAgent = deleteAgent;
var getSingleAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, agent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Agent_1.default.findById(id)];
            case 1:
                agent = _a.sent();
                if (!agent)
                    throw new errors_1.default.BadRequest("No agent with id ".concat(id));
                res.status(http_status_codes_1.StatusCodes.OK).json({ agent: agent });
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleAgent = getSingleAgent;
var updateAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, photo, name, password, agent;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, photo = _a.photo, name = _a.name, password = _a.password;
                return [4 /*yield*/, Agent_1.default.findById(id)];
            case 1:
                agent = _b.sent();
                if (!agent) {
                    throw new errors_1.default.BadRequest("Invalid agent value");
                }
                if (photo) {
                    agent.photo = photo;
                }
                if (name) {
                    agent.name = name;
                }
                return [4 /*yield*/, agent.save()];
            case 2:
                _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ agent: agent });
                return [2 /*return*/];
        }
    });
}); };
exports.updateAgent = updateAgent;
