const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snagwani@argusoft.com',
        pass: 'Argusoftnag@361'
    }
});

// const mail = "sanjusha.nagwani50@gmail.com"

let mailDetails = {
    from: 'snagwani@argusoft.com',
    to: mail,
    subject: 'Test mail',
    text: 'Node.js testing mail for Argus Delivery'
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});
