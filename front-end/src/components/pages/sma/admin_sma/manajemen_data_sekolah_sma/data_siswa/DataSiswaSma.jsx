import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import DataSiswaSMA from "./DataSiswaSma2";

// import * as XLSX from "xlsx";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
console.log("BASE URL :", API_BASE_URL)

const DataSiswaSma = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDataSma, setSelectedDataSma] = useState(null);
    const [noIndukSiswa, setNoIndukSiswa] = useState("");
    const [nama, setNama] = useState("");
    const [kelas, setKelas] = useState("");

    useEffect(() => {
        getDataSiswaSma();
    }, []);

    const getDataSiswaSma = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-sma/get-excel-data`);
            setData(response.data);
            // setData(Array.isArray(response.data) ? response.data : []);
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
            getDataSiswaSma();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/api/admin-sma/update-data-siswa-sma/${selectedDataSma.id}`, {
                noIndukSiswa,
                nama,
                kelas
            });

            setShowModal(false);
            getDataSiswaSma()
        } catch (error) {
            console.error("gagal memperbaharui data siswa", error)
        }
    }

    const handleEdit = (siswa) => {
        setSelectedDataSma(siswa);
        setNoIndukSiswa(siswa.no_induk_siswa);
        setNama(siswa.nama);
        setKelas(siswa.kelas);
        setShowModal(true);

    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/admin-sma/delete-excel-data/${id}`);
            getDataSiswaSma();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleDeleteAllData = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/admin-sma/delete-all-data-siswa`);
            getDataSiswaSma();
        } catch (error) {
            console.error("Error deleting all data :", error)
        }
    }



    return (
        <div>
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "65px", marginBottom: "30px" }}>Manajemen Data Sekolah SMA</h4>
            <DataSiswaSMA />
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "30px" }}>Upload Data Siswa SMA</h4>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <div style={{
                justifyContent: "space-between",
                display: "flex",
                margin: "20px"
            }}>
                <button onClick={handleUpload} style={{ borderRadius: "5px", color: "" }}>Upload File</button>
                <button onClick={handleDeleteAllData} style={{ borderRadius: "5px", color: "" }}>Bersihkan Semua Data</button>

            </div>

            <Table striped bordered hover>
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
                                <Button variant="primary" className="mx-1" onClick={() => handleEdit(item)}>
                                    <Icon.Pen />
                                </Button>
                                <Button variant="danger" className="mx-1" onClick={() => handleDelete(item.id)}>
                                    <Icon.Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data Siswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>No Induk Siswa</Form.Label>
                            <Form.Control type="text" value={noIndukSiswa} onChange={(e) => setNoIndukSiswa(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kelas</Form.Label>
                            <Form.Control type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} />

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>



            {/* <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddAdminSma}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="mt-3">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal> */}
        </div>
    );
};

export default DataSiswaSma;