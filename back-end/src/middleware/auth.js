// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "your-secret-key"; // samakan dengan yang di login

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

//     if (!token) {
//         return res.status(401).json({ message: "Token tidak tersedia" });
//     }

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });

//         req.user = user; // Simpan user dari token ke request
//         next();
//     });
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });

        console.log('Decoded token in middleware:', decoded);
        req.user = decoded; // Simpan data user yang terdekripsi
        next();
    });
};

const checkAdminOwnership = (req, res, next) => {
    const requestedAdminId = req.params.id;
    const loggedInAdminId = req.user.id; // ID admin yang sedang login

    if (requestedAdminId !== loggedInAdminId) {
        return res.status(403).json({ message: "Anda tidak memiliki akses untuk memodifikasi data admin lain" });
    }
    next();
};

const checkSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: "Hanya super admin yang bisa mengakses ini" });
    }
    next();
};

module.exports = { verifyToken, checkAdminOwnership, checkSuperAdmin };