"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_1 = require("./../middleware/authentication");
var agentsController_1 = require("../controllers/agentsController");
var router = (0, express_1.Router)();
router.route("/").get(agentsController_1.getAllAgents);
router.route("/:id").get(authentication_1.authenticateUser, agentsController_1.getSingleAgent).delete(agentsController_1.deleteAgent).patch(agentsController_1.updateAgent);
exports.default = router;
