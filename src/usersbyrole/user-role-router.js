const path = require('path')
const express = require('express')
const UserRoleServices = require('./user-role-services')
const userRoleRouter = express.Router()
const jsonParser = express.json()
const nodemailer = require('nodemailer');
const { restart } = require('nodemon')

userRoleRouter
    .route('/')

    .get((req, res, next) => {
        return res.status(404).json({
            error: { message: `Not Allowed to load all roles information` }
        })
    })

    .post(jsonParser, (req, res, next) => {

    })

userRoleRouter
    .route('/:rolePower')

    .all((req, res, next) => {
        UserRoleServices.getUserbyRolePower( req.app.get('db'), req.params.rolePower )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `Role has no users yet` }
                    })
                }
                res.json(user)
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

    .delete((req, res, next) => {
        
    })

    .patch(jsonParser, (req, res, next) => {
        
    })

module.exports = userRoleRouter