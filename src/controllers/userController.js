import bcrypt from 'bcrypt';
import User from '../models/user.js';

export async function createUser(req, res) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        const savedUser = await user.save(); // Save to MongoDB

        res.status(201).json({
            message: "User created successfully",
            user: savedUser
        });
        } catch (err) {
            console.error("Error creating user:", err);
            res.status(500).json({ message: "Internal server error" });
        }
}

