const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerAuth);

router.post('/login', authController.loginAuth);

module.exports = router;
