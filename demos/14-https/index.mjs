import { createServer } from "node:https";
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('config/demo.pem'),
  cert: readFileSync('config/demo.crt'),
};

createServer(options, (_, res) => {
    res.end('OK')
})
.listen(8443)