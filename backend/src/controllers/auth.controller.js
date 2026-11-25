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
            message: 'Sign Up successfully',
            user: {
                firstName,
                lastName,
                username,
                email
            }
        })

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const signin = async (req, res) => {
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

        res.status(200).json({
            message: "Sign In successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const signout = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            message: 'Sign Out successfully'
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}