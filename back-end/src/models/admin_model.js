const pool = require("../database/database_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secreet_key";

// const getAdmin = (id) => {
//     pool.query("SELECT * FROM admin WHERE id = ?", [id], (err, result) =>{
//         if(err) {
//             console.log(err);
//         }
//         return JSON.parse(result)
//     })
// }

const getAllAdmins = (callback) => {
    pool.query("SELECT * FROM admin", (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};


const findAdminByUsername = (username) => {
    pool.query("SELECT * FROM admin WHERE username = ?", [username], (err, results) => {
        if (err) return callback(err, null);
        
    });
};


// Simpan token ke database
const saveSessionToken = (id, token, callback) => {
    pool.query("UPDATE admin SET token = ? WHERE id = ?", [token, id], callback);
};


// Periksa apakah token masih valid
const isTokenValid = (id, token, callback) => {
    pool.query("SELECT token FROM admin WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) return callback(false);
        callback(results[0].token === token);
    });
};


// Generate token
const generateToken = (admin) => {
    return jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: "1h" });
};

// Tambah admin baru (untuk testing)
const addAdmin = (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return callback(err);
        pool.query("INSERT INTO admin (username, password) VALUES (?, ?)", [username, hash], callback);
    });
};


module.exports = { findAdminByUsername, saveSessionToken, isTokenValid, generateToken, addAdmin, getAllAdmins };