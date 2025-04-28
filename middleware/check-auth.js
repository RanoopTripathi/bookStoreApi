var jwt = require('jsonwebtoken');
const env = require('../env')


const loginToken = (userExist) => {
    return jwt.sign({
        email: userExist.email,
        id: userExist._id
    }, env.JWTKEY, { expiresIn: '1h' })
}

const checkAuth = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token,env.JWTKEY);
        req.user = decoded; 
        next();
    }
    catch(error){
        res.status(401).json({
            message:'Auth Failed'
        })
    }
}

module.exports = { loginToken,checkAuth }