import { NextFunction, Request, Response } from "express";
import db from "../db";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, photoUrl: true, about: true },
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

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "public"));
  },
  filename: (_req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const updateProfilePicture = [
  upload.single("avatar"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "error setting photo" });
        return;
      }
      const user = await db.user.update({
        where: { id: req.user!.id },
        data: {
          photoUrl: req.file?.filename,
        },
        select: { id: true, name: true, photoUrl: true, about: true },
      });
      res.json({ message: "successfully updated photo", user });
    } catch (err) {
      next(err);
    }
  },
];

const updateAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { about }: { about: string } = req.body;
    const user = await db.user.update({
      where: { id: req.user!.id },
      data: {
        about: about,
      },
      select: { id: true, name: true, about: true, photoUrl: true },
    });
    res.json({ message: "successfully updated about", user });
  } catch (error) {
    next(error);
  }
};

export { getCurrentUser, updateAbout, updateProfilePicture, deleteUser };
