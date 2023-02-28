
const fetch = require('cross-fetch')
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path')

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
  fs.writeFileSync('./src/pdf/2021-2022/'+operator+'/'+schoolCode+'/'+studentFirstName+'_'+studentLastName+'_'+studentIdCard+'.pdf', await pdfDoc.save());
}