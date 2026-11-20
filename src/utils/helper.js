import jwt from 'jsonwebtoken';

export const generateToken = ({ payload, expiry }) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry })
}