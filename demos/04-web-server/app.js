/**
 * 1. Importer la méthode createServer depuis node:http ou http 
 * (avec prefixe node: non obligatoire mais marqueur pour voir qu'il s'agit d'un paquet embarquée de node et non une dep extérieure)
 * 2. Ecouter sur un port de votre choix (un port disponible et non reservé des ports > 1024)
 * 3. Se rendre sur une page web pour voir le résultat
*/
import { createServer } from 'node:http'

export const app = createServer(function(req, res) {
    // Récupérer les infos de la requêtes
    const { url, method } = req
    if(method === 'GET' && url === '/') {
        res.write('Bienvenue!')
        res.write('A toi')
    } else {
        res.write('Aurevoir')
        res.write('!')
    }
    res.end()
})