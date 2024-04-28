require('dotenv').config()
const PORT = process.env['PORT']

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Routes = require('./Router/routes')
const logger = require('./logger')
const cors = require('cors')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())
app.use(cors())

app.use('/api/jkc', Routes)

app.listen(PORT,() => {
    logger.info('Server is up and listening on port- ' + PORT)
})