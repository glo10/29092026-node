import { EventEmitter } from 'node:events'
const customEvent = new EventEmitter()
customEvent.on('app:custom', (...params) => {
    console.log('params', params)
    // TODO vos tâches à exécuter
})

setTimeout(() => {
    customEvent.emit('app:custom', 200, 'OK', 'headers', 'body')
}, 4000)

setTimeout(() => {
    customEvent.emit('app:custom', ['open', 'bar'])
}, 2000)

const id = setInterval(() => {
    customEvent.emit('app:custom', { username: 'John', age: 45 })
}, 3000)

setTimeout(() => {
    clearInterval(id)
    process.exit(0)
}, 10000)