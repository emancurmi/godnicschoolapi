const path = require('path')
const express = require('express')
const BookingServices = require('./booking-services')
const bookingRouter = express.Router()
const jsonParser = express.json()
const nodemailer = require('nodemailer');

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
            studentEmail, parentIdCard, parentFullName, parentMobile, parentEmail,
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
        //add to dababase
        BookingServices.insertBooking(req.app.get('db'), student)
            .then(std => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${std.userid}`))
                    .json(std)
            })
            .catch(next)
        
        //create Email
        var name = student.studentFirstName;
        var email = student.parentEmail;

        var emailMessage = `Hi ${name},\n\nThank you for registering with Godnic Garage.\n
        \nYour Data has been logged and we have attached the documents containing information how your data will be processed by our Operators according to the Minsitry for Education and Sports (MEDS).\n
        \nIf you require any more information please do not hesitate to contact us on GodnicGarage@gmail.com or by phone +35699228776.\n 
        \nBest Regards
        \nGodnic Garage\n`;

        console.log(email);
        console.log(emailMessage);

        //send Email
        var transporter = nodemailer.createTransport({
            sendmail: true,
            host: "smtp-mail.outlook.com", 
            secureConnection: false,
            port: 587,
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'godnicgarage@outlook.com',
                pass: 'GodnicBorg1982'
            }
        });

        var emailOptions = {
            from: 'Godnic Garage',
            to: email,
            subject: 'School Transport Agreement',
            text: emailMessage
        };

        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.log(error);
                //res.redirect('/contact_send');
            } else {
                console.log('Message Sent: ' + info.response);
                console.log('Email Message: ' + emailMessage);
                //res.redirect('/contact_error');
            }
        });
    })

module.exports = bookingRouter