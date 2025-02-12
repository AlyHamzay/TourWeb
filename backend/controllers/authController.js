
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//Register


// Register
export const register = async (req, res) => {
    try {
        // Hashing the password
        const salt = await bcrypt.genSalt(10); // Add "await" here
        const hash = await bcrypt.hash(req.body.password, salt); // Add "await" here

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash, // Store the hashed password
            photo: req.body.photo,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'Successfully created' });
    } catch (e) {
        console.error('Error during registration:', e.message);
        res.status(500).json({ success: false, message: 'Failed to create user', error: e.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log('Login request received:', req.body);

        // Get email and password from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        console.log('User found in database:', user);

        // If user doesn't exist
        if (!user) {
            console.log('User not found!');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the password is correct
        const checkCorrectPassword = await bcrypt.compare(password, user.password);
        console.log('Password check result:', checkCorrectPassword);

        // If password is incorrect
        if (!checkCorrectPassword) {
            console.log('Password is incorrect!');
            return res.status(401).json({ success: false, message: 'Password is incorrect' });
        }

        // Extract sensitive fields
        const { password: userPassword, role, ...rest } = user._doc;

        // Create JWT token
        
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15h" }
        );

        // Set token in cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 15 * 60 * 60 * 1000, // Set cookie expiration time (15 hours)
        }).status(200).json({ token, data: { ...rest }, role });
        

    } catch (e) {
        console.error('Login error:', e.message);
        return res.status(500).json({ success: false, message: 'Failed to login', error: e.message });
    }
};