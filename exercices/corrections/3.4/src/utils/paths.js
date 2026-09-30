import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PUBLIC_PATH = resolve(__dirname, "..", "..", "public");
export const CONFIG_PATH = resolve(__dirname, "..", "..", "config");
export const ENV_FILE = resolve(__dirname, "..", "..", ".env");
export const KEY_FILE = join(CONFIG_PATH, "key.pem");
export const CERT_FILE = join(CONFIG_PATH, "cert.crt");
