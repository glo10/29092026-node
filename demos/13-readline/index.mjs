import { writeFile } from 'node:fs'
import { createInterface } from 'node:readline/promises'

const app = createInterface(process.stdin, process.stdout)
const project = await app.question('Le nom du projet ? ')
const author = await app.question('Auteur ? ')
const infos = {
    author,
    project
}
// idem que 
/**
 * const infos = {
    author : author,
    project : author
}
 */
writeFile('package.json', JSON.stringify(infos, true, 4), (err) => {
    if(!err) console.log('OK')
})
// TODO on peut écrire dans un fichier JSON ces infos
app.close()