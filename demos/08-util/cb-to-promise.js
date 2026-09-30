/**
 * Avec node:uil il est possible de transformer une callback en promise et vis-versa
 *  callbackify() transforme promise en callback
 *  promisify() transforme callback en promise
 */
import { writeFile, readFile } from "node:fs";
import { promisify } from "node:util";
const writeFilePromise = promisify(writeFile)
await writeFilePromise("yes.txt", "yes")
  .then(() => console.log("en cas de succès then s'exec"))
  .catch((err) =>
    console.error("catch s'exec en cas d'erreur sur la promesse", err),
  );
readFile("yes.txt", { encoding: "UTF-8" }, (error, content) => {
  if (!error) console.log("contenu de yes.txt async via une promesse", content.toString());
});
