const express = require('express');
const router = express.Router();

const {loginRegistration} = require('../controllers/loginRegistrationController');

router.post('/',loginRegistration)


module.exports = router;