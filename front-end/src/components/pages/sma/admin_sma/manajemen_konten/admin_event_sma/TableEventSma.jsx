import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as Icon from 'react-bootstrap-icons';
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

import "./style/TableEventSma.css"
const TableEventSma = () => {
    const [events, setEvents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFlyerId, setSelectedFlyerId] = useState(null);
    const [flyerFile, setFlyerFile] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);


    const [formData, setFormData] = useState({
        nama_event: "",
        deskripsi: "",
        tanggal: "",
        waktu: "",
        lokasi: "",
        penyelenggara: "",
        status: "draft",
        // flyer: null,
    });

    useEffect(() => {
        getEvents();

    }, []);

    const getEvents = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin-sma/events-sma");
            setData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data event:", error);
            alert("Gagal load data dari data base")
        }
    };



    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e) => {
        setFormData({ ...formData, flyer: e.target.files[0] });
    };


    const handleAddEvent = async (e) => {
        e.preventDefault();
        const data = new FormData();
        // data.append("nama_event", formData.nama_event);
        // data.append("deskripsi", formData.deskripsi);
        // data.append("tanggal", formData.tanggal);
        // data.append("waktu", formData.waktu);
        // data.append("lokasi", formData.lokasi);
        // data.append("penyelenggara", formData.penyelenggara);
        // data.append("flyer", formData.flyer);
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post("http://localhost:3001/api/admin-sma/events-sma", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // await axios.post(`http://localhost:3001/api/admin-sma/events-sma/${selectedEvent.id}`, data);
            setShowAddModal(false);
            getEvents();
            alert("Event Berhasil Di Tambahkan")
        } catch (error) {
            console.error("Gagal menambahkan event:", error);
            alert("Event Gagal Di Tambahkan")
        }
    };


    const handleEdit = (event) => {
        setSelectedEvent(event);
        setFormData({
            nama_event: event.nama_event,
            deskripsi: event.deskripsi,
            tanggal: event.tanggal,
            waktu: event.waktu,
            lokasi: event.lokasi,
            penyelenggara: event.penyelenggara,
        });
        setShowModal(true);
    };

    const handleUpdate = async () => {
        // const updateData = new FormData();

        // updateData.append("nama_event", formData.nama_event);
        // updateData.append("deskripsi", formData.deskripsi);
        // updateData.append("tanggal", formData.tanggal);
        // updateData.append("waktu", formData.waktu);
        // updateData.append("lokasi", formData.lokasi);
        // updateData.append("penyelenggara", formData.penyelenggara);

        // for (let key in formData) {
        //     updateData.append(key, formData[key]);
        // }

        // if (formData.flyer) {
        //     updateData.append("flyer", formData.flyer);
        // }

        const updateData = {
            nama_event: formData.nama_event,
            deskripsi: formData.deskripsi,
            tanggal: formData.tanggal,
            waktu: formData.waktu,
            lokasi: formData.lokasi,
            penyelenggara: formData.penyelenggara,
        };

        try {
            await axios.put(`http://localhost:3001/api/admin-sma/events-sma/${selectedEvent.id}`, updateData, {
                // headers: { "Content-Type": "multipart/form-data" },
                headers: { "Content-Type": "application/json" }
            });
            // await axios.put(`http://localhost:3001/api/admin-sma/events-sma/${selectedEvent.id}`, updateData);
            setShowModal(false);
            getEvents();
            alert("Event Berhasil Di Update")
        } catch (error) {
            console.error("Terjadi Kesalahan :", error);
            alert("Gagal Memperbaharui Event")
        }
    };

    const handleStatusChange = async (eventId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/api/admin-sma/events-sma/${eventId}/status`, {
                status: newStatus,
            });
            getEvents(); // Refresh data event setelah update
            alert("Status berhasil di update")
        } catch (error) {
            console.error("Gagal memperbarui status event:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/admin-sma/events-sma/${id}`);
                getEvents();
                alert("Event Berhasil Di Hapus")
            } catch (error) {
                console.error("Gagal menghapus event:", error);
                alert("Gagal Menghapus Event")
            }
        }
    };

    const handleUploadFlyer = async () => {
        if (!flyerFile || !selectedFlyerId) return;

        const formData = new FormData();
        formData.append("flyer", flyerFile);

        try {
            await axios.put(`http://localhost:3001/api/admin-sma/events-sma/${selectedFlyerId}/flyer`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowUploadModal(false);
            getEvents(); // Refresh data
        } catch (error) {
            console.error("Gagal mengunggah flyer:", error);
        }
    };

    const handleEditFlyer = (eventId) => {
        // Bisa membuka modal atau form untuk upload flyer baru
        console.log("Edit flyer untuk event ID:", eventId);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    //untuk deskripsi


    return (
        <div className="container mt-5">
            <h5 className="mb-3">Tabel Event SMA</h5>
            <Button variant="primary" onClick={() => setShowAddModal(true)} style={{ marginBottom: "10px" }}>
                <Icon.Plus /> Tambah Event
            </Button>
            <Table striped bordered className="table-event" >
                <thead style={{ fontSize: "10px" }} className="kolom">
                    <tr>
                        <th className="nomor">No</th>
                        <th>Nama Event</th>
                        <th className="tanggal">Tanggal</th>
                        <th className="waktu">Waktu</th>
                        <th>Lokasi</th>
                        <th>Penyelenggara</th>
                        <th className="deskripsi">Deskripsi</th>
                        <th>Flayer</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "12px" }}>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td className="nomor">{indexOfFirstItem + index + 1}</td>
                            <td>{item.nama_event}</td>
                            <td>{item.tanggal ? format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}</td>
                            <td>{item.waktu ? format(new Date(`1970-01-01T${item.waktu}`), "HH:mm", { locale: idLocale }) : "-"}</td>
                            <td>{item.lokasi}</td>
                            <td>{item.penyelenggara}</td>
                            <td >{item.deskripsi}</td>

                            {/* edit flyer by id */}

                            {/* <td>
                                {item.flyer ? (
                                    <img src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${item.id}`}
                                        alt="Flyer"
                                        width="200"
                                        height="200" />
                                ) : (
                                    "Tidak ada flyer"
                                )}
                            </td> */}

                            <td className="flyer-container">
                                <div className="flyer-wrapper" onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}>
                                    {item.flyer ? (
                                        <img
                                            src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${item.id}`}
                                            alt="Flyer"
                                            width="150"
                                            height="150"
                                            className="flyer-image"
                                        />
                                    ) : (
                                        "Tidak ada flyer"
                                    )}
                                    {hoveredId === item.id && (
                                        <div className="overlay" onClick={() => { setSelectedFlyerId(item.id); setShowUploadModal(true); }}>
                                            <Icon.Pen size={15} className="pen-icon" />
                                        </div>
                                    )}
                                </div>
                            </td>

                            <td>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    <div style={{ display: "flex", }}>
                                        <Button variant="primary" className="mx-1" onClick={() => handleEdit(item)}>
                                            <Icon.Pen />
                                        </Button>
                                        <Button variant="danger" className="mx-1" onClick={() => handleDelete(item.id)}>
                                            <Icon.Trash />
                                        </Button>

                                    </div>
                                    <select
                                        name="status"
                                        style={{ borderRadius: "5px" }}
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

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
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Event</Form.Label>
                            <Form.Control type="text" value={formData.nama_event} onChange={(e) => setFormData({ ...formData, nama_event: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Waktu Event</Form.Label>
                            <Form.Control type="time" value={formData.waktu} onChange={(e) => setFormData({ ...formData, waktu: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" value={formData.tanggal ? format(new Date(formData.tanggal), "yyyy-MM-dd", { locale: idLocale }) : "-"} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lokasi</Form.Label>
                            <Form.Control type="text" value={formData.lokasi} onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control as="textarea" rows={3} value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Penyelenggara</Form.Label>
                            <Form.Control type="text" value={formData.penyelenggara} onChange={(e) => setFormData({ ...formData, penyelenggara: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Flyer Saat Ini</Form.Label>
                            {selectedEvent && selectedEvent.flyer && (
                                <div>
                                    <img
                                        src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${selectedEvent.id}`}
                                        alt="Flyer"
                                        width="200"
                                        height="150"
                                        className="mb-2"
                                    />
                                </div>
                            )}
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Upload Flyer</Form.Label>
                            <Form.Control type="file" name="flyer" onChange={handleFileChange} />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddEvent}>
                        <Form.Group>
                            <Form.Label>Nama Event</Form.Label>
                            <Form.Control type="text" name="nama_event" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control as="textarea" name="deskripsi" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" name="tanggal" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Waktu</Form.Label>
                            <Form.Control type="time" name="waktu" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lokasi</Form.Label>
                            <Form.Control type="text" name="lokasi" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Penyelenggara</Form.Label>
                            <Form.Control type="text" name="penyelenggara" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Upload Flyer</Form.Label>
                            <Form.Control type="file" name="flyer" onChange={handleFileChange} required />
                        </Form.Group>

                        <Button variant="success" type="submit" className="mt-3">
                            Simpan Event
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Flyer Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Flyer</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => setFlyerFile(e.target.files[0])} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUploadModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUploadFlyer}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TableEventSma;
