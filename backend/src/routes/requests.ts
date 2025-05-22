// TODO: get path that returns all pending requests
// TODO: put path that accepts requests with request id
// TODO: post path that creates requests with username
// TODO: delete path that rejects requests with request id
import { Router } from "express";
import { authenticateUser } from "../utils";

const requestRouter = Router();

requestRouter.get("/", authenticateUser);
requestRouter.put("/:requestId", authenticateUser);
requestRouter.post("/:username", authenticateUser);
requestRouter.delete("/:requestId", authenticateUser);

export default requestRouter;
