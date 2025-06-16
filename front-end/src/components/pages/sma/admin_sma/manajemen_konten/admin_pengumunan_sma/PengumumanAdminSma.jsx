
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;


const PengumumanAdminSma = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPengumuman, setSelectedPengumuman] = useState(null);
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [status, setStatus] = useState("draft");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        const response = await axios.get(`${API_BASE_URL}/admin-sma/pengumuman-sma-admin`);

        setPengumuman(response.data);
    };

    const handleAddPengumuman = async (e) => {
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/admin-sma/pengumuman-sma`, { judul, isi, status, tanggal });
        setShowAddModal(false);
        fetchPengumuman();
    };

    const handleEdit = (pengumuman) => {
        setSelectedPengumuman(pengumuman);
        setJudul(pengumuman.judul);
        setIsi(pengumuman.isi);
        setStatus(pengumuman.status);
        setTanggal(pengumuman.tanggal);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        await axios.put(`${API_BASE_URL}/admin-sma/pengumuman-sma/${selectedPengumuman.id}`, { judul, isi, status, tanggal });
        setShowModal(false);
        fetchPengumuman();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            await axios.delete(`${API_BASE_URL}/admin-sma/pengumuman-sma/${id}`);
            fetchPengumuman();
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pengumuman.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mt-5">
            <h5 className="mb-3">Manajemen Pengumuman</h5>
            <Button variant="primary" onClick={() => setShowAddModal(true)} style={{ marginBottom: "20px" }}>
                <Icon.Plus /> Tambah Pengumuman
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Isi</th>
                        <th>Tanggal Pengumuman</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.judul}</td>
                            <td><div dangerouslySetInnerHTML={{ __html: item.isi }} /></td>
                            <td>{item.tanggal ? format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}</td>
                            <td>{item.status}</td>
                            <td>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    justifyContent:"center",
                                    gap:"20px"
                                }}>
                                    <>
                                        <Button variant="primary" className="mx-1" onClick={() => handleEdit(item)}>
                                            Edit <Icon.Pen />
                                        </Button>
                                    </>

                                    <>
                                        <Button variant="danger" className="mx-1" onClick={() => handleDelete(item.id)}>
                                            Hapus <Icon.Trash />
                                        </Button>
                                    </>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                {Array.from({ length: Math.ceil(pengumuman.length / itemsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(pengumuman.length / itemsPerPage)))} />
            </Pagination>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pengumuman</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <Form.Control as="textarea" value={isi} onChange={(e) => setIsi(e.target.value)} />
                        </Form.Group> */}

                        <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <ReactQuill value={isi} onChange={setIsi} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pengumuman</Form.Label>
                            <Form.Control type="date" value={tanggal ? format(new Date(tanggal), "yyyy-MM-dd", { locale: idLocale }) : "-"} onChange={(e) => setTanggal(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Pengumuman</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddPengumuman}>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" onChange={(e) => setJudul(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <ReactQuill onChange={setIsi} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pengumuman</Form.Label>
                            <Form.Control type="date" onChange={(e) => setTanggal(e.target.value)} />
                        </Form.Group>

                        <Button variant="success" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PengumumanAdminSma;