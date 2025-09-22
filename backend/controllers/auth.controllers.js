import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/cookie.utils.js'
import { sendMail } from '../config/email.js'

export const register = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(403).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });
        await user.save()
        generateTokenAndSetCookie(user._id, res)
        res.status(201).json({ message: 'Registration successful', user: { id: user._id, fullname: user.fullname, email: user.email, role: user.role } })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
        user.otpCode = otp
        user.otpExpiresAt = expiresAt
        await user.save()

        try {
            await sendMail({
                to: user.email,
                subject: 'Your CarHubConnect OTP',
                html: `<p>Use this OTP to complete your login:</p><h2>${otp}</h2><p>This code expires in 5 minutes.</p>`
            })
        } catch (emailError) {
            console.log('Email sending failed:', emailError.message)
            return res.status(500).json({ message: 'Internal server error' })
        }

        res.status(200).json({ message: 'OTP sent to email', success : true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' })
    res.json({ message: 'Logged out' })
}

export const me = async (req, res) => {
    const user = req.user
    res.status(200).json({ success : true, user : user })
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (!user.otpCode || !user.otpExpiresAt) return res.status(400).json({ message: 'No OTP requested' })
        const notExpired = user.otpExpiresAt.getTime() > Date.now()
        const match = user.otpCode === String(otp)
        if (!notExpired || !match) return res.status(400).json({ message: 'Invalid or expired OTP' })

        user.otpCode = undefined
        user.otpExpiresAt = undefined
        await user.save()

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({ message: 'Login successful', success : true })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}