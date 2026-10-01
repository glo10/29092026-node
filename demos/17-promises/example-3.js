import { readFile, writeFile } from "node:fs/promises";
function fetchDataPromise(resource, timeOut, isSuccess = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`[OK] Données reçues de ${resource} en ${timeOut}ms`);
      } else {
        reject(new Error(`[Error] : Échec de connexion à ${resource}`));
      }
    }, timeOut);
  });
}

/** Option 1 pour récupérer les données */
fetchDataPromise("API Utilisateurs", 1000)
  .then((result) => result)
  .catch((error) => error.message);

/** Option 2 pour récupérer les données async/await */
try {
  const data = await fetchDataPromise("API Utilisateurs", 1000); // soit il retourne le resultat du resolve() ou du reject()
  console.log("data", data);
} catch (error) {
  console.error("erreur fetchDataPromise");
}

/**
 * Promesse un peu plus lisible pour éviter d'encombrer ou d'enchainer plusieurs .then et catch à l'appel
 */
const myPromise = new Promise(async (resolve, reject) => {
  return readFile("index.html")
    .then((content) => resolve(content.trim()))
    .catch(() => reject("KO"));
});

try {
  const content = await myPromise();
  if (content) {
    writeFile("index.txt", content);
    console.log("Ok"); // attention cette ligne est exécutée avant d'avoir le résultat de writeFile()
  }
} catch (error) {
  console.error("erreur myPromise");
}
