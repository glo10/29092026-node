import { readFile, writeFile, readFileSync, writeFileSync } from "node:fs"; // import via les callbacks
import { writeFile as writeFilePromise } from "node:fs/promises"; // import sous forme de promesses
// A ne pas faire callback imbriquée
writeFile("ko.txt", "KO", (err) => {
  if (!err) {
    readFile("ko.txt", { encoding: "UTF-8" }, (error, content) => {
      if (!error) console.log("contenu ko.txt async via CB", content.toString());
    });
  }
});
// Solution 1 : casser la dépendance et utiliser pour l'écriture et la lecture des opérations synchrones (pas le meilleur choix mais possible)
writeFileSync("ok.txt", "OK");
const ok = readFileSync("ok.txt");
console.log("contenu synchrone de ok.txt", ok.toString());

// Solution 2 : Mettre en pause avec async l'écriture pour s'assurer qu'à lecture le fichier est déjà écrit (sans casser l'asynchrone)
await writeFilePromise("yes.txt", "yes") // met en pause pour attendre le résultat avant d'exec la suite
  .then(() => console.log("en cas de succès then s'exec"))
  .catch((err) =>
    console.error("catch s'exec en cas d'erreur sur la promesse", err),
  );
readFile("yes.txt", { encoding: "UTF-8" }, (error, content) => {
  if (!error) console.log("contenu de yes.txt async via une promesse", content.toString());
});
