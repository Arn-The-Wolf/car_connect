import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId, res) => {
    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
    try {
        const payload = { id: userId }
        const token = jwt.sign(payload, secret, { expiresIn: '15d' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 24 * 60 * 60 * 1000
        })
    } catch (error) {
        throw new Error(error)
    }
}