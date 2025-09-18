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
import * as jwt_decode from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const TableAdminSma = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const token = localStorage.getItem("token");
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "admin",
        status: "active",
        unit_sekolah: "SMA" // Default unit_sekolah
    });

    useEffect(() => {
        // Decode token saat komponen mount
        if (token) {
            const decoded = jwt_decode.jwtDecode(token);
            setCurrentAdmin(decoded);
            console.log("Decoded admin data:", decoded);
        }
        getAdmins();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getAdmins = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-unit/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data admin:", error);
            if (error.response?.status === 403) {
                setErrorMessage("Anda tidak memiliki izin untuk melihat data admin");
            }
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password dan konfirmasi password tidak sama");
            return;
        }

        if (!token) {
            alert("Token tidak ditemukan. Silakan login ulang.");
            return;
        }

        try {
            const payload = {
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                role: formData.role,
                status: formData.status,
                unit_sekolah: formData.unit_sekolah // WAJIB ambil dari token
            };

            const response = await axios.post(
                `${API_BASE_URL}/admin-unit/admin`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(response.data.message);
            setShowAddModal(false);
            getAdmins();
        } catch (error) {
            console.error("Error:", error.response?.data);
            alert(error.response?.data?.message || "Terjadi kesalahan");
        }
    };



    const handleEdit = (admin) => {
        // PERUBAHAN DI SINI: Superadmin tidak bisa mengedit dirinya sendiri
        if (currentAdmin.role === 'superadmin' && currentAdmin.id === admin.id) {
            alert("Super admin tidak bisa mengedit datanya sendiri.");
            return;
        }

        setSelectedAdmin(admin);
        setFormData({
            username: admin.username,
            password: "",
            confirmPassword: "",
            role: admin.role,
            status: admin.status,
            unit_sekolah: admin.unit_sekolah // Ambil unit_sekolah dari admin yang dipilih
        });
        setShowModal(true);
    };

    const handleUpdate = async () => {
        // Tambahkan validasi di sini untuk superadmin yang mencoba mengedit dirinya sendiri
        if (currentAdmin.role === 'superadmin' && selectedAdmin.id === currentAdmin.id) {
            alert("Super admin tidak bisa mengedit datanya sendiri.");
            return;
        }

        try {
            await axios.put(
                `${API_BASE_URL}/admin-unit/admin/${selectedAdmin.id}`,
                {
                    username: formData.username,
                    password: formData.password || undefined,
                    role: formData.role,
                    status: formData.status,
                    unit_sekolah: formData.unit_sekolah // WAJIB ambil dari token
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setShowModal(false);
            getAdmins();
            alert("Data admin berhasil diperbarui");
        } catch (error) {
            console.error("Gagal memperbarui admin:", error);
            if (error.response?.status === 403) {
                alert("Anda tidak memiliki izin untuk mengupdate data ini");
            }
        }
    };

    const handleDelete = async (id) => {
        // Hanya super admin yang bisa menghapus dan tidak bisa menghapus diri sendiri
        if (currentAdmin.role !== 'superadmin') {
            alert("Hanya super admin yang bisa menghapus admin");
            return;
        }

        if (currentAdmin.id === id) {
            alert("Anda tidak bisa menghapus diri sendiri");
            return;
        }

        if (window.confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
            try {
                await axios.delete(
                    `${API_BASE_URL}/admin-unit/admin/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                getAdmins();
                alert("Admin berhasil dihapus");
            } catch (error) {
                console.error("Gagal menghapus admin:", error);
                if (error.response?.status === 403) {
                    alert("Anda tidak memiliki izin untuk menghapus admin");
                }
            }
        }
    };

    const handleToggleStatus = async (id) => {
        // Hanya super admin yang bisa mengubah status dan tidak bisa mengubah status sendiri
        if (currentAdmin.role !== 'superadmin') {
            alert("Hanya super admin yang bisa mengubah status admin");
            return;
        }

        if (currentAdmin.id === id) {
            alert("Anda tidak bisa mengubah status diri sendiri");
            return;
        }

        try {
            await axios.patch(
                `${API_BASE_URL}/admin-unit/admin/status/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            getAdmins();
        } catch (error) {
            console.error("Gagal mengubah status:", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mt-4">
            <h5 className="mb-3">Tabel Admin</h5>

            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Hanya super admin yang bisa menambahkan admin baru */}
                {currentAdmin?.role === 'superadmin' && (
                    <Button
                        variant="primary"
                        onClick={() => setShowAddModal(true)}
                        style={{ marginBottom: "20px" }}
                    >
                        <Icon.PersonAdd /> Tambahkan Admin
                    </Button>
                )}

                <div style={{ display: "flex", gap: "20px" }}>
                    <Icon.Download
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={() => {
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
                        }}
                        title="Download CSV"
                    />
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Unit</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.created_at ? format(new Date(item.created_at), "dd MMM yyyy, HH:mm", { locale: idLocale }) : "-"}</td>
                            <td>{item.updated_at ? format(new Date(item.updated_at), "dd MMM yyyy, HH:mm", { locale: idLocale }) : "-"}</td>
                            <td>{item.role}</td>
                            <td>
                                {/* Hanya super admin yang bisa mengubah status */}
                                {currentAdmin?.role === 'superadmin' && currentAdmin.id !== item.id ? (
                                    <Button
                                        variant={item.status === "active" ? "success" : "secondary"}
                                        onClick={() => handleToggleStatus(item.id)}
                                    >
                                        {item.status === "active" ? "Aktif" : "Nonaktif"}
                                    </Button>
                                ) : (
                                    <span className={`badge bg-${item.status === "active" ? "success" : "secondary"}`}>
                                        {item.status === "active" ? "Aktif" : "Nonaktif"}
                                    </span>
                                )}
                            </td>

                            <td>{item.unit_sekolah}</td>
                            
                            <td>
                                {currentAdmin?.role === 'superadmin' ? (
                                    <>
                                        <Button
                                            variant="primary"
                                            className="mx-1"
                                            onClick={() => handleEdit(item)}
                                            disabled={currentAdmin?.id === item.id}
                                        >
                                            <Icon.Pen />
                                        </Button>
                                        {currentAdmin.id !== item.id && (
                                            <Button
                                                variant="danger"
                                                className="mx-1"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Icon.Trash />
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    <span>-</span> // admin biasa tidak bisa aksi apapun
                                )}
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

            {/* Modal Edit Admin */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                // PERUBAHAN DI SINI: Disable input username jika superadmin mengedit dirinya sendiri
                                disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password (Biarkan kosong jika tidak ingin mengubah)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Masukkan password baru"
                                // PERUBAHAN DI SINI: Disable input password jika superadmin mengedit dirinya sendiri
                                disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Konfirmasi password baru"
                                // PERUBAHAN DI SINI: Disable input konfirmasi password jika superadmin mengedit dirinya sendiri
                                disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                            />
                        </Form.Group>

                        {currentAdmin?.role === 'superadmin' && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        // PERUBAHAN DI SINI: Disable input role jika superadmin mengedit dirinya sendiri
                                        disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        // PERUBAHAN DI SINI: Disable input status jika superadmin mengedit dirinya sendiri
                                        disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Select
                                        name="unit_sekolah"
                                        value={formData.unit_sekolah}
                                        onChange={handleChange}
                                    >
                                        <option value="SMP">SMP</option>
                                        <option value="SMA">SMA</option>
                                        <option value="SMK">SMK</option>
                                        <option value="YAYASAN">YAYASAN</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                        // PERUBAHAN DI SINI: Disable tombol "Simpan Perubahan" jika superadmin mengedit dirinya sendiri
                        disabled={currentAdmin?.role === 'superadmin' && selectedAdmin?.id === currentAdmin?.id}
                    >
                        Simpan Perubahan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Tambah Admin */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddAdmin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {currentAdmin?.role === 'superadmin' && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Select
                                        name="unit_sekolah"
                                        value={formData.unit_sekolah}
                                        onChange={handleChange}
                                    >
                                        <option value="SMP">SMP</option>
                                        <option value="SMA">SMA</option>
                                        <option value="SMK">SMK</option>
                                        <option value="YAYASAN">YAYASAN</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        <Button variant="success" type="submit" className="mt-3">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TableAdminSma;