import { Request } from "express";
export interface AgentData {
  name: string;
  agentId: string;
  role: string;
}

export interface CustomRequest extends Request {
  agent: AgentData;
}
