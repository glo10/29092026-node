import { writeFile, readFile } from "node:fs/promises";
import { HTML } from "./data.mjs";
import { createServer } from "node:http";
const filename = "index.html";
const PORT = 3100;
await writeFile(filename, HTML, { encoding: "utf-8" })
  .then(() => {
    console.info(`Ecriture du fichier ${filename} OK`);
  })
  .catch((err) => console.error("error writeFile", err));

createServer(async (req, res) => {
  const content = await readFile(filename, { encoding: "utf-8" })
    .then((data) => data)
    .catch(() => "Impossible de lire le fichier");
  res.end(content);
}).listen(PORT, () => {
  console.info(`Running on http://localhost:${PORT}`);
});
