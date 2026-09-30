import { readFile, writeFile, mkdir, unlink, access } from 'node:fs'

// Lecture d'un fichier html
readFile('index.html', (err, content) => {
    if(!err) console.log('contenu en buffer', content, 'contenu en string', content.toString())
})

const page404 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>404</h1>
</body>
</html>
`
// Ecriture
writeFile('404.html', page404, (err) => {
    if(err) console.error('erreur écriture page 404', err)
})