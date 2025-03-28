// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PengumumanAdminSma = () => {
//     const [pengumuman, setPengumuman] = useState([]);
//     const [judul, setJudul] = useState("");
//     const [isi, setIsi] = useState("");
//     const [status, setStatus] = useState("draft");

//     useEffect(() => {
//         fetchPengumuman();
//     }, []);

//     const fetchPengumuman = async () => {
//         const response = await axios.get("http://localhost:3001/api/admin-sma/pengumuman-sma-admin");
//         setPengumuman(response.data);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await axios.post("http://localhost:3001/api/admin-sma/pengumuman-sma", { judul, isi, status });
//         fetchPengumuman();
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:3001/api/admin-sma/pengumuman-sma/${id}`);
//         fetchPengumuman();
//     };

//     return (
//         <div>
//             <h2>Manajemen Pengumuman</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
//                 <textarea placeholder="Isi Pengumuman" value={isi} onChange={(e) => setIsi(e.target.value)} required />
//                 <select value={status} onChange={(e) => setStatus(e.target.value)}>
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                 </select>
//                 <button type="submit">Simpan</button>
//             </form>

//             <h3>Daftar Pengumuman</h3>
//             <ul>
//                 {pengumuman.map((item) => (
//                     <li key={item.id}>
//                         <strong>{item.judul}</strong> ({item.status})
//                         <button onClick={() => handleDelete(item.id)}>Hapus</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PengumumanAdminSma;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const PengumumanAdminSma = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPengumuman, setSelectedPengumuman] = useState(null);
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [status, setStatus] = useState("draft");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        const response = await axios.get("http://localhost:3001/api/admin-sma/pengumuman-sma-admin");
        
        setPengumuman(response.data);
    };

    const handleAddPengumuman = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/api/admin-sma/pengumuman-sma", { judul, isi, status });
        setShowAddModal(false);
        fetchPengumuman();
    };

    const handleEdit = (pengumuman) => {
        setSelectedPengumuman(pengumuman);
        setJudul(pengumuman.judul);
        setIsi(pengumuman.isi);
        setStatus(pengumuman.status);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        await axios.put(`http://localhost:3001/api/admin-sma/pengumuman-sma/${selectedPengumuman.id}`, { judul, isi, status });
        setShowModal(false);
        fetchPengumuman();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            await axios.delete(`http://localhost:3001/api/admin-sma/pengumuman-sma/${id}`);
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
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.judul}</td>
                            <td>{item.status}</td>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <Form.Control as="textarea" value={isi} onChange={(e) => setIsi(e.target.value)} />
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
                            <Form.Control type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <Form.Control as="textarea" value={isi} onChange={(e) => setIsi(e.target.value)} required />
                        </Form.Group>
                        <Button variant="success" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PengumumanAdminSma;