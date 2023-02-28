const path = require('path')
const express = require('express')
const bookingServices = require('./booking-services')
const { restart } = require('nodemon')
const bookingRouter = express.Router()
const jsonParser = express.json()


bookingRouter
    .route('/')

    .get((req, res, next) => {
            bookingServices.getAllBookings(req.app.get('db'))
                .then(students => {
                    res.json(students)
                })
                .catch(next)
    })

    .post(jsonParser, (req, res, next) => {

    })
    
bookingRouter
    .route('/:bookingId')

    .all((req, res, next) => {
        bookingServices.getBookingById(req.app.get('db'), req.params.bookingId)
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    error: { message: `booking doesn't exist` }
                })
            }
            res.booking = booking 
            next()
        })
        .catch(next)
    })
    
    .get((req, res, next) => {
        res.json({
            bookingId: res.booking.bookingId,
            userId: res.booking.userId,
            schoolId: res.booking.schoolId,
            schoolLevelId: res.booking.schoolLevelId,
            scheduleType: res.booking.scheduleType,
            scheduleActiveDays: res.booking.scheduleActiveDays,
            scheduleStartDate: res.booking.scheduleStartDate,
            scheduleEndDate: res.booking.scheduleEndDate,
            note: res.booking.note,
            timestamp: res.booking.timestamp
        })
    })

    .delete((req, res, next) => {
        
    })

    .patch(jsonParser, (req, res, next) => {
        
    })

module.exports = bookingRouter