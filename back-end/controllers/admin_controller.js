// const adminModel = require("../models/admin_model.js")

// exports.adminController  = async (req, res) => {
//     try {
//         const admin = await adminModel.adminModel();
//         res.status(200).json(admin);
//     } catch (error) {
//         res.status(500).json({ message: "Error reading data!" });
//     }
// }

// // module.exports={
// //     AdminController
// // }




// controllers/adminController.js
const adminModel = require('../models/admin_model');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

const getAllAdmins = (req, res) => {
    try {
        const admins = adminModel.getAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admins', error });
    }
};

const loginAdmin = (req, res) => {
    const { username, password } = req.body;
    const admin = adminModel.findAdminByUsername(username);

    if (admin && admin.password === password) {
        const token = adminModel.generateToken(admin);
        res.json({ message: 'Login successful', username, token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};


const authenticateToken = (req, res, next) => {
    // const token = req.header('Authorization');
    // if (!token) return res.status(403).json({ message: 'Access denied' });

    const token = req.header("Authorization")?.split(" ")[1]; // Ambil token dari header
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(200).json({ message: 'Invalid token' });


        // Cek apakah token masih aktif
        if (!adminModel.isTokenValid(user.id, token)) {
            return res.status(403).json({ message: "Token expired or logged in else where" });
        }
        req.user = user;
        next();
    });
};

module.exports = { getAllAdmins, loginAdmin, authenticateToken };