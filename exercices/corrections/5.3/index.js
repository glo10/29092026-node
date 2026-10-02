import app from './app.js'

const PORT = 5300
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})