import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";

const AdminTujuan = () => {
    const [idTujuan, setIdTujuan] = useState("");
    const [tujuan, setTujuan] = useState({});
    const [tujuanAll, setTujuanAll] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("")


    useEffect(() => {

        getTujuan();

    }, []);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 3000);
                setMessage("Data Sedang Di Perbaharui..")
            });
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
                setMessage("Data Berhasil Di Perbaharui ;)")
            });
        }
    }, [isLoading]);

    useEffect(() => {
        const fetchTujuanById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/admin/tujuan/${idTujuan}`);
                setTujuan(response.data.tujuan || ""); // Mengisi textarea dengan misi yang diambil
                // console.log(misi)
            } catch (error) {
                setTujuan("")
                console.log("Tidak ada data dengan ID :", idTujuan) // setMisi([]); // Jika ID tidak ditemukan, textarea kosong
            }
        };

        fetchTujuanById();
    }, [idTujuan]); // Akan dipanggil setiap kali ID berubah

    const getTujuan = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/tujuan")
            // console.log("Response dari API:", response.data);

            if (Array.isArray(response.data)) {
                const data = response.data;
                setIdTujuan(data.id)
                setTujuanAll(data)
            } else {
                setTujuanAll([])
            }

        } catch (error) {
            console.log("Gagal Mengambil data :", error)
            setTujuanAll([])
        }
    }


    const updateTujuan = async () => {
        if (!idTujuan || !tujuan) {
            setMessage("ID Tujuan dan Teks Tujuan harus di isi")
            return;
        }

        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3001/api/admin/update-tujuan/${idTujuan}`, { tujuan: tujuan })
            if (response.status === 200) {
                getTujuan();
            }
        } catch (error) {
            alert("Gagal memperbaharui Tujuan")
            console.log("Error saat memperbaharui Tujuan :", error)
        }

    }

    return (
        <div className = "tujuan" >

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title text-center">Tujuan</h2>
                </div>
                <div className="card-body">
                    <ul className="costum-list">
                        {tujuanAll?.length > 0 ? ( // Optional Chaining agar tidak error
                            tujuanAll.map((item, index) => (
                                <li key={index} >
                                    {item.tujuan}
                                </li>
                            ))
                        ) : (
                            <p>Memuat Tujuan...</p> // Pesan loading jika data masih kosong
                        )}
                    </ul>

                </div>
            </div>


    <div className="form-edit">
        <p>Masukkan Id</p>
        <input
            type="number"
            placeholder="ID Tujuan"
            value={idTujuan}
            onChange={(e) => setIdTujuan(e.target.value)}
        />
        <p style={{ marginTop: "10px", bottom: "0" }}>Edit Teks Tujuan</p>
        <textarea
            className="form-control costum-form"
            value={tujuan}
            placeholder="Text Tujuan"
            onChange={(e) => setTujuan(e.target.value)}
            rows="5"
        />
        <p className="text-center mt-3">{isLoading ? message : message}</p>
        <button
            className="btn btn-update mt-3 "
            onClick={updateTujuan}
        >
            {isLoading ? "Loading.." : "Update Tujuan"}
        </button>

    </div>
        </div >
    )


}

export default AdminTujuan;