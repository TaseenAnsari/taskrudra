# User Authentication With Forget Password

> This project is based on REST api <br />
> Which allow us to do CRUD operation on user database <br />
> we also provide authentication and forget password functionality <br />
> Forget password always genrate unique link and send it to the user email <br />
> Link is valid for 10 minutes only and also used once <br />
> Login session is expired in 10 minutes. <br />
### Steps to deploy the application on server

> set env variable ,host,credential(sendgrid apikey),mydb(mongodb connection),secrate(jwtSectratekey),port(additional) <br />
> $npm i <br />
> $node server.js

### Check Project 
 https://user-authentication-rudra.herokuapp.com/