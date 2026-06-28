const express = require('express');
const { register, login, logout, getMe } = require('../controllers/auth.controller');

const { authUser } = require('../middlewares/auth.middleware')

const asyncErrorHandler = require("../utils/asyncError")

const router = express.Router();

/**
 * @route POST /api/auth/register
 * 
 * @description Register a new user
 * @access Public
 */



router.post('/register', asyncErrorHandler(register))
router.post('/login', asyncErrorHandler(login))
router.post('/logout', asyncErrorHandler(logout))

router.get('/get-me', authUser, asyncErrorHandler(getMe))





module.exports = router;