// TODO: get path that gets all friends
// TODO: delete path that removes friend with id
import { Router } from "express";
import { authenticateUser } from "../utils";

const friendRouter = Router();

friendRouter.get("/", authenticateUser);
friendRouter.delete("/:userId", authenticateUser);

export default friendRouter;
