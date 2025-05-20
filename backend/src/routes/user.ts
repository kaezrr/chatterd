import { Router } from "express";
import { authenticateUser } from "../utils";
import {
  getCurrentUser,
  updateAbout,
  updateProfilePicture,
  deleteUser,
} from "../controllers/user";
import { signOutUser } from "../controllers/auth";

const userRouter = Router();

userRouter.get("/me", authenticateUser, getCurrentUser);
userRouter.delete("/", authenticateUser, deleteUser);
userRouter.put("/about", authenticateUser, updateAbout);
userRouter.put("/display", authenticateUser, updateProfilePicture);

export default userRouter;
