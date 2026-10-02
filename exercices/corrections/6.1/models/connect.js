import { mongoose } from "mongoose";
export async function connect(url = null, options = {}) {
  const state = mongoose.connection.readyState;
  if (state != 1) { // not connected
    return mongoose
      .connect(url || process.env.DB_LOCAL, options)
      .then(() => {
        console.info('connected OK')
      }) // 0 => disconnected, 1 => connected, 2 => Connecting, 3 => disconnecting
      .catch((err) => console.error("DB KO", err))
      .finally(() => {
        return mongoose.connection.readyState
      })
  }

  return state;
}