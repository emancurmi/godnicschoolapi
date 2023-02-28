const path = require('path')
const express = require('express')
const UserServices = require('./user-services')
const userRouter = express.Router()
const jsonParser = express.json()
const nodemailer = require('nodemailer');
const { restart } = require('nodemon')

userRouter
    .route('/')

    .get((req, res, next) => {
            UserServices.getAllUsers(req.app.get('db'))
                .then(users => {
                    res.json(users)
                })
                .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const user = {
            firstName, lastName, email, password, rolePower, stateId, registrationDate
        } = req.body

        for (const [key, value] of Object.entries(user)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        //add to dababase
        UserServices.insertUser(req.app.get('db'), user)
            .then(usr => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${usr.userid}`))
                    .json(usr)
            })
            .catch(next)
    })

userRouter
    .route('/:userid')

    .all((req, res, next) => {
        UserServices.getUserbyId( req.app.get('db'), req.params.userid )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            Id: res.user.Id,
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            email: res.user.email,
            passcode: res.user.passcode,
            rolePower: res.user.rolePower,
            stateId: res.user.stateId
        })
    })

userRouter
    .route('/:email/:passcode')

    .all((req, res, next) => {
        UserServices.getUserbyId( req.app.get('db'), req.params.email, req.params.passcode )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            Id: res.user.Id,
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            email: res.user.email,
            passcode: res.user.passcode,
            rolePower: res.user.rolePower,
            stateId: res.user.stateId
        })
    })

module.exports = userRouter