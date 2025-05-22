import { Request, Response, NextFunction } from "express";
import db from "../db";

const getFriends = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const friends = await db.user.findUnique({
      where: { id: req.user!.id },
      include: {
        friends: {
          select: {
            id: true,
            user: {
              select: { name: true, photoUrl: true, about: true },
            },
          },
        },
      },
    });
    const data = friends
      ? friends.friends.map((e) => ({ id: e.id, ...e.user }))
      : [];
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

    const you = await db.user.update({
      where: { id: req.user!.id },
      data: {
        friends: { disconnect: [{ id: friendId }] },
      },
    });

    const friend = await db.user.update({
      where: { id: friendId },
      data: {
        friends: { disconnect: [{ id: req.user!.id }] },
      },
    });

    if (!friend || !you) {
      res.status(400).json({ message: "Invalid friend id" });
      return;
    }

    res.json({ message: "Successfully removed friend!" });
  } catch (e) {
    next(e);
  }
};

export { deleteFriend, getFriends };
