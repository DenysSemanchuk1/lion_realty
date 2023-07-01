import express from "express";
import { uploadHousePhotos } from "../controllers/uploadsController";
const router = express.Router();

router.route("/housePhotos").post(uploadHousePhotos);
export default router;
