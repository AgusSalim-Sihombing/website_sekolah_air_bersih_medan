import { useEffect, useState } from "react";
import "./DetailGuru.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DetailGuruTendik = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // Default null untuk menghindari error akses data sebelum ada respons

    useEffect(() => {
        getDetailGuru();
    }, [id]); // Tambahkan dependensi id agar tidak infinite loop

    const getDetailGuru = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/guru-tendik/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error get Data Guru :", error);
        }
    };

    if (!data) {
        return <p>Loading...</p>; // Menampilkan loading saat data masih diambil
    }

    return (
        <div className="detail-gutend">
            {/* <div className="gambar-gutend">
                <img src={data.foto} alt={data.nama} />
            </div>
            <div className="info-gutend">
                <h2>{data.nama}</h2>
                <p>Jabatan: {data.jabatan}</p>
                <p>Email: {data.email}</p>
            </div> */}
            {data.map((item) => (
                <div className="gutend">
                    <div>
                        <img src={item.foto} className="gambar-gutend" />
                    </div>

                    <div>
                        <table className="table-gutend">
                            <tbody className="tbody-gutend">
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{item.nama}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{item.email}</td>
                                </tr>
                                <tr>
                                    <td>Nomor Telepon</td>
                                    <td>:</td>
                                    <td>{item.no_hp}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>{item.alamat}</td>
                                </tr>
                                <tr>
                                    <td>Mata Pelajaran</td>
                                    <td>:</td>
                                    <td>{item.mata_pelajaran}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DetailGuruTendik;
