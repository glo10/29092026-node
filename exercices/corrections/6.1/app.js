import express from "express";
import indexRouter from "./routes/index.js";
import teamsRouter from "./routes/teams.js";
import { connect } from "./models/connect.js";
process.loadEnvFile();

console.log("ENV", process.env.NODE_ENV, process.env.NODE_ENV !== "test");
// Se connecter uniquement en dehors de l'environnement de test car ce dernier se connecter sur une autre BDD dédiée aux tests
if (process.env.NODE_ENV.trim !== "test") {
  connect();
}
const app = express();
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});
app.use("/", indexRouter);
app.use("/teams", teamsRouter);

export default app;
