import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import "../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css"


const AdminVisiMisiTujuan = () => {
    const [visi, setVisi] = useState("");
    const [message, setMessage] = useState("Belum Ada Perubahan Data")
    const [id, setId] = useState("");
    const [misi, setMisi] = useState([]);
    const [tujuan, setTujuan] = useState([]);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        getVisi();
        getMisi();
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


    const getVisi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/visi");
            // console.log("Response dari API:", response.data);
            if (response.data.length > 0) {
                const data = response.data[0];
                setVisi(data.visi);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };



    const updateVisi = async () => {

        try {
            setLoading(true)
            const response = await axios.put("http://localhost:3001/api/admin/visi-update", { visi });
            // console.log("Response dari API", response.data)
            if (response.status === 200) {
                getVisi(); // Ambil data terbaru setelah update

            }
        } catch (error) {
            alert("Gagal memperbaharui Visi")
            console.error("Error saat memperbarui visi:", error);
        }
    }


    const getMisi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/misi")
            // console.log("Response dari API:", response.data);

            if (Array.isArray(response.data)) {
                const data = response.data;
                setId(data.id)
                setMisi(data)
            } else {
                setMisi([])
            }

        } catch (error) {
            console.log("Gagal Mengambil data :", error)
            setMisi([])
        }
    }



    const getTujuan = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/tujuan")
            // console.log("Response dari API:", response.data);

            if (Array.isArray(response.data)) {
                const data = response.data;
                setId(data.id)
                setTujuan(data)
            } else {
                setTujuan([])
            }
        } catch (error) {
            console.log("Gagal Mengambil data :", error)
            setTujuan([])
        }
    }

    return (
        <div>
            <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>
            <div className="visi" >
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title text-center">Visi</h2>
                    </div>
                    <div className="card-body">
                        <p>{visi ? visi : "Memuat visi..."}</p>
                    </div>
                </div>
                {/* <div className="edit-visi">
                    <input type="text" value={visi} onChange={(e) => setVisi(e.target.value)} className="input" />
                    <button >Update</button>
                </div> */}

                <div className="form-edit">
                    <textarea
                        className="form-control costum-form"
                        value={visi}
                        onChange={(e) => setVisi(e.target.value)}
                        rows="5"
                    />
                    <p className="text-center mt-3">{isLoading ? message : message}</p>
                    <button
                        className="btn btn-update mt-3 "
                        onClick={updateVisi}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading.." : "Update Visi"}
                    </button>
                </div>
            </div>



            <div className="misi" >

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title text-center">Misi</h2>
                    </div>
                    <div className="card-body">
                        <ul className="costum-list">
                            {misi?.length > 0 ? ( // Optional Chaining agar tidak error
                                misi.map((item, index) => (
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
                    <input type="number" />
                    <p style={{ marginTop: "10px", bottom: "0" }}>Edit Teks Misi</p>
                    <textarea
                        className="form-control costum-form"
                        value={misi.misi}
                        onChange={(e) => setVisi(e.target.value)}
                        rows="5"
                    />
                    <button
                        className="btn btn-update mt-3 "
                    >
                        Update Misi
                    </button>
                </div>
            </div>


            <div className="tujuan" >

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title text-center">Tujuan</h2>
                    </div>
                    <div className="card-body">
                        <ul className="costum-list">
                            {tujuan?.length > 0 ? ( // Optional Chaining agar tidak error
                                tujuan.map((item, index) => (
                                    <li key={index} >
                                        {item.tujuan}
                                    </li>
                                ))
                            ) : (
                                <p>Memuat Tujuan...</p> // Pesan loading jika data masih kosong
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

                    <textarea
                        className="form-control costum-form"
                        value={visi}
                        onChange={(e) => setVisi(e.target.value)}
                        rows="5"
                    />
                    <button
                        className="btn btn-update mt-3 "
                    >
                        Update Tujuan
                    </button>
                </div>
            </div>


        </div>

    );

}

export default AdminVisiMisiTujuan;