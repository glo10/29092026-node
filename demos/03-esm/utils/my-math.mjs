export const add = (nb1, nb2) => nb1 + nb2 // equivalent de function add(nb1, nb2) { return nb1 + nb2 }
const minus = (nb1, nb2) => nb1 - nb2 // fonction interne qui n'est exposée (exportée) à l'extérieur
export const multiply = (nb1, nb2) => nb1 * nb2
export const PI = 3.14