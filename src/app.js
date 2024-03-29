require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { ADDRESS, PORT, NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const app = express()

const helpRouter = require('./help/help-router')

const userRouter = require('./user/user-router')
const userRoleRouter = require('./usersbyrole/user-role-router')
const userinfoRouter = require('./userinfo/userinfo-router')

const tripRouter = require('./trip/trip-router')
const tripOperatorRouter = require('./tripbyoperator/trip-operator-router')
const tripDriverRouter = require('./tripbydriver/trip-driver-router')

const bookingRouter = require('./booking/booking-router')

let whitelist = [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://schoolbookingapp.godnicgarage.com',
    'https://schoolbookingapi.godnicgarage.com']

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
}))

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = `The CORS policy for this origin doesn't ` +
                `allow access from the particular origin.`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.use(helmet())
app.use(validateBearerToken)

app.use('/api/help', helpRouter)

app.use('/api/user', userRouter) // works
app.use('/api/userrole', userRoleRouter) // works
app.use('/api/userinfo', userinfoRouter) // works

app.use('/api/trip', tripRouter) // works
app.use('/api/tripoperator', tripOperatorRouter) // works
app.use('/api/tripdriver', tripDriverRouter) // works

app.use('/api/booking', bookingRouter) //

app.get('/', (req, res) => {
    res.send('Yippie!! Server Online in ' + NODE_ENV + ' mode! At ' + ADDRESS + ':' + PORT);
})

app.use(errorHandler)

module.exports = app