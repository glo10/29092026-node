import { Schema, model } from "mongoose";

export default model("Game",  Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  score: { type: String, required: true },
  at: { type: Date, required: true },
}));
