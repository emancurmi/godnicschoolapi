const path = require('path')
const express = require('express')
const TripOperatorServices = require('./trip-operator-services')

const tripOperatorRouter = express.Router()
const jsonParser = express.json()


tripOperatorRouter
    .route('/')

    .get((req, res, next) => {
        return res.status(404).json({
            error: { message: `Not allowed to perform this action` }
        })
    })

    .post(jsonParser, (req, res, next) => {

    })

tripOperatorRouter // operator id
    .route('/:operatorid')

    .all((req, res, next) => {
        TripOperatorServices.getTripbyOperator( req.app.get('db'), req.params.operatorid )
            .then(trip => {
                if (!trip) {
                    return res.status(404).json({
                        error: { message: `Operator has no trips` }
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

module.exports = tripOperatorRouter