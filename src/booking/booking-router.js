const path = require('path')
const express = require('express')
const BookingServices = require('./booking-services')
const crypto = require('crypto')
const bookingRouter = express.Router()
const jsonParser = express.json()

bookingRouter
    .route('/')

    .get((req, res, next) => {
            BookingServices.getAllBookings(req.app.get('db'))
                .then(students => {
                    res.json(students)
                })
                .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const student = {
            studentid, sfirstname, slastname,
            saddress, gnationalid, gfirstname,
            glastname, gaddress, gemail, gtelno,
            gmobno, pickupadd, schoolname, classname,
            pickupdays, additionalinfo, fsta, stsa,
            agreement, current_date, state
        } = req.body

        for (const [key, value] of Object.entries(student)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        BookingServices.insertBooking(req.app.get('db'), student)
            .then(std => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${std.userid}`))
                    .json(std)
            })
            .catch(next)
    })

module.exports = bookingRouter