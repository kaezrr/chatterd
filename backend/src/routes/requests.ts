import { Router } from "express";
import { authenticateUser } from "../utils";

import {
  getAllRequests,
  rejectRequest,
  acceptRequest,
  createRequest,
} from "../controllers/requests";

const requestRouter = Router();

requestRouter.get("/", authenticateUser, getAllRequests);
requestRouter.post("/:username", authenticateUser, createRequest);
requestRouter.put("/:requestId", authenticateUser, acceptRequest);
requestRouter.delete("/:requestId", authenticateUser, rejectRequest);

export default requestRouter;
