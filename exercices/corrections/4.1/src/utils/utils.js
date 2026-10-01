import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const USERS_FILENAME = join(ROOT_PATH,  'data', 'users.json')
process.loadEnvFile(join(ROOT_PATH, '.env'))