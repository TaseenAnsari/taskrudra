const express = require('express');
const app = express();
const users = require('./routes/users.route')
const userAuth = require('./routes/userAuth.route');
var path = require('path');
var cookieParser = require('cookie-parser');
const ejs = require('ejs')
require('./models/connection.db')();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', users);
app.use('/', userAuth)


function sendmail() {
    
    
}


app.listen(5500, () => console.log("connect to port 5500"))