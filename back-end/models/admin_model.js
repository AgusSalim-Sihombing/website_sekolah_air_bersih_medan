// const data = require("../data/data.json");
// const fs = require("fs");


// const adminModel = () => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(data, 'utf8', (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(JSON.parse(result));
//         })
//     })
// }

// module.exports = { adminModel };

// models/adminModel.js
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dataPath = path.join(__dirname, '../data/data.json');
const sessionPath = path.join(__dirname, "../data/session.json") //sesi untuk admin (memastikan hanya bisa login di satu browser)
const SECRET_KEY = 'your_secret_key';

const getAdmins = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};


const findAdminByUsername = (username) => {
    const admins = getAdmins();
    return admins.find(admin => admin.username === username);
};



// Simpan token aktif
const saveSessionToken = (id, token) => {
    let sessions = {};
    if (fs.existsSync(sessionPath)) {
        sessions = JSON.parse(fs.readFileSync(sessionPath));
    }
    sessions[id] = token; // Simpan token terbaru
    fs.writeFileSync(sessionPath, JSON.stringify(sessions));
};


// Periksa apakah token masih valid
const isTokenValid = (id, token) => {
    if (!fs.existsSync(sessionPath)) return false;
    const sessions = JSON.parse(fs.readFileSync(sessionPath));
    return sessions[id] === token; // Pastikan token cocok dengan yang tersimpan
};


const generateToken = (admin) => {

    const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
    saveSessionToken(admin.id, token)
    return token

};

module.exports = { getAdmins, findAdminByUsername, generateToken , isTokenValid};

