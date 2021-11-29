const express = require('express');
const router = express.Router();
const {getUsers , createUsers , deleteUsers , updateUsers} = require('../controllers/users')
const validateuser = require('../middleware/validateuser')

router.get('/',getUsers)

router.post('/',validateuser,createUsers)

router.put('/',updateUsers)

router.delete('/',deleteUsers)





module.exports = router