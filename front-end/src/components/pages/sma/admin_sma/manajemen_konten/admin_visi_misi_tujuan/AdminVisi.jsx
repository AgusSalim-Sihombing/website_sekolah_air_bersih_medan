import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";
import { Next } from "react-bootstrap/esm/PageItem";

const AdminVisi = () => {

    const [visi, setVisi] = useState("");
    const [message, setMessage] = useState("Belum Ada Perubahan Data")
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getVisi();
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

    // const updateVisi = async () => {

    //     try {
    //         setLoading(true)
    //         const response = await axios.put("http://localhost:3001/api/admin/visi-update", { visi });

    //         if (response.status === 200) {
    //             getVisi(); 

    //         }
    //     } catch (error) {
    //         alert("Gagal memperbaharui Visi")
    //         console.error("Error saat memperbarui visi:", error);
    //     }
    // }

    const updateVisi = async () => {
        setLoading(true);
        setMessage("Data Sedang Diperbaharui...");

        try {
            const response = await axios.put("http://localhost:3001/api/admin/visi-update", { visi });
            if (response.status === 200) {
                // Ambil data terbaru setelah update
                setTimeout(() => {
                    getVisi();
                    
                    setLoading(false);
                }, 3000);
            }
        } catch (error) {
            setMessage("Gagal Memperbaharui Data!");
            console.error("Error saat memperbarui visi:", error);
        } finally {
            setTimeout(() => {
                setMessage("Belum Ada Perubahan Data");
                setLoading(false);
            }, 3000); // Reset status setelah 3 detik
        } Next
    };

    return (
        <div className="visi" >
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title text-center">Visi</h5>
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

    )

}

export default AdminVisi;