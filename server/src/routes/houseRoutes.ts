import { Router } from "express";
import { authenticateUser } from '../middleware/authentication';
import {
  createHouse,
  getAllHouses,
} from "../controllers/housesController";

const router = Router();
router.route("/").get(getAllHouses).post(authenticateUser, createHouse);
export default router;
