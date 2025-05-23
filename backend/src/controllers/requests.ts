import { Request, Response, NextFunction } from "express";
import db from "../db";

const getAllRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requests = await db.friendShip.findMany({
      where: { toId: req.user!.id, status: "PENDING" },
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
    const requestId = Number(req.params.requestId);
    if (isNaN(requestId)) {
      res.status(400).json({ message: "invalid request id" });
      return;
    }

    const freq = await db.friendShip.findUnique({
      where: { id: requestId },
    });

    if (!freq) {
      res.status(400).json({ message: "invalid request id" });
      return;
    }

    await db.friendShip.createMany({
      data: [
        { fromId: freq.fromId, toId: freq.toId },
        { fromId: freq.toId, toId: freq.fromId },
      ],
      skipDuplicates: true,
    });

    await db.friendShip.updateMany({
      where: {
        OR: [
          { fromId: freq.fromId, toId: freq.toId },
          { fromId: freq.toId, toId: freq.fromId },
        ],
      },
      data: { status: "ACCEPTED" },
    });

    res.json({ message: "successfully accepted friend request" });
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
    const requestId = Number(req.params.requestId);
    if (isNaN(requestId)) {
      res.status(400).json({ message: "invalid request id" });
      return;
    }

    const freq = await db.friendShip.findUnique({
      where: { id: requestId },
    });

    if (!freq) {
      res.status(400).json({ message: "invalid request id" });
      return;
    }

    await db.friendShip.delete({
      where: { id: requestId },
    });

    res.json({ message: "successfully rejected friend request" });
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

    await db.friendShip.create({
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
