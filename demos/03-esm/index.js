// Client qui va importer les fonctions des autres modules pour les exécuter ici
import { add } from './utils/my-math.mjs'
import { add as addUser } from './utils/user.mjs'
import Article from './classes/product.mjs'

console.log('somme de 5 et 6', add(5,6))
console.log('add user', addUser([], { firstname: 'Alice '}))
const p1 = new Article('ref123456')
p1.display()