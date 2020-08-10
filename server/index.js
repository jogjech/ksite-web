const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const requestIp = require('request-ip')

require('dotenv').config()

const app = express()
const visitor = require('./routes/visitor')
const episode = require('./routes/episodes')
const articles = require('./routes/articles.js')

module.exports = { path: '/api', handler: app }

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(requestIp.mw())

app.use('/episodes', episode)
app.use('/visitors', visitor)
app.use('/articles', articles)

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status)
  }
  res.json({
    message: err.message,
    stack: err.stack,
  })
})
