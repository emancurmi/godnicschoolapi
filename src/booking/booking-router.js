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
        
        //Create pdfs
        async function run(parentFullName, parentIdCard, studentFirstName, studentLastName, studentIdCard, registrationDate, schoolCode, scheduleRoutePlannedName) {
            let url = "";
            let operator = "";
            let driver = "";
            let ydriver = "";
            let ysigniture = "";
            let yparentsname = "";
            let yparentsid = "";
            let ystudentname = "";
            let ystudentsid = "";
            let yregistrationdate = "";
        
            if(scheduleRoutePlannedName.includes("GODNIC")){
                console.log("url updated Godnic")
                operator = "Godnic Garage"
                driver = "Godfrey Borg"
                url = 'https://godnicgarage.com/wp-content/uploads/2021/08/FORM_B_Godnic_Garage.pdf'
                ydriver = 590;
                ysigniture = 520; //-60
                yparentsname = 490;
                yparentsid = 455;
                ystudentname = 420;
                ystudentsid = 380;
                yregistrationdate = 345;
            }
            else if(scheduleRoutePlannedName.includes("PB")){
                console.log("url updated PB")
                operator = "Paul Borg"
                driver = "Paul Borg"
                url = 'https://godnicgarage.com/wp-content/uploads/2021/08/FORM_B_Paul_Borg.pdf'
                ydriver = 670;
                ysigniture = 580;
                yparentsname = 545;
                yparentsid = 507;
                ystudentname = 472;
                ystudentsid = 435;
                yregistrationdate = 397;
            }
            else 
            {
            }
            console.log(url);
            let existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
          
            let pdfDoc = await PDFDocument.load(existingPdfBytes)
            //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
          
            let pages = pdfDoc.getPages()
            let firstPage = pages[2]//3rd page
        
            //Driver
            firstPage.drawText(driver, {
                x: 420,
                y: ydriver,//278
                size: 10,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
            //Signature
            firstPage.drawText(parentFullName + " " + parentIdCard, {
                x: 290,
                y: ysigniture,//278
                size: 15,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
            //Parents Name
            firstPage.drawText(parentFullName, {
              x: 290,
              y: yparentsname,//278
              size: 15,
              //font: helveticaFont,
              //color: rgb(0.95, 0.1, 0.1),
              //rotate: degrees(-45),
            })
        
            //Parents ID
            firstPage.drawText(parentIdCard, {
                x: 290,
                y: yparentsid,
                size: 15,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
              //Students Name
              firstPage.drawText(studentFirstName + " " + studentLastName, {
                x: 290,
                y: ystudentname,
                size: 15,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
              //Students ID
              firstPage.drawText(studentIdCard, {
                x: 290,
                y: ystudentsid,
                size: 15,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
              //Registration Date
              firstPage.drawText(registrationDate + "-2021", {
                x: 290,
                y: yregistrationdate,
                size: 15,
                //font: helveticaFont,
                //color: rgb(0.95, 0.1, 0.1),
                //rotate: degrees(-45),
              })
        
        
          // Write the PDF to a file
          fs.writeFileSync('./src/pdf/2022-2023/'+operator+'/'+schoolCode+'/'+studentFirstName+'_'+studentLastName+'_'+studentIdCard+'.pdf', await pdfDoc.save());
        }

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