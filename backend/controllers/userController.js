import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {generateToken} from "../utils/auth.js";

const userController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({ username, email, password });
            await user.save();

            // Generate a token after successful registration
            const token = generateToken(user);
            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials. No user found' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate and send token upon successful login
            const token = generateToken(user);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // New method to get all users
    getAllUsers: async (req, res) => {
        try {
            // Fetch all users from the database, excluding passwords
            const users = await User.find({}).select('-password');
            console.log(users)
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            // Fetch user details from the database
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Update user profile
    updateUserProfile: async (req, res) => {
        try {
            console.log(req.body);
            const { username, email, address } = req.body;
            console.log(req.user.userId)

            // Update user details in the database
            const updatedUser = await User.findByIdAndUpdate(
                req.user.userId,
                {
                    username,
                    email,
                    'address.street': address.street,
                    'address.city': address.city,
                    'address.postalCode': address.postalCode,
                    'address.country': address.country,
                },
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Regenerate the token if necessary fields that are included in the token have changed
            const token = generateToken(updatedUser);

            res.status(200).json({ message: 'User profile updated successfully', user: updatedUser, token });
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    // Update user password
    updateUserPassword: async (req, res) => {
        try {
            const { newPassword } = req.body;
            // Fetch the user to update the password
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the password and save to trigger pre('save') middleware for hashing
            user.password = newPassword;
            await user.save();

            // Optionally regenerate the token if it's necessary
            const token = generateToken(user);

            res.status(200).json({ message: 'Password updated successfully', token });
        } catch (error) {
            console.error('Error updating user password:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};

export default userController;
