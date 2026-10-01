import { createServer } from 'node:http'
import { URL } from 'node:url'
createServer((req, res) => {
    // Récupérer les infos de l'url de la req client
    const { url, headers, method } = req // idem const url = req.url; const method = req.method
    const myURL = new URL(`http://${headers.host}/${url}?id=100&login=bob#bonjour`)
    const myHash = myURL.hash
    const id = myURL.searchParams.get('id')
    const login = myURL.searchParams.get('login')
    console.log('id', id, 'login', login)
    const regex = /^\/users.*/.test(url)
    if(method === 'POST' && url.startsWith('/users')) {
        let body = ''
        req.on('data', (chunk) => { // récupérer les infos envoyés dans le body de la requête
            body += chunk
        })
        req.on('end', () => {
            console.log('data', body, 'data string', body.toString())
            const user = JSON.parse(body)
            res.end('OK')
        })
    }
}).listen(8120)