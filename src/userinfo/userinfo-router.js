const express = require('express')
const UserinfoServices = require('./userinfo-services')
const userinfoRouter = express.Router()

userinfoRouter
    .route('/')

    .get((req, res, next) => {
        return res.status(404).json({
            error: { message: `Not allowed to perform this action` }
        })
    })

    

userinfoRouter
    .route('/:userId')

    .all((req, res, next) => {
        UserinfoServices.getUserinfobyId( req.app.get('db'), req.params.userId )
            .then(userinfo => {
                if (!userinfo) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.json(userinfo)
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json({
            Id: res.userinfo.Id,
            userId: res.userinfo.userId,
            houseName: res.userinfo.houseName,
            houseNumber: res.userinfo.houseNumber,
            streetAddress: res.userinfo.streetAddress,
            zipCode: res.userinfo.zipCode, 
            region: res.userinfo.region, 
            telNo: res.userinfo.telNo,
            mobileNo: res.userinfo.mobileNo,
            companyName: res.userinfo.companyName
        })
    })

    .delete((req, res, next) => {
        
    })

module.exports = userinfoRouter