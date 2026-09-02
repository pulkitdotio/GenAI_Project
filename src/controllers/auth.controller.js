const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

async function registerUser(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token',token)

    res.status(201).json({ message: 'User registered successfully',
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
     });

    

}


async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token);
    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
}


async function logoutUser(req, res) {
    const token = req.cookies.token;
    if(token){
        await blacklistModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}


async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'User fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}





module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMeController
};

