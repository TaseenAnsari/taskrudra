const ejs = require('ejs')
const path = require('path');
const config = require('config')
const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./routes/users.route')
const userAuth = require('./routes/userAuth.route');

//Database Connection
require('./models/connection.db')(); 

//constants
const app = express();
const port = config.get('port') || 5500


//middleware settings
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', users);
app.use('/', userAuth)



//start server
module.exports = app.listen(port, () => console.log("connect to port",port))