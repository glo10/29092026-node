import { createServer } from 'node:http'

createServer((req, res) => {
    const { url, method, headers } = req
    console.log('headers', headers)
    if(method != 'GET') res.end('Bye!') // ecriture puis fermeture
    switch(url) {
        case '/':
            res.writeHead(200)
        break;
        case '/403':
            res.writeHead(403)
        break;
        default:
            res.writeHead(404)
        break;
    }
}).listen(8000)