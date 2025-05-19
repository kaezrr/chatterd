import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import db from "./db";

passport.use(
  new passportLocal.Strategy(async (username, password, done) => {
    const user = await db.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return done(new Error("Username doesn't match"), false);
    }

    if (!(await bcrypt.compare(user.password, password))) {
      return done(new Error("Password doesn't match"), false);
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
