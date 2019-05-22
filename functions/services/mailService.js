
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


function sendMail(message){
    console.log(message)
    console.log('****************')
    dotenv.config();
    var transporter = nodemailer.createTransport(
        {
            host : 'smtp.gmail.com',
            port : 587,
            secure: false,
            auth : {user : process.env.email_ENV, pass : process.env.pass_ENV}
            // Type of Encrypted Connection: TLS
        }
    );
    var mailOptions = 
    {
        from : 'PJI POC<portal.nexgeniots@gmail.com>',
        to : 'a123geni@gmail.com',
        // cc : mailparams.cc,
        // bcc : mailparams.bcc,
        subject : "New Store is created!!!",
        text: JSON.stringify(message)
    }

    var mailInfo =  transporter.sendMail(mailOptions);
    console.log('Message sent : %s',mailInfo.messageId);  
}

module.exports = {
    sendMail
}