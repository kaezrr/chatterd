import { Router } from "express";
import { authenticateUser } from "../utils";
import { getFriends, deleteFriend } from "../controllers/friend";

const friendRouter = Router();

friendRouter.get("/", authenticateUser, getFriends);
friendRouter.delete("/:friendId", authenticateUser, deleteFriend);

export default friendRouter;
