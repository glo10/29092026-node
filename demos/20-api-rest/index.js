import app from "./app";
import { createServer } from 'node:http'

createServer(app)
.listen(8450)