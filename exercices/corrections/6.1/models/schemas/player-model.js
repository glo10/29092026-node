import { Schema, model } from "mongoose";

export default model("Player", Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
}));
