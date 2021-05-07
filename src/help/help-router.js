const path = require('path')
const express = require('express')
const HelpService = require('./help-services')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {
        res.send('<h1>API Routes</h1></br>' +

            '<h2>Example Api</h2>' +
            '<p>' +
            '/api/example</br> ' +
            '/api/example/exampleid </br>' +
            '</p>' +

            '<p>this is a dev test </p>'

        );
    })

module.exports = helpRouter