"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenAgent = void 0;
var createTokenAgent = function (agent) {
    return {
        agentId: agent._id,
        name: agent.name,
        role: agent.role,
    };
};
exports.createTokenAgent = createTokenAgent;
