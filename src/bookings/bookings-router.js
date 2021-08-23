const path = require('path')
const express = require('express')
const bookingsRouter = express.Router()
const BookingsServices = require('./bookings-services')
const jsonParser = express.json()
const fetch = require('cross-fetch')
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

bookingsRouter
    .route('/:bookingid')
    .all((req, res, next) => {
        BookingsServices.getBookingsById(
        req.app.get('db'),
        req.params.bookingid
    )
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    error: { message: `booking doesn't exist` }
                })
            }
            res.booking = booking 
            next() 
        })
        .catch(next)
})

.get((req, res, next) => {
    res.json({
        schoolCode: res.booking.schoolCode,
        schoolLevelCode: res.booking.schoolLevelCode,
        studentRegionName: res.booking.studentRegionName,

        studentIdCard: res.booking.studentIdCard,
        studentFirstName: res.booking.studentFirstName,
        studentLastName: res.booking.studentLastName,
        studentEmail: res.booking.studentEmail,
        
        parentIdCard: res.booking.parentIdCard,
        parentFullName: res.booking.parentFullName,
        parentEmail: res.booking.parentEmail,
        parentMobile: res.booking.parentMobile,
        
        houseName: res.booking.houseName,
        houseNumber: res.booking.houseNumber,
        streetAddress: res.booking.streetAddress,
        zipCode: res.booking.zipCode,
        regionName: res.booking.regionName,

        notes: res.booking.notes,
        consent: res.booking.consent,

        scheduleType: res.booking.scheduleType,
        scheduleActiveDays: res.booking.scheduleActiveDays,
        scheduleValidFrom: res.booking.scheduleValidFrom,
        scheduleValidTo: res.booking.scheduleValidTo,

        scheduleRoutePlannedName: res.booking.scheduleRoutePlannedName,
        scheduleStudentAddress: res.booking.schdeuleStudentAddress,

        registrationDate: res.booking.registrationDate
    })

    run(res.booking.parentFullName, res.booking.parentIdCard, res.booking.studentFirstName, res.booking.studentLastName, res.booking.studentIdCard, res.booking.registrationDate, res.booking.schoolCode, res.booking.scheduleRoutePlannedName).catch(err => console.log(err));
})



async function run(parentFullName, parentIdCard, studentFirstName, studentLastName, studentIdCard, registrationDate, schoolCode, scheduleRoutePlannedName) {
    let url = ""
    let operator = ""

    if(scheduleRoutePlannedName.includes("GODNIC")){
        console.log("url updated Godnic")
        operator = "Godnic Garage"
        url = 'https://godnicgarage.com/wp-content/uploads/2021/08/FORM_B_Godnic_Garage.pdf'
    }
    else if(scheduleRoutePlannedName.includes("PB")){
        console.log("url updated PB")
        operator = "Paul Borg"
        url = 'https://godnicgarage.com/wp-content/uploads/2021/08/FORM_B_Paul_Borg.pdf'
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

    //Signature
    firstPage.drawText(parentFullName + " " + parentIdCard, {
        x: 290,
        y: 580,//278
        size: 15,
        //font: helveticaFont,
        //color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })

    //Parents Name
    firstPage.drawText(parentFullName, {
      x: 290,
      y: 545,//278
      size: 15,
      //font: helveticaFont,
      //color: rgb(0.95, 0.1, 0.1),
      //rotate: degrees(-45),
    })

    //Parents ID
    firstPage.drawText(parentIdCard, {
        x: 290,
        y: 507,
        size: 15,
        //font: helveticaFont,
        //color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })

      //Students Name
      firstPage.drawText(studentFirstName + " " + studentLastName, {
        x: 290,
        y: 472,
        size: 15,
        //font: helveticaFont,
        //color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })

      //Students ID
      firstPage.drawText(studentIdCard, {
        x: 290,
        y: 435,
        size: 15,
        //font: helveticaFont,
        //color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })

      //Registration Date
      firstPage.drawText(registrationDate + "-2021", {
        x: 290,
        y: 397,
        size: 15,
        //font: helveticaFont,
        //color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })


  // Write the PDF to a file
  fs.writeFileSync('./src/pdf/2021-2022/'+operator+'/'+schoolCode+'/'+studentFirstName+'_'+studentLastName+'_'+studentIdCard+'.pdf', await pdfDoc.save());
}


module.exports = bookingsRouter