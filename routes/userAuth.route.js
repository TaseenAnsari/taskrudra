const express = require('express');
const router = express.Router();
const {loginUser ,registerUser,login , logout , userForgotPass ,forgotPass , userResetPass  , index ,updateUser} = require('../controllers/userAuth')
const validateLogin = require('../middleware/validatelogin')
const sendmail = require('../middleware/sendmail')
const auth = require('../middleware/authenticate')


router.get('/',auth,index) //home page
router.get('/updateuser/:id',auth,updateUser) //provide update form
router.get('/login',loginUser) //provide login form
router.get('/register',registerUser) //provide register form
router.get('/forgot-password',userForgotPass) // provide forgot password form
router.get('/reset-password/:id/:token',userResetPass) //provide reset password form



router.post('/logout',logout) //un-authorized from all api functionality 
router.post('/forgot-password',forgotPass,sendmail) //send unique password url link to user mail
router.post('/login',validateLogin,login) //authorized from all api functionality 








module.exports = router