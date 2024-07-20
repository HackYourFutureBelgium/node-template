import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';

const userControllers = {
    register: async (req, res) => {
        const { email, password } = req.body;

        // Validate email and password
        if (!validateEmail(email)) {
            return res.status(400).send('Invalid email format');
        }
        if (!validatePassword(password)) {
            return res.status(400).send('Password does not meet complexity requirements');
        }

        // Check if the user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the user to the database
        await query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).send('User registered successfully');
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        
        
        // Validate email and password
        if (!validateEmail(email)) {
            return res.status(400).send('Invalid email or password');
        }

               
        // Check if the user exists
        const users = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        
        const user = users[0];

        // Check if the password matches
        const passwordMatches = await matchPasswords(password, user.password);
        if (!passwordMatches) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate a token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.send('Logged in successfully');
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.send('Logged out successfully');
    }
};

export default userControllers;
