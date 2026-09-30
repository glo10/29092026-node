import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs";
import { callbackify } from "node:util";
const writeFileCB = callbackify(writeFile)
writeFileCB("yes.txt", "yes", (err) => {
    if(!err) console.log('Yes')
})

readFile("yes.txt", { encoding: "UTF-8" }, (error, content) => {
  if (!error) console.log("contenu de yes.txt async via une promesse", content.toString());
});
