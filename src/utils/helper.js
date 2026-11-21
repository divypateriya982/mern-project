import jwt from 'jsonwebtoken';

export const generateToken = ({ payload, expiry }) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
        return token;
    }
    catch (error) {
        console.log(error);
    }
}