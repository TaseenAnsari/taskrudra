const express = require('express');
const router = express.Router();
const {loginUser ,registerUser,login , logout , userForgotPass ,forgotPass , userResetPass  , getUser ,updateUser} = require('../controllers/userAuth')
const validateLogin = require('../middleware/validatelogin')
const sendmail = require('../middleware/sendmail')
const validatereset = require('../middleware/validatereset');
const auth = require('../middleware/authenticate')


router.get('/',auth,getUser) //home page
router.get('/updateuser/:id',auth,updateUser) //provide update form
router.get('/login',loginUser) //provide login form
router.get('/register',registerUser) //provide register form
router.get('/forgot-password',userForgotPass) // provide forgot password form
router.get('/reset-password/:id/:token',userResetPass) //provide reset password form



router.post('/logout',logout)
router.post('/forgot-password',forgotPass,sendmail)
router.post('/login',validateLogin,login)








module.exports = router