import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/helper.js';

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({
                message: 'Send all details'
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken({
            payload: {
                userId: user._id
            },
            expiry: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: 'strict', // it should be null when node environment will be production
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                firstName,
                lastName,
                username,
                email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Enter all details'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: 'User does not exist'
            });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({
                message: 'Incorrect password'
            });
        }

        const token = generateToken({
            payload: {
                userId: user._id
            },
            expiry: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}