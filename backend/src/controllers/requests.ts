import { Request, Response, NextFunction } from "express";
import db from "../db";

const getAllRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requests = await db.friendRequest.findMany({
      where: { toId: req.user!.id },
      select: {
        id: true,
        from: { omit: { password: true } },
      },
    });
    res.json(requests ?? []);
  } catch (e) {
    next(e);
  }
};

const acceptRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json("dummy");
  } catch (e) {
    next(e);
  }
};

const rejectRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json("dummy");
  } catch (e) {
    next(e);
  }
};

const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.params;
    const userId = await db.user.findUnique({
      where: { name: username ?? "" },
    });

    if (!userId || userId.id === req.user!.id) {
      res.status(400).json({ message: "username not found" });
      return;
    }

    await db.friendRequest.create({
      data: {
        fromId: req.user!.id,
        toId: userId.id,
      },
    });
    res.json({ message: "successfully sent friend request" });
  } catch (e) {
    next(e);
  }
};

export { getAllRequests, acceptRequest, rejectRequest, createRequest };
