const path = require('path')
const express = require('express')
const TripServices = require('./trip-services')

const tripRouter = express.Router()
const jsonParser = express.json()

tripRouter
    .route('/')

    .get((req, res, next) => {
        TripServices.getAllTrips(req.app.get('db'))
        .then(trips => {
            res.json(trips)
        })
        .catch(next)
    })

    .post(jsonParser, (req, res, next) => {

    })

tripRouter //trip id
    .route('/:routeId')

    .all((req, res, next) => {
        TripServices.getTripbyId( req.app.get('db'), req.params.routeId )
        .then(trip => {
            if (!trip) {
                return res.status(404).json({
                    error: { message: `Trip doesn't exist` }
                })
            }
            res.trip = trip
            next()
        })
        .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            routeId: res.trip.routeId,
            routeName: res.trip.routeName,
            routeOperatorId: res.trip.routeOperatorId,
            routeDriverId: res.trip.routeDriverId,
            regNo: res.trip.regNo,
            routeActive: res.trip.routeActive.data,
            routeNotes: res.trip.routeNotes
        })
    })

    .delete((req, res, next) => {
        
    })

    .patch(jsonParser, (req, res, next) => {
       
    })

module.exports = tripRouter