import React, { useState, useEffect } from "react";
import axios from "axios";
// import * as XLSX from "xlsx";

const ManajemenDataSekolahSma = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchExcelData();
    }, []);

    const fetchExcelData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin-sma/get-excel-data");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:3001/api/admin-sma/upload-excel", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Upload sukses!");
            fetchExcelData();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/admin-sma/delete-excel-data/${id}`);
            fetchExcelData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div>
            <h2>Manajemen Data Sekolah SMA</h2>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <h3>Data Siswa</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>No Induk Siswa</th>
                        <th>Nama</th>
                        <th>Kelas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.no_induk_siswa}</td>
                            <td>{item.nama}</td>
                            <td>{item.kelas}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManajemenDataSekolahSma;