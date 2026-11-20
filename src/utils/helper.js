import jwt from 'jsonwebtoken';

export const generateToken = ({ payload, expiry }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
    return token;
}