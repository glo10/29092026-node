import { createServer } from 'node:http'
import { createReadStream} from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import {fileURLToPath} from 'node:url'
/**
 * dirname()
 * resolve() : résolution chemin et résultat final un chémin absolu
 * join() : résolution chemin mais ne retourne pas forcément un chemin absolu (plutôt utiliser pour concaténer)
 */
/**
 * Méthode
 * 
 * 1. Utiliser fileURLToPath(import.meta.url) => transforme l'URL du fichier courant en chemin
 * 2. Récupérer le dossier du fichier courant avec dirname()
 * 3. Construire nos différents chemins avec resolve() et/ou join()
 */
console.log('import.meta', import.meta)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PUBLIC_PATH = resolve(__dirname, 'public')
const CSS_PATH = join(PUBLIC_PATH, 'css')
const CONFIG_PATH = join(PUBLIC_PATH, '..', '..', 'config')
const ENV_FILE = join(CONFIG_PATH, '.env')
const INDEX_FILE = join(PUBLIC_PATH, 'index.html')
console.log('paths', PUBLIC_PATH, CONFIG_PATH, ENV_FILE)

createServer((req, res) => {
    const html = createReadStream(INDEX_FILE)
    html.pipe(res)
    // res.end('OK')
}).listen(8200)