"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var SlideSchema = new mongoose_1.default.Schema({
    slideImg: {
        type: String,
        required: true,
    },
    slideTitle: {
        type: String,
        required: true,
    },
    slideDescr: {
        type: String,
        required: true,
    },
});
var ProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true,
    },
    district: String,
    street: String,
    repair: {
        type: String,
        enum: ["without", "renovation", "cosmetic", "designer"],
        required: true,
    },
    rooms: Number,
    area: Number,
    price: Number,
    landArea: Number,
    categories: [
        {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 40,
        },
    ],
    advantages: [
        {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 40,
        },
    ],
    slides: [SlideSchema],
    images: [String],
    presentationFile: String,
    agent: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Agent",
    },
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
