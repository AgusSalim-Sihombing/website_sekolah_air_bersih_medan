import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DataKelasSma = () => {
    const [kelas, setKelas] = useState("");
    const [data, setData] = useState([]);
    const [wali, setWali] = useState(null);

    const fetchData = async (kelasTerpilih) => {
        try {
            const [siswaRes, waliRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/public/siswa/${kelasTerpilih}`),
                axios.get(`${API_BASE_URL}/public/wali-kelas`)
            ]);

            setData(siswaRes.data);
            const waliKelas = waliRes.data.find((w) => w.kelas === kelasTerpilih && w.unit_sekolah === "SMA");
            setWali(waliKelas || null);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePilihKelas = (e) => {
        const selected = e.target.value;
        setKelas(selected);
        if (selected) fetchData(selected);
    };

    return (
        <div>
            <h3 className="mb-4">Data Siswa SMA Air Bersih</h3>

            <Form.Select value={kelas} onChange={handlePilihKelas} style={{ maxWidth: "250px" }}>
                <option value="">-- Pilih Kelas --</option>
                <option value="X_1">X - 1</option>
                <option value="X_2">X - 2</option>
                <option value="XI_IPA">XI - IPA</option>
                <option value="XII_IPA">XII - IPA</option>
                <option value="XII_IPS">XII - IPS</option>
            </Form.Select>

            {wali && (
                <Card className="mt-3">
                    <Card.Body>
                        <h5>Wali Kelas: {wali.nama_guru}</h5>
                        {wali.foto && <img src={`${API_BASE_URL}/uploads/${wali.foto}`} alt="Foto Guru" width="80" />}
                    </Card.Body>
                </Card>
            )}

            {data.length > 0 && (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>JK</th>
                            <th>NIS</th>
                            <th>NISN</th>
                            <th>Tempat, Tanggal Lahir</th>
                            <th>Alamat</th>
                            <th>Nama Ayah</th>
                            <th>Nama Ibu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((siswa, idx) => (
                            <tr key={siswa.id}>
                                <td>{idx + 1}</td>
                                <td>{siswa.nama}</td>
                                <td>{siswa.jk}</td>
                                <td>{siswa.nis}</td>
                                <td>{siswa.nisn}</td>
                                <td>{siswa.tempat_lahir}, {siswa.tanggal_lahir}</td>
                                <td>{siswa.alamat}</td>
                                <td>{siswa.nama_ayah}</td>
                                <td>{siswa.nama_ibu}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default DataKelasSma;
