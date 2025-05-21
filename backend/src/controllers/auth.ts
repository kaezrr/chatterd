import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";
import bcrypt from "bcryptjs";
import db from "../db";
import passport from "passport";

const signUpUser = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("username not alphanumeric")
    .custom(async (value) => {
      const user = await db.user.findUnique({ where: { name: value } });
      if (user) {
        return Promise.reject("username already exists");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("password too short"),

  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json(result.array());
      return;
    }

    const { username, password }: { username: string; password: string } =
      req.body;
    const hashPass = await bcrypt.hash(password, 10);

    try {
      const user = await db.user.create({
        data: {
          name: username,
          password: hashPass,
        },
        select: {
          id: true,
          name: true,
        },
      });
      res.json({ message: "user created", user });
    } catch (err) {
      next(err);
    }
  },
];

const signInUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: Express.User, info: any) => {
      if (err) return next(err);

      if (!user) return res.status(500).json({ message: info.message });

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ message: "user logged in" });
      });
    },
  )(req, res, next);
};

const signOutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ message: "user logged out" });
  });
};

export { signUpUser, signInUser, signOutUser };
