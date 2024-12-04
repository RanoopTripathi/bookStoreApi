const bcrypt = require('bcrypt');

const loginAndRegistration = (req,res,next)=>{
    try{

    }
    catch(error){
        res.status(error.status).json({
            message:error.message
        })
    }
}

module.exports = {loginAndRegistration}