const express = require('express');
const router = express.Router();
const {deleteUser , update, getUsers, resetPass ,register} = require('../controllers/users')
const auth2 = require('../middleware/authenticateApi')
const validateuser = require('../middleware/validateuser')
const validatereset = require('../middleware/validatereset');




//API

router.get('/api/users',auth2,getUsers) //fetch all user data

router.post('/api/users',validateuser,register) //create user

router.put('/api/users/:id',auth2,update) // update user

router.patch('/api/users/',validatereset,resetPass) // change password

router.delete('/api/users/:id',auth2,deleteUser) // delete user








module.exports = router