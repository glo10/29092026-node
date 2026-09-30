import { createReadStream } from "node:fs";

import { createServer } from "node:http";

createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const htmlStream = createReadStream('index.html')
    htmlStream.pipe(res) // Les informations sont partagées par paquet, gestion des événements data (à chaque réception des données) et end (à la fin des opérations)
  }
}).listen(7000);
