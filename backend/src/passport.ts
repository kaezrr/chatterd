import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import db from "./db";
import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

passport.use(
  new passportLocal.Strategy(async (username, password, done) => {
    const user = await db.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return done(null, false, { message: "Username doesn't match" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: "Password doesn't match" });
    }

    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await db.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return done(new Error("Invalid user"), false);
  }

  done(null, user);
});

export default passport;
