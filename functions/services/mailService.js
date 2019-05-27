
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


function sendMail(data){
    var message = Buffer.from(data, 'base64').toString();
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
        from : 'PJI POC',
        to : JSON.parse(message).responseObject.store.email,
        bcc : 'a123geni@gmail.com',
        subject : `New Store \"${message.name}\" created!!!`,
        text: message
    }
    var mailInfo =  transporter.sendMail(mailOptions);
    console.log('Message sent : %s',mailInfo.messageId);  
}

module.exports = {
    sendMail
}