require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.listAccounts = async (req, res) => {
    try {
        const startIdx = parseInt(req.query?._start) || 0;
        const endIdx = parseInt(req.query?._end) || 9999999;
        const limit = endIdx - startIdx; // Calculate the limit

        // Fetch the data with pagination
        const data = await prisma.account.findMany({
            skip: startIdx,
            take: limit
        });

        // Get the total count of records
        const totalCount = await prisma.account.count();

        // Set the 'X-Total-Count' header to the total count of records
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-total-count', totalCount);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.createAccount = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await prisma.account.findUnique({
            where: { email: req.body.email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await prisma.account.create({
            data: req.body,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.showAccount = async (req, res) => {
    try {
        const user = await prisma.account.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

exports.updateAccount = async (req, res) => {
    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    }
    try {
        const updatedUser = await prisma.account.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const deletedUser = await prisma.account.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.account.findUnique({
            where: { email: email },
        })
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({
                message: "Authentication failed",
            })
        }

        const token = jwt.sign({
            username: user.username,
            email: user.email,
            role: user.role
        },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
        })


    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}



