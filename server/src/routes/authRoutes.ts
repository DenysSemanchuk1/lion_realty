import express from "express";
import { loginAgent, registerAgent } from "../controllers/auth";
const router = express.Router();

router.route("/register").post(registerAgent);
router.route("/login").post(loginAgent);
router.route("/logout").get(loginAgent);

export default router;
