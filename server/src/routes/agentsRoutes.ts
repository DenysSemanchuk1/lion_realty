import { Router } from "express";
import { authenticateUser } from './../middleware/authentication';
import {
  deleteAgent,
  getAllAgents,
  getSingleAgent,
  updateAgent,
} from "../controllers/agentsController";
import { getSingleAgentHouses } from "../controllers/housesController";

const router = Router();
router.route("/").get(getAllAgents);
router.route("/:id").get(authenticateUser, getSingleAgent).delete(deleteAgent).patch(updateAgent);
router.route("/:id/houses").get(authenticateUser, getSingleAgentHouses);

export default router;
