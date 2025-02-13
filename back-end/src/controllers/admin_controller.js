const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key"; // Ganti dengan secret key yang aman
const pool = require("../database/database_connection")

const loginAdmin = async (req, res) => {
    try { 
        const { username, password } = req.body;
        const [rows] = await pool.execute(
            "SELECT * FROM admin WHERE username = ?", [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).json({ token, userId: user.id });
        if(token.length !== 0){
            console.log("Login sukses dengan id admin :", user.id)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const register = async (req, res) => {
    try {
        const {username, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
            return res.status (400).json({message: "Password do not match"});
        }

        const hashhedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            "INSERT INTO admin (username , password) VALUES ( ?,?)",
            [username, hashhedPassword]
        );

        res.status(201).json({
            message: "admins registered succesfully",
            userId: result.insertId,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {loginAdmin, register};
