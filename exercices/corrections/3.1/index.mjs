import { readFile } from "node:fs";
import { writeFile } from "node:fs/promises";
import { HTML } from "./data.mjs";

await writeFile("index.html", HTML)
  .then(() => console.log("écriture OK"))
  .catch((err) => console.error("Can't write index.html", err));

readFile("index.html", { encoding: "utf-8" }, (err, data) => {
  if (!err) console.info("index.html", data);
  else console.error("can't read index.html", err);
});
