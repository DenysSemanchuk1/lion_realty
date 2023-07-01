"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var agentsController_1 = require("../controllers/agentsController");
var router = express_1.default.Router();
router.route("/register").post(agentsController_1.registerAgent);
router.route("/login").post(agentsController_1.loginAgent);
router.route("/logout").get(agentsController_1.loginAgent);
exports.default = router;
