import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import connection from '../config/db.js';


const userControllers = {
    register: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Invalid password format' });
        }

        if (!matchPasswords(password, confirmPassword)) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = hashPassword(password);

        try {
            await connection.query(
                'INSERT INTO users2 (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [rows] = await connection.query(
                'SELECT * FROM users2 WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = rows[0];
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, process.env.TOKEN_ACCESS_SECRET, {
                expiresIn: '1h',
            });

            res.cookie('token', token, { httpOnly: true }).status(200).json({
                message: 'Login successful',
                user: { id: user.id, name: user.name, email: user.email },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token').status(200).json({ message: 'Logout successful' });
    },
};

export default userControllers;
