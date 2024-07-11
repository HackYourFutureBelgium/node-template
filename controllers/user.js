import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';

const userControllers = {
    register: async (req, res) => {
        const { email, password, confirmPassword } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Password does not meet complexity requirements' });
        }

        if (!matchPasswords(password, confirmPassword)) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const hashedPassword = await hashPassword(password);

        try {
            const results = await query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
            res.status(201).json({ message: 'User registered', userId: results.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const results = await query('SELECT * FROM users WHERE email = ?', [email]);
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.cookie('token', token, { httpOnly: true });
            res.json({ message: 'Logged in successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    },
};

export default userControllers;
