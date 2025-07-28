const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ msg: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();



        res.status(201).json({ msg: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) return res.status(400).json({ msg: 'Invalid email' });

        console.log('Email:', email);
        console.log('Found user:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    }
    catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
}

    }
;

module.exports = { register, login };
