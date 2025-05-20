import { Router } from "express";
import { signInUser, signOutUser, signUpUser } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signin", signInUser);
authRouter.post("/signout", signOutUser);
authRouter.post("/signup", signUpUser);

export default authRouter;
