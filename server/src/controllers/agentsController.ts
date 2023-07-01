import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Agent from "../models/Agent";
import CustomError from "../errors";


export const getAllAgents = async (req: Request, res: Response) => {
  const agents = await Agent.find({});
  res.status(StatusCodes.OK).json({ agents });
};

export const deleteAgent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const agent = await Agent.findById(id);
  if (!agent) {
    throw new CustomError.BadRequest("Invalid agent value");
  }

  await agent.deleteOne();

  res
    .status(StatusCodes.OK)
    .json({ message: `Agent ${agent.name} was removed successfully`, agent });
};

export const getSingleAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const agent = await Agent.findById(id);
  if (!agent) throw new CustomError.BadRequest(`No agent with id ${id}`);

  res.status(StatusCodes.OK).json({ agent });
};

export const updateAgent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { photo, name, password } = req.body;
  const agent = await Agent.findById(id);
  if (!agent) {
    throw new CustomError.BadRequest("Invalid agent value");
  }

  if (photo) {
    agent.photo = photo;
  }
  if (name) {
    agent.name = name;
  }
  await agent.save();
  res.status(StatusCodes.OK).json({ agent });
};
