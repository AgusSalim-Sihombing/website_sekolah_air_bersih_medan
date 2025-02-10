const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "database_website_sekolah_air_bersih"

});


module.exports = pool;