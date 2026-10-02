import { Schema, model } from "mongoose";
/**
 * @see vous pouvez mettre en place des middlewares https://mongoosejs.com/docs/middleware.html
 * schema.post('save', cb) // avant la sauvegarde , cb = callback function
 * schema.pre('save, cb)  // après la sauvegarde
*/
export default model("Team", Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  // players: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Player' // Player = nom du modèle qu'on a définit dans models/player.js
  //   }
  // ]
}));