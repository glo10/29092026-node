/**
 * Une promesse (Promise) a 3 états
 *  - pending : au lancement (appel de la fonction)
 *  - fullfill : résolution de la promesse avec succès et exécution de la fonction resolve() de la callback
 *  - reject : résolution de la promesse a échoué et exécution de la fonction reject() de la callback
 * 
 * Comment exploiter les infos renvoyées par la promesse
 * Option 1 .then() et catch()
 * 
 * - En cas de succès : on peut utiliser .then() pour recupérer les données renvoyées par resolve()
 * - En cas d'erreur : on peut utiliser .catch() pour capturer l'erreur ou récupérer les infos renvoyées par reject()
 * Option 2 avec await
 * 
 * */

/**
 * fetch est une implémentation simplifié de l'objet Promise
 * Attention fetch() ne renvoie pas directement les résultats
 *  elle renvoie un objet Response avec des propriétés
 *  Pour exploiter les résultats, il faut renvoyer dans le then une promesse en exécutant .json() ou .text() selon la nature des données
 *  .json() : pour les données renvoyées au format JSON par le serveur
 *  .text() : pour les données textuelles comme html, markdown, css, etc.
 * Enfin dans le .then() suivant on peut exploiter ses données
 */
 
fetch('https://jsbin.com/piwihubewi/edit')
.then((res) => {
  console.log('res', res) // objet Response
  if(res.ok) {
    return res.text() // renvoie d'une nouvelle promesse avec la transformation du body en texte pour le rendre exploitable pour la suite
  }
})
.catch(() => [{ id: 1}, {id: 2}]) // en cas d'erreur du .then() prec.
.then(data => {
  console.log('data', data)
  return data
}).then(data => console.log('total', data.length ))

 
fetch('https://jsonplaceholder.typicode.com/users')
.then((res) => {
  if(res.status === 200 ) {
    return res.json()
  }
})
.then(users => {
  console.log('users', users)
  return users
}).then(users => console.log('total', users.length ))