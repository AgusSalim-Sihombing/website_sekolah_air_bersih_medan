import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from 'react-bootstrap-icons';
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [filterId, setFilterId] = useState("");
    const [sortAscending, setSortAscending] = useState(true);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    //Unduh data dalam bentuk csv
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDownloadCSV = () => {
        if (data.length === 0) return;

        const csvHeader = "Id,Username,Created_At,Updated_At,Role,Status\n";
        const csvRows = data.map(item =>
            `${item.id},"${item.username}","${item.created_at}","${item.updated_at}","${item.role}","${item.status}"`
        );

        const csvContent = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "admin_data.csv";
        link.click();
    };


    const handleAddAdmin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/admin/add-admin", formData);
            alert(response.data.message); // Notifikasi sukses
            setShowModal(false);
            setFormData({ username: "", password: "", confirmPassword: "" });
            window.location.reload(); // Refresh halaman untuk update data
        } catch (error) {
            console.error("Error:", error.response?.data?.message || "Terjadi kesalahan");
        }
    };


    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/get-admin");
            setData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data admin:", error);
        }
    };

    const handleEdit = (admin) => {
        setSelectedAdmin(admin);
        setUsername(admin.username);
        setRole(admin.role);
        setStatus(admin.status);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/api/admin//update-admin/${selectedAdmin.id}`, {
                username,
                role,
                status,
            });
            setShowModal(false);
            getAdmins();
        } catch (error) {
            console.error("Gagal memperbarui admin:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/admin//delete-admin/${id}`);
                getAdmins();
            } catch (error) {
                console.error("Gagal menghapus admin:", error);
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/admin/toggle-status/${id}`);
            getAdmins();
        } catch (error) {
            console.error("Gagal mengubah status:", error);
        }
    };

    const handleSortById = () => {
        setSortAscending(!sortAscending);
        setData([...data].sort((a, b) => sortAscending ? a.id - b.id : b.id - a.id));
    };

    const filteredData = filterId ? data.filter(admin => admin.id.toString().includes(filterId)) : data;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mt-4">
            <h5 className="mb-3">Tabel Admin</h5>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="primary" onClick={() => setShowAddModal(true)} style={{ marginBottom: "10px" }}>
                    <Icon.PersonAdd /> Tambah Admin
                </Button>
                <div style={{ display: "flex", gap: "20px" }}>

                    <Icon.Filter size={24} style={{ cursor: "pointer", color: "#007bff" }} onClick={handleSortById} />

                    <Icon.Download
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={handleDownloadCSV}
                        title="Download CSV"
                    />
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Created_At</th>
                        <th>Update_At</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.created_at ? format(new Date(item.created_at), "dd MMM yyyy, HH:mm", { locale: idLocale }) : "-"}</td>
                            <td>{item.updated_at ? format(new Date(item.updated_at), "dd MMM yyyy, HH:mm", { locale: idLocale }) : "-"}</td>
                            <td>{item.role}</td>
                            <td>
                                <Button
                                    variant={item.status === "active" ? "success" : "secondary"}
                                    onClick={() => handleToggleStatus(item.id)}>
                                    {item.status === "active" ? "Aktif" : "Nonaktif"}
                                </Button>
                            </td>
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
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))} />
            </Pagination>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
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
                    <Modal.Title>Tambah Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddAdmin}>
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
            </Modal>

        </div>
    );
};

export default AdminTable;