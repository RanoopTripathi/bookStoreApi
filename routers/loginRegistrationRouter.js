const express = require('express');
const router = express.Router();

const {checkAuth} = require('../middleware/check-auth')
const {loginRegistration,updateUserProfile} = require('../controllers/loginRegistrationController');

router.post('/',loginRegistration)
router.put('/updateprofile',checkAuth,updateUserProfile)


module.exports = router;