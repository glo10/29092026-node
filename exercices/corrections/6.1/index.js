import app from './app.js'
process.loadEnvFile()
const PORT = process.env.PORT || 6100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})