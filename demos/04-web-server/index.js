import { app } from './app.js'
process.loadEnvFile('.env')
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Running', `http://localhost:${PORT}`)
})