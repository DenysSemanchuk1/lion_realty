"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.uploadProductImages = exports.createProduct = exports.getAllProducts = exports.getSingleAgentProducts = void 0;
var http_status_codes_1 = require("http-status-codes");
var Product_1 = __importDefault(require("../models/Product"));
var getSingleAgentProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agentId, singleAgentProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agentId = req.agent.agentId;
                return [4 /*yield*/, Product_1.default.find({ agent: agentId })];
            case 1:
                singleAgentProducts = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ agents: singleAgentProducts });
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleAgentProducts = getSingleAgentProducts;
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, price, area, rooms, floor, repair, lastFloor, queryObject, _b, minPrice, maxPrice, _c, minArea, maxArea, _d, minRooms, maxRooms, floorRequest, _e, from, to, notFirst, notLast, products;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.query, price = _a.price, area = _a.area, rooms = _a.rooms, floor = _a.floor, repair = _a.repair, lastFloor = _a.lastFloor;
                queryObject = {};
                if (price) {
                    _b = price.split("-"), minPrice = _b[0], maxPrice = _b[1];
                    queryObject.price = {
                        $gte: +minPrice,
                        $lte: +maxPrice,
                    };
                }
                if (area) {
                    _c = area.split("-"), minArea = _c[0], maxArea = _c[1];
                    queryObject.area = {
                        $gte: +minArea,
                        $lte: +maxArea,
                    };
                }
                if (rooms) {
                    if (rooms === "freePlanning")
                        queryObject.rooms = rooms;
                    else {
                        _d = rooms.split("-"), minRooms = _d[0], maxRooms = _d[1];
                        queryObject.rooms = {
                            $gte: +minRooms,
                            $lte: +maxRooms,
                        };
                    }
                }
                if (floor) {
                    floorRequest = {};
                    _e = JSON.parse(floor), from = _e.from, to = _e.to, notFirst = _e.notFirst, notLast = _e.notLast;
                    if (notFirst) {
                        floorRequest.$gte = 2;
                    }
                    if (notFirst && from) {
                        floorRequest.$gte = from > 2 ? from : 2;
                    }
                    if (notLast) {
                        floorRequest.$lte = +lastFloor - 1;
                    }
                    if (notLast && to) {
                        floorRequest.$lte = to < +lastFloor - 1 ? to : +lastFloor - 1;
                    }
                }
                if (repair) {
                    queryObject.repair = repair;
                }
                return [4 /*yield*/, Product_1.default.find(queryObject)];
            case 1:
                products = _f.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ products: products, count: products.length });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.create(__assign(__assign({}, req.body), { agent: req.agent.agentId }))];
                case 1:
                    product = _a.sent();
                    res
                        .status(http_status_codes_1.StatusCodes.CREATED)
                        .json({ message: "Succesfully created product", product: product });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProduct = createProduct;
var uploadProductImages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // const
        res.status(http_status_codes_1.StatusCodes.OK).json({ images: req });
        return [2 /*return*/];
    });
}); };
exports.uploadProductImages = uploadProductImages;
