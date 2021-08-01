require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { ADDRESS, PORT, NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const app = express()

const helpRouter = require('./help/help-router')
const bookingRouter = require('./booking/booking-router')

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
}))

app.use(helmet())
app.use(validateBearerToken)

app.use('/api/help', helpRouter)
app.use('/api/booking', bookingRouter)

app.get('/', (req, res) => {
    res.send('Yippie!! Server Online in ' + NODE_ENV + ' mode! At ' + ADDRESS + ':' + PORT);
})

app.use(errorHandler)

module.exports = app