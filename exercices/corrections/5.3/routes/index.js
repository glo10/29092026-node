import express from 'express'
const indexRouter = express.Router()
indexRouter.get('/', (req, res) => {
    res.send('API documentation')
})
export default indexRouter