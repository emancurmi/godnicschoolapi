const path = require('path')
const express = require('express')
const TripDriverServices = require('./trip-driver-services')

const tripDriverRouter = express.Router()
const jsonParser = express.json()

tripDriverRouter
    .route('/')

    .get((req, res, next) => {
        return res.status(404).json({
            error: { message: `Not allowed to perform this action` }
        })
    })

    .post(jsonParser, (req, res, next) => {

    })
    
tripDriverRouter // driver id
    .route('/:routeDriverId')

    .all((req, res, next) => {
        TripDriverServices.getTripbyDriver( req.app.get('db'), req.params.routeDriverId )
            .then(trip => {
                if (!trip) {
                    return res.status(404).json({
                        error: { message: `Driver has no trips` }
                    })
                }
                res.json(trip)
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
            routeNotes: res.trip.routeNotes
        })
    })

    .delete((req, res, next) => {
        
    })

    .patch(jsonParser, (req, res, next) => {
       
    })

module.exports = tripDriverRouter