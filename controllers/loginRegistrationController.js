const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('../models/loginRegistrationModel')
const { isEmailValid } = require('../utility/utilityFunctions')
const loginRegistration = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email: email });

        const emailValid = isEmailValid(email);
        if (emailValid && password) {
            if (!userExist) {
                const hashPaaword = bcrypt.hashSync(password, 10);
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: email,
                    password: hashPaaword
                })
                const userData = await user.save();
                return res.json({
                    status: 200,
                    data: userData
                })
            }
            else {
                return res.json({
                    status: 409,
                    message: 'User Already Exist'
                })
            }
        }
        else {
            return res.json({
                status: 409,
                message: 'Email is not valid'
            })
        }
    }
    catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

module.exports = { loginRegistration }