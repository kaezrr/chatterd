import { Router } from "express";
import { authenticateUser } from "../utils";
import { getMessages, sendMessage } from "../controllers/messages";

const messageRouter = Router();

messageRouter.get("/:friendId", authenticateUser, getMessages);
messageRouter.post("/:friendId", authenticateUser, sendMessage);

export default messageRouter;
