import { NextFunction, Request, Response } from "express";
import db from "../db";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user!.id },
      select: { name: true, photoUrl: true, about: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.user.delete({
      where: { id: req.user!.id },
    });
    res.json({ message: "user successfully deleted" });
  } catch (err) {
    next(err);
  }
};

const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export { getCurrentUser, updateAbout, updateProfilePicture, deleteUser };
