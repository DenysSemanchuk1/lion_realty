export const createTokenAgent = (agent: any) => {
  return {
    agentId: agent._id,
    name: agent.name,
    role: agent.role,
  };
};
