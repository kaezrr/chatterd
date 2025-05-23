import { Request, Response, NextFunction } from "express";
import db from "../db";

const getFriends = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const friends = await db.friendShip.findMany({
      where: { toId: req.user!.id, status: "ACCEPTED" },
      select: { from: { omit: { password: true } } },
    });
    const data = friends ? friends.map((e) => e.from) : [];
    res.json(data);
  } catch (e) {
    next(e);
  }
};

const deleteFriend = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const friendId = Number(req.params.friendId);
    if (isNaN(friendId)) {
      res.status(400).json({ message: "Invalid friend id" });
      return;
    }

    await db.friendShip.deleteMany({
      where: {
        OR: [
          { fromId: req.user!.id, toId: friendId },
          { fromId: friendId, toId: req.user!.id },
        ],
      },
    });

    res.json({ message: "Successfully removed friend!" });
  } catch (e) {
    next(e);
  }
};

export { deleteFriend, getFriends };
