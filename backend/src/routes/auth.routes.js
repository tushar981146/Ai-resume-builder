const express = require('express');
const { register, login, logout, getMe } = require('../controllers/auth.controller');

const { authUser } = require('../middlewares/auth.middleware')

const router = express.Router();

/**
 * @route POST /api/auth/register
 * 
 * @description Register a new user
 * @access Public
 */



router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/get-me', authUser, getMe)





module.exports = router;