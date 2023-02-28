const nodemailer = require('nodemailer');

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