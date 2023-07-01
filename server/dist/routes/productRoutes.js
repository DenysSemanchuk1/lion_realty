"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)({ dest: "src/public/uploads/" });
var authentication_1 = require("./../middleware/authentication");
var productsController_1 = require("../controllers/productsController");
var router = (0, express_1.Router)();
router.route("/").get(productsController_1.getAllProducts).post(productsController_1.createProduct);
router.route("/:id/products").get(authentication_1.authenticateUser, productsController_1.getSingleAgentProducts);
router.route("/uploads").post(upload.array("images"), productsController_1.uploadProductImages);
exports.default = router;
