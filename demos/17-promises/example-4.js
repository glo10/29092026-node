
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
// Promesse simple
fetchDataPromise("API Utilisateurs", 1000)
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message));

const p1 = fetchDataPromise("API 1", 1000, true);
const p2 = fetchDataPromise("API 2", 2000, true);
const p3 = fetchDataPromise("API 3", 500, true);
const pError = fetchDataPromise("API 4 Défaillante", 800, false);

// Promise.all()
Promise.all([p1, p2, p3]) // s'arrête à la première erreur
  .then((results) => {
    console.log("Promise.all() Succès", results);
  })
  .catch((error) => console.error("Promise.all() a échoué :", error.message));

Promise.all([p1, pError, p3]).catch((error) => {
  console.log("Promise.all() Échec");
  console.log(error.message); // Stoppe immédiatement dès l'échec de pError
});

// Promise.allSettled()
Promise.allSettled([p1, pError, p3]).then((results) => {
  results.forEach((res, index) => {
    if (res.status === "fulfilled") {
      console.log(`Promise.allSettled() : ${index + 1} réussie :`, res.value);
    } else {
      console.log(
        `Promise.allSettled() : ${index + 1} échouée :`,
        res.reason.message,
      );
    }
  });
});

// C. Promise.race()
Promise.race([p1, p2, p3])
  .then((winner) => {
    console.log("Promise.race() le plus rapide est :", winner);
  })
  .catch((error) =>
    console.error("Promise.race() le plus rapide a échoué :", error.message),
  );
