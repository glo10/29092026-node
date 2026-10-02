import express from "express";
import { validateTeam, validateMongoId } from "../middlewares/team-middleware.js";
import { findAll, findOne, save } from "../controllers/team-controller.js";
const teamsRouter = express.Router();

teamsRouter.get("/", findAll);
teamsRouter.get("/:id", validateMongoId, findOne);
teamsRouter.post("/", validateTeam, save);
export default teamsRouter;
