import { KEY_FILE, CERT_FILE } from "./paths.js";
import { readFileSync } from "node:fs";
export default {
  key: readFileSync(KEY_FILE),
  cert: readFileSync(CERT_FILE)
};