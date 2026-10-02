/**
 * Objectif : récupérer un gros fichier JSON depuis une API externe
 *  et l'écriture par paquet en local en utilisant les streams
 * Pour l'implémentation on va utiliser un client HTTPS
 */

import { get } from "node:https"; // client HTTP
import { createWriteStream, unlink } from "node:fs";
const url =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json";
get(url, (res) => {
  const jsonStreamLocal = createWriteStream("countries.json");
  res.pipe(jsonStreamLocal);
  res.on("data", (chunk) => {
    console.info("Reception du paquet", chunk.toString());
  });
  jsonStreamLocal.on("finish", () => {
    console.log("Ecriture intégral du fichier avec succès");
  });
  res.on("error", (err) => {
    // unlink('countries.json')
    console.error("Erreur réponse du serveur", err);
  });
  jsonStreamLocal.on("error", (err) => {
    console.error("Erreur écriture en local", err);
  });
});
