import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from 'react-bootstrap-icons';
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const TotalSiswaTable = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [tahun, setTahun] = useState("");
    const [jumlahLaki, setJumlahLaki] = useState("");
    const [jumlahPerempuan, setJumlahPerempuan] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        getTotalSiswa();
    }, []);

    const getTotalSiswa = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/total-siswa-tahunan`);
            setData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const handleEdit = (siswa) => {
        setSelectedSiswa(siswa);
        setTahun(siswa.tahun);
        setJumlahLaki(siswa.laki_laki);
        setJumlahPerempuan(siswa.perempuan);
        setShowModal(true);
    };

    const handleAdd = () => {
        setTahun("");
        setJumlahLaki("");
        setJumlahPerempuan("");
        setShowAddModal(true);
    };


    const handleAddSubmit = async () => {
        try {
            await axios.post(`${API_BASE_URL}/admin/total-siswa-tahunan`, {
                tahun,
                laki_laki: jumlahLaki,
                perempuan: jumlahPerempuan,
            });

            setShowAddModal(false);
            getTotalSiswa();
        } catch (error) {
            console.error("Gagal menambahkan data:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_BASE_URL}/admin/total-siswa-tahunan/${tahun}`, {
                laki_laki: jumlahLaki,
                perempuan: jumlahPerempuan,
            });

            setShowModal(false);
            getTotalSiswa();
        } catch (error) {
            console.error("Gagal memperbarui data:", error);
        }
    };

    const handleDelete = async (tahun) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus data tahun ${tahun}?`)) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/total-siswa-tahunan/${tahun}`);
                getTotalSiswa();
            } catch (error) {
                console.error("Gagal menghapus data:", error);
            }
        }
    };

    const handleToggleActive = async (tahun) => {
        try {
            await axios.put(`${API_BASE_URL}/admin/total-siswa-tahunan/toggle/${tahun}`);
            getTotalSiswa();
        } catch (error) {
            console.error("Gagal mengubah status:", error);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mt-4">
            <h5 className="mb-3">Tabel Total Siswa/i Tahunan</h5>
            <Button variant="success" onClick={handleAdd} style={{ marginBottom: "10px" }}>
                <Icon.DatabaseAdd /> Tambah Data
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tahun</th>
                        <th>Laki-Laki</th>
                        <th>Perempuan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.tahun}</td>
                            <td>{item.laki_laki}</td>
                            <td>{item.perempuan}</td>
                            <td>
                                <Button variant={item.is_active ? "success" : "dark"} className="mx-1" onClick={() => handleToggleActive(item.tahun)}>
                                    {item.is_active ? <Icon.Eye /> : <Icon.EyeSlash />}
                                </Button>
                                <Button variant="primary" className="mx-1" onClick={() => handleEdit(item)}>
                                    <Icon.Pen />
                                </Button>
                                <Button variant="danger" className="mx-1" onClick={() => handleDelete(item.tahun)}>
                                    <Icon.Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))} />
            </Pagination>

            {/* Modal Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data Siswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control type="text" value={tahun} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Laki-Laki</Form.Label>
                            <Form.Control type="number" value={jumlahLaki} onChange={(e) => setJumlahLaki(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Perempuan</Form.Label>
                            <Form.Control type="number" value={jumlahPerempuan} onChange={(e) => setJumlahPerempuan(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Simpan Perubahan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Tambah Data */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Siswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control type="number" value={tahun} onChange={(e) => setTahun(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Laki-Laki</Form.Label>
                            <Form.Control type="number" value={jumlahLaki} onChange={(e) => setJumlahLaki(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Perempuan</Form.Label>
                            <Form.Control type="number" value={jumlahPerempuan} onChange={(e) => setJumlahPerempuan(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Batal
                    </Button>
                    <Button variant="success" onClick={handleAddSubmit}>
                        Simpan Data
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TotalSiswaTable;
