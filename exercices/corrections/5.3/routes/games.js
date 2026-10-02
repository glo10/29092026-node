import express from 'express'
const gamesRouter = express.Router()
gamesRouter.get('/', (req, res) => {
  const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  res.status(200).send(games)
})

gamesRouter.get('/', (req, res) => {
  const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  res.status(200).send(games)
})

gamesRouter.get('/search', (req, res) => {
 const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  const gamesByTeam = games.filter(t => t.home === req.query.team || t.away === req.query.team )
  res.status(200).send(gamesByTeam)
})

gamesRouter.post('/', (req, res) => {
  const game = { id: "", home: "", away: "", score: "", date: ""}
  res.status(201).send(game)
})

gamesRouter.put('/:id', (req, res) => {
  const game = {data: { id: "", home: "", away: "", score: "", date: ""}, updated: true}
  res.status(200).send(game)
})


export default gamesRouter