const express = require('express');
const router = express.Router();
const {index, deleteuser , updateuser , update} = require('../controllers/users')
const validateuser = require('../middleware/validateuser')
const auth = require('../middleware/authenticate')




router.get('/',auth,index)

router.get('/updateuser/:id',auth,updateuser)

router.post('/deleteuser/:id',auth,deleteuser)


router.post('/updateuser/:id',auth,update)






module.exports = router