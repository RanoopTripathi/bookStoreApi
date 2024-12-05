const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { loginToken } = require('../middleware/check-auth')

const User = require('../models/loginRegistrationModel');
const { isEmailValid } = require('../utility/utilityFunctions');
const env = require('../env');

const loginRegistration = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const emailValid = isEmailValid(email);

        if (emailValid && password) {
            const userExist = await User.findOne({ email: email });
            if (!userExist) {
                const hashPaaword = bcrypt.hashSync(password, 10);
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: email,
                    password: hashPaaword
                })
                const userData = await user.save();
                const data = { email: userData.email, id: userData.id }
                return res.json({
                    status: 200,
                    data: data,
                    message: 'User Register Successfully'
                })
            }
            else {
                const comparePassword = bcrypt.compare(password, userExist.password)
                if (comparePassword) {
                    const token = loginToken(userExist)
                    console.log(token)
                    const userDetails = { email: userExist.email, id: userExist._id }
                    return res.json({
                        status: 200,
                        data: userDetails,
                        token: token
                    })
                }
                else {
                    return res.status(404).json({
                        message: 'Incorrect Password'
                    })
                }
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

const updateUserProfile = async (req, res, next) => {
    try {
        const { name, phone } = req.body
        await User.updateOne({ email: req.user.email }, { $set: { name: name, phone: phone } });
        const returnUserDetails = await User.findOne({ email: req.user.email });
        const data = { email: returnUserDetails.email, name: returnUserDetails.name, phone: returnUserDetails.phone }
        return res.status(200).json({
            data: data,
            message: 'User Profile Updated Successfully'
        })

    }
    catch (error) {
        return res.json({
            status: error.status,
            message: error.message
        })
    }
}

module.exports = { loginRegistration, updateUserProfile }