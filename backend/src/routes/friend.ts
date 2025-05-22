import { Router } from "express";
import { authenticateUser } from "../utils";
import { getFriends, deleteFriend } from "../controllers/friend";

const friendRouter = Router();

friendRouter.get("/", authenticateUser, getFriends);
friendRouter.delete("/:userId", authenticateUser, deleteFriend);

export default friendRouter;
