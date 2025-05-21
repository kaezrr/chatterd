import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";
import passport from "./passport";
import db from "./db";
import "dotenv/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import userRouter from "./routes/user";
import { errorHandler } from "./utils";
import authRouter from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("images"));
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    secret: process.env.COOKIE_SECRET || "notsosecret",
    saveUninitialized: false,
    resave: false,
    store: new PrismaSessionStore(db, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
