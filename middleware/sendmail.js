
// const nodemailer = require('nodemailer');
const config = require('config')



// module.exports = async (req, res, next) => {
//     try {

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'userauthinfo@gmail.com',
//                 pass: config.get('credential')
//             }
//         });

//         const mailOptions = {
//             from: 'taseenansari1@gmail.com',
//             to: req.body.email,
//             subject: 'Password Reset Link',
//             text: `password Reset link->>>${req.body.link}`
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 res.send("something went wrong")
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 res.send("<h2>Email has been sent</h2><br><strong>check your mail Box or Spam</strong>")
//             }
//         });
//     }
//     catch (err) {
//         res.send("Something Went Wrong!")
//     }
// }
const sgMail = require('@sendgrid/mail')

module.exports = async (req, res, next) => {
    try {
        sgMail.setApiKey(config.get('credential'))

        const msg = {
            to: req.body.email, // Change to your recipient
            from: 'taseen@rudrainnovative.in', // Change to your verified sender
            subject: 'Password Reset Link',
            text: `password Reset link->>>${req.body.link}`,
            html: `<strong>Password reset link is here</strong><a href="${req.body.link}">click me</a>`,
        }

        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                res.send("<h2>Email has been sent</h2><br><strong>check your mail Box or Spam</strong>")
            })
            .catch((error) => {
                res.send("Something went wrong")
            })

    }
    catch (err) {
        res.send("Something went wrong")
    }
}
