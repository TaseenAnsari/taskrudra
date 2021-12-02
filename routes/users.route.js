const express = require('express');
const router = express.Router();
const {getUser, deleteUser , updateUser , update} = require('../controllers/users')
const auth = require('../middleware/authenticate')





router.get('/',auth,getUser) //fetch all user data
router.get('/api/:username',auth,getUser) //fetch all user data

router.get('/api/updateuser/:id',auth,updateUser) //provide update form

router.post('/api/updateuser/:id',auth,update) // update user

router.post('/api/deleteuser/:id',auth,deleteUser) // delete user








module.exports = router