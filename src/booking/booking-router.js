const path = require('path')
const express = require('express')
const BookingServices = require('./booking-services')
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
            step, schoolCode, schoolLevelCode, studentRegionName,
            studentIdCard, studentFirstName, studentLastName,
            studentEmail, parentIdCard, parentFullName, parentMobile,
            houseName, houseNumber, streetAddress, zipCode,
            notes, consent, scheduleType, scheduleValidFrom,
            scheduleValidTo, scheduleActiveDays, scheduleRoutePlannedName, 
            scheduleStudentAddress, regionName, registrationDate
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