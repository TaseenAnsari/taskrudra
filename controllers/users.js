const { REFUSED } = require('dns');
const { User } = require('../models/users.model')
const {encryption , validatePassword ,genrateToken} = require('../auth/auth')


module.exports.getUsers = async (req, res, next) => {
    try {
        const result = await User.find(req.query);

        res.send(await genrateToken({username:"taseenansari"}))
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.createUsers = async (req, res, next) => {
    try {
        const Users = new User(req.body)
        res.send(await Users.save())
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.updateUsers = async (req, res, next) => {
    try {

    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.deleteUsers = async (req, res, next) => {
    try {

    }
    catch (err) {
        res.status(400).send(err.message);
    }
}