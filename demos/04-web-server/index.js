import { app } from './app.js'
process.loadEnvFile('.env') // charger les variables d'environnement depuis .env
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Running', `http://localhost:${PORT}`)
})