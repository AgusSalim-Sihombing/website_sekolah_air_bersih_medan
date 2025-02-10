const mysql = require("mysql2");

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"database_guru"
});

module.exports = pool;