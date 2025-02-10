const pool = require("../database/database_connection");

getTotalSiswa = () =>{
    pool.query("SELECT * FROM total_siswa_tahunan", (err, result) => {
        if(err) return err
    })
}