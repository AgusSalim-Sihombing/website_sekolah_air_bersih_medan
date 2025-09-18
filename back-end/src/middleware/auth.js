// // const jwt = require("jsonwebtoken");
// // const SECRET_KEY = "your-secret-key"; // samakan dengan yang di login

// // const verifyToken = (req, res, next) => {
// //     const authHeader = req.headers["authorization"];
// //     const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

// //     if (!token) {
// //         return res.status(401).json({ message: "Token tidak tersedia" });
// //     }

// //     jwt.verify(token, SECRET_KEY, (err, user) => {
// //         if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });

// //         req.user = user; // Simpan user dari token ke request
// //         next();
// //     });
// // };

// // module.exports = verifyToken;

// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "your-secret-key";

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Token tidak tersedia" });
//     }

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Format token salah atau tidak tersedia" });
//     }

//     // jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     //     if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });

//     //     console.log('Decoded token in middleware:', decoded);
//     //     req.user = decoded; 
//     //     next();
//     // });

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
//         if (!decoded.unit_sekolah) {
//             return res.status(403).json({ message: "Akses ditolak, unit sekolah tidak terdeteksi" });
//         }

//     req.user = decoded;
//         next();
//     });
// };

// const checkAdminOwnership = (req, res, next) => {
//     const requestedAdminId = req.params.id;
//     const loggedInAdminId = req.user.id; // ID admin yang sedang login

//     if (parseInt(requestedAdminId) !== parseInt(loggedInAdminId)) {
//         return res.status(403).json({ message: "Anda tidak memiliki akses untuk memodifikasi data admin lain" });
//     }

//     next();
// };

// const checkSuperAdmin = (req, res, next) => {
//     if (req.user.role !== 'superadmin') {
//         return res.status(403).json({ message: "Hanya super admin yang bisa mengakses ini" });
//     }
//     next();
// };

// module.exports = { verifyToken, checkAdminOwnership, checkSuperAdmin };

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token tidak tersedia atau format salah" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
        if (!decoded.unit_sekolah) {
            return res.status(403).json({ message: "Akses ditolak, unit sekolah tidak terdeteksi" });
        }

        req.user = decoded;
        next();
    });
};

const checkAdminOwnership = (req, res, next) => {
    if (parseInt(req.params.id) !== parseInt(req.user.id)) {
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

// Middleware untuk cek unit sekolah
const allowUnit = (unit) => {
    return (req, res, next) => {
        // if (req.user.unit_sekolah !== unit && req.user.role !== "superadmin") {
        //     return res.status(403).json({ message: "Akses ditolak, bukan bagian unit ini" });
        // }
        if (req.user.unit_sekolah.toUpperCase() !== unit.toUpperCase() && req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Akses ditolak, bukan bagian unit ini" });
        }
        next();
    };
};

module.exports = { verifyToken, checkAdminOwnership, checkSuperAdmin, allowUnit };
