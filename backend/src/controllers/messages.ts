import { Request, Response, NextFunction } from "express";
import db from "../db";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const friendId = Number(req.params.friendId);
    if (isNaN(friendId)) {
      res.status(400).json({ message: "Invalid friend id" });
      return;
    }
    const messages = await db.message.findMany({
      where: {
        OR: [
          { fromId: friendId, toId: req.user!.id },
          { toId: friendId, fromId: req.user!.id },
        ],
      },
    });
    const data = messages.map((e) => ({
      id: e.id,
      you: e.fromId === req.user!.id,
      message: e.content,
      when: new Date(e.createdAt),
    }));
    res.json(data);
  } catch (e) {
    next(e);
  }
};

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const friendId = Number(req.params.friendId);
    const { message } = req.body;
    if (isNaN(friendId)) {
      res.status(400).json({ message: "Invalid friend id" });
      return;
    }
    await db.message.create({
      data: {
        fromId: req.user!.id,
        toId: friendId,
        content: message,
      },
    });
    res.json({ message: "message successfully sent" });
  } catch (e) {
    next(e);
  }
};

export { getMessages, sendMessage };
