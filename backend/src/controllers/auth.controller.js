const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Blacklist = require('../models/blacklist.model')

/**
 * 
 * @route POST /api/auth/register
 * 
 * @description Register a new user
 * @access Public
 */

async function register(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    };

    const hash = await bcrypt.hash(password, 10);


    try {

        const newUser = new User({ username, email, password: hash });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.jwt_secret,
            { expiresIn: '1d' }
        )



        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

/**
 * 
 * @name in
 * @description Login a user
 * @Access Public
 */

async function login(req, res) {
const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.jwt_secret,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function logout(req, res) {
    const token = req.cookies.token

    if (token) {
        await Blacklist.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}


async function getMe(req, res) {

    const user = await User.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = { register, login, logout, getMe };