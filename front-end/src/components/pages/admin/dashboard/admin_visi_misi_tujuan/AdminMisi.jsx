import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css"


const AdminMisi = () => {
    const [idMisi, setIdMisi] = useState("");
    const [misi, setMisi] = useState({})
    const [misiAll, setMisiAll] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("")

    useEffect(() => {

        getMisi();

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
        const fetchMisiById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/admin/misi/${idMisi}`);
                setMisi(response.data.misi || ""); // Mengisi textarea dengan misi yang diambil
                // console.log(misi)
            } catch (error) {
                setMisi("")
                console.log("Tidak ada data dengan ID :", idMisi) // setMisi([]); // Jika ID tidak ditemukan, textarea kosong
            }
        };

        fetchMisiById();
    }, [idMisi]); // Akan dipanggil setiap kali ID berubah

    const getMisi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/misi")
            // console.log("Response dari API:", response.data);

            if (Array.isArray(response.data)) {
                const data = response.data;
                setIdMisi(data.id)
                setMisiAll(data)
            } else {
                setMisiAll([])
            }

        } catch (error) {
            console.log("Gagal Mengambil data :", error)
            setMisiAll([])
        }
    }


    const updateMisi = async () => {
        if (!idMisi || !misi) {
            setMessage("ID Misi dan Teks Misi harus di isi")
            return;
        }

        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3001/api/admin/update-misi/${idMisi}`, { misi: misi })
            if (response.status === 200) {
                getMisi();
            }
        } catch (error) {
            alert("Gagal memperbaharui Misi")
            console.log("Error saat memperbaharui Misi :", error)
        }

    }

    return (
        <div className="misi" >

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title text-center">Misi</h2>
                </div>
                <div className="card-body">
                    <ul className="costum-list">
                        {misiAll?.length > 0 ? ( // Optional Chaining agar tidak error
                            misiAll.map((item, index) => (
                                <li key={index} >
                                    {item.misi}
                                </li>
                            ))
                        ) : (
                            <p>Memuat Misi...</p> // Pesan loading jika data masih kosong
                        )}
                    </ul>

                    {/* <ul className="custom-list">
                            {misi.map((item, index) => (
                                <li key={item.id}>
                                    {item.misi}
                                </li>
                            ))}
                        </ul> */}

                </div>
            </div>
            {/* <div className="edit-visi">
                    <input type="text" value={visi} onChange={(e) => setVisi(e.target.value)} className="input" />
                    <button >Update</button>
                </div> */}

            <div className="form-edit">
                <p>Masukkan Id</p>
                <input
                    type="number"
                    placeholder="ID Misi"
                    value={idMisi}
                    onChange={(e) => setIdMisi(e.target.value)}
                />
                <p style={{ marginTop: "10px", bottom: "0" }}>Edit Teks Misi</p>
                <textarea
                    className="form-control costum-form"
                    value={misi}
                    placeholder="Text Misi"
                    onChange={(e) => setMisi(e.target.value)}
                    rows="5"
                />
                <p className="text-center mt-3">{isLoading ? message : message}</p>
                <button
                    className="btn btn-update mt-3 "
                    onClick={updateMisi}
                >
                    {isLoading ? "Loading.." : "Update Misi"}
                </button>

            </div>
        </div>
    )

}

export default AdminMisi;
