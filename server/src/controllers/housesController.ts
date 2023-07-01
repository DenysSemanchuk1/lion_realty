import { StatusCodes } from "http-status-codes";
import House from "../models/House";
import { QueryObject } from "../types/productControllerModels";
import { Request, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import CustomError from "../errors";
import { Document } from "mongoose";

interface IHouse extends Document {
  [key: string]: any;
}
export const getSingleAgentHouses = async (
  req: CustomRequest,
  res: Response
) => {
  const { agentId } = req.agent;
  const singleAgentHouses = await House.find({ agent: agentId });
  res.status(StatusCodes.OK).json({ agents: singleAgentHouses });
};

export const deleteHouse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const house = await House.findById(id);

  if (!house) throw new CustomError.BadRequest(`No house with id: ${id}`);

  house.deleteOne();
  res.status(StatusCodes.OK).json({ house });
};

export const updateHouse = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const house = (await House.findById(id)) as IHouse;
  const agentId = req.agent.agentId;
  const body = req.body;
  if (!house) {
    throw new CustomError.NotFound(`No house with id: ${id}`);
  }
  if (agentId !== house.agent) {
    throw new CustomError.BadRequest(`Agent can change only his products`);
  }

  Object.keys(req.body).forEach((prop) => {
    house[prop] = req.body[prop];
  });

  await house.save();
  res.status(StatusCodes.OK).json({ house });
};

export const getAllHouses = async (req: Request, res: Response) => {
  // client sends to me these filters
  // {
  // price: number-number, area: number-number, rooms: number-number | free planning, floor: JSON.stringify({ from: number, to: number, notFirst: bool, notLast: bool}), repair: string, lastFloor
  // }
  const { price, area, rooms, floor, repair, lastFloor } = req.query as {
    price: string;
    area: string;
    rooms: string;
    floor: string;
    repair: string;
    lastFloor: string;
  };
  const queryObject: QueryObject = {};
  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    queryObject.price = {
      $gte: +minPrice,
      $lte: +maxPrice,
    };
  }
  if (area) {
    const [minArea, maxArea] = area.split("-");
    queryObject.area = {
      $gte: +minArea,
      $lte: +maxArea,
    };
  }

  if (rooms) {
    if (rooms === "freePlanning") queryObject.rooms = rooms;
    else {
      const [minRooms, maxRooms] = rooms.split("-");
      queryObject.rooms = {
        $gte: +minRooms,
        $lte: +maxRooms,
      };
    }
  }

  if (floor) {
    const floorRequest: { $gte?: number; $lte?: number } = {};
    const { from, to, notFirst, notLast } = JSON.parse(floor);
    if (notFirst) {
      floorRequest.$gte = 2;
    }
    if (notFirst && from) {
      floorRequest.$gte = from > 2 ? from : 2;
    }

    if (notLast) {
      floorRequest.$lte = +lastFloor - 1;
    }
    if (notLast && to) {
      floorRequest.$lte = to < +lastFloor - 1 ? to : +lastFloor - 1;
    }
  }

  if (repair) {
    queryObject.repair = repair;
  }

  const houses = await House.find(queryObject);
  res.status(StatusCodes.OK).json({ houses, count: houses.length });
};

export async function createHouse(req: CustomRequest, res: Response) {
  const house = await House.create({
    ...req.body,
    agent: req.agent.agentId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Succesfully created house", house });
}
