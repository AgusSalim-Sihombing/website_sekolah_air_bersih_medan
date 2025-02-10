import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import "../../../../../styles/admin/admin_visi_misi_tujuan/VisiMisiTujuan.css"


const AdminVisiMisiTujuan = () => {
    const [visi, setVisi] = useState("");
    const [id, setId] = useState("");
    const [misi, setMisi] = useState("");

    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        getVisi();
        getMisi();
    }, []);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 5000);
            });
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    
    const getMisi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/misi")
        if(response.data.length > 0){
            const data = response.data[0];
            setId(data.id)
            setMisi(data.misi)
        }
        } catch (error) {
            console.log("Gagal Mengambil data :", error)
        }
    }


    return (
        <div>
            <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>
            
            <div className="misi" >

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title text-center">Misi</h2>
                    </div>
                    <div className="card-body">
                        <p>{misi ? misi : "Memuat Visi.."}</p>
                    </div>
                </div>
                {/* <div className="edit-visi">
                    <input type="text" value={visi} onChange={(e) => setVisi(e.target.value)} className="input" />
                    <button >Update</button>
                </div> */}

                <div className="form-edit">
                    <textarea
                        className="form-control"
                        value={visi}
                        onChange={(e) => setMisi(e.target.value)}
                        rows="5"
                    />
                    <button
                        className="btn btn-update mt-3 "
                    >
                        Update
                    </button>
                </div>
            </div>


        </div>

    );

}

export default AdminVisiMisiTujuan;