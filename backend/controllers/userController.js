import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: savedUser,
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: err.message,
        });
    }
};

// Update the user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Successfully Updated!',
            data: updatedUser,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Update failed!',
        });
    }
};

// Delete the user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Deleted Successfully!',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to Delete',
        });
    }
};

// Get single user
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: 'Found Successfully!',
            data: user,
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not Found',
        });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: 'Found Successfully!',
            
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not Found',
        });
    }
};
