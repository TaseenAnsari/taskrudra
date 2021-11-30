const mailgun = require("mailgun-js");




module.exports = async (req, res, next) => {
    try {
        const DOMAIN = 'sandbox80e0ba8ffe584272b04d4e4b7f3f8150.mailgun.org';
        const mg = mailgun({ apiKey: "92f080e3d33c041cec41e04b99580163-7b8c9ba8-fd4400d0", domain: DOMAIN });
        const data = {
            from: 'taseenansari@gmail.com',
            to: req.body.email,
            subject: 'Hello',
            text: `To reset Password clicl on this link ${req.body.link}`
        };
        mg.messages().send(data, function (error, body) {
            res.send("reset link has been sent to your email")
        });
    }
    catch (err) {
        res.render('login', { user: '', message: "Invalid ID" })
    }
}
