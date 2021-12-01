const express = require('express');
const router = express.Router();
const {loginUser ,registerUser,login , register , logout , userForgotPass ,forgotPass , userResetPass , resetPass} = require('../controllers/userAuth')
const validateuser = require('../middleware/validateuser')
const validateLogin = require('../middleware/validatelogin')
const sendmail = require('../middleware/sendmail')
const auth = require('../middleware/authenticate')



router.get('/login',loginUser)
router.get('/register',registerUser)
router.get('/forgot-password',userForgotPass)
router.get('/reset-password/:id/:token',userResetPass)


router.post('/logout',logout)
router.post('/forgot-password',forgotPass,sendmail)
router.post('/login',validateLogin,login)
router.post('/register',validateuser,register)
router.post('/reset-password',resetPass)








module.exports = router