import { readFile, writeFile, access } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
const FILE_PATH = "users.json";

const app = createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  const firstname = await app.question("Votre prénom ? ");
  const lastname = await app.question("Votre nom ? ");
  const singleUserFilename = Math.ceil(Math.random() * 10000); // TODO vérifier que le fichier n'existe pas déjà => access()
  const newUser = {
    firstname: firstname.trim(),
    lastname: lastname.trim(),
  };
  let users = [];
  writeFile(`${singleUserFilename}.json`, JSON.stringify(newUser, null, 2))
  .catch(() => new Error('Impossible de créer le fichier json individuel'))
  try {
    const c = await access(FILE_PATH);
    users = JSON.parse(await readFile(FILE_PATH, "utf-8"));
  } catch (err) {
    users = [];
  }
  users.push(newUser);
  writeFile(FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
} catch (error) {
  console.error("[ERROR]", error);
} finally {
  app.close();
}
