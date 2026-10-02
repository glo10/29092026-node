import express from "express";
const indexRouter = express.Router();
import { getDocumentation } from "../controllers/index-controller.js";
indexRouter.get("/", getDocumentation);
export default indexRouter;
