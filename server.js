const express = require('express');
const app = express();
const users = require('./routes/users.route')
require('./models/connection.db')();


app.use(express.json());
app.use('/api/users',users);




app.listen(5500,()=>console.log("connect to port 5500"))