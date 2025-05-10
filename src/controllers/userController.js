import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: "User created successfully",
            user: savedUser
        });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    img: user.img
                },
                process.env.JWT_KEY,
            );

            res.json({
                message: "Login successful",
                token: token
            });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    }).catch(err => {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    });
}
