
const nodemailer = require('nodemailer');
const config = require('config')



module.exports = async (req, res, next) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'taseenansari1@gmail.com',
                pass: config.get('credential')
            }
        });

        const mailOptions = {
            from: 'taseenansari1@gmail.com',
            to: req.body.email,
            subject: 'Password Reset Link',
            text: `password Reset link->>>${req.body.link}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send("something went wrong")
            } else {
                console.log('Email sent: ' + info.response);
                res.send("<h2>Email has been sent</h2><br><strong>check your mail Box or Spam</strong>")
            }
        });
    }
    catch (err) {
        res.send("Something Went Wrong!")
    }
}
