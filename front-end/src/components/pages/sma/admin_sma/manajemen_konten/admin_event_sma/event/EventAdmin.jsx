import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const EventAdmin = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nama_event: "",
        deskripsi: "",
        tanggal: "",
        waktu: "",
        lokasi: "",
        penyelenggara: "",
        status: "draft",
        flyer: null,
        link: "",
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_URL}/public/events`);
            setEvents(res.data);
        } catch (err) {
            console.error("Gagal memuat event:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "flyer") {
            setFormData({ ...formData, flyer: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key]);
            }

            if (editMode) {
                await axios.put(`${API_URL}/public/edit-events/${editId}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/public/events`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            fetchEvents();
            setShowForm(false);
            setEditMode(false);
            setEditId(null);
            resetForm();
        } catch (err) {
            console.error("Gagal menyimpan event:", err);
            window.confirm("Gagal menyimpan event")
        }
    };

    const startEdit = (item) => {
        const formatDateInput = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };
        setEditMode(true);
        setEditId(item.id);
        setShowForm(true);
        setFormData({
            nama_event: item.nama_event,
            deskripsi: item.deskripsi,
            tanggal: formatDateInput(item.tanggal),
            waktu: item.waktu,
            lokasi: item.lokasi,
            penyelenggara: item.penyelenggara,
            status: item.status,
            flyer: null
        });
    };

    const resetForm = () => {
        setFormData({
            nama_event: "",
            deskripsi: "",
            tanggal: "",
            waktu: "",
            lokasi: "",
            penyelenggara: "",
            status: "draft",
            flyer: null
        });
    };

    return (
        <div className="p-4">
            <h3>Manajemen Event</h3>
            <Button className="mb-3" onClick={() => {
                setShowForm(true);
                setEditMode(false);
                resetForm();
            }}>
                Tambah Event
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nama Event</th>
                        <th>Tanggal</th>
                        <th>Waktu</th>
                        <th>Lokasi</th>
                        <th>Penyelenggara</th>
                        <th>Status</th>
                        <th>Flyer</th>
                        <th>Dibuat</th>
                        <th>Diperbarui</th>
                        <th>Link Event</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.nama_event}</td>
                            <td>
                                {event.tanggal ? format(new Date(event.tanggal), "dd MMMM yyyy", { locale: idLocale }) : "-"}
                            </td>
                            <td>{event.waktu || "-"}</td>
                            <td>{event.lokasi || "-"}</td>
                            <td>{event.penyelenggara || "-"}</td>
                            <td>{event.status}</td>
                            <td>
                                {event.id ? (
                                    <img
                                        src={`${API_URL}/public/events/flyer/${event.id}`}
                                        alt="Flyer"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                ) : "-"}
                            </td>
                            <td>{event.created_at ? event.created_at.slice(0, 19).replace("T", " ") : "-"}</td>
                            <td>{event.updated_at ? event.updated_at.slice(0, 19).replace("T", " ") : "-"}</td>
                            <td>{event.link}</td>
                            <td>
                                <Button size="sm" variant="primary" onClick={() => startEdit(event)}>Edit</Button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal show={showForm} onHide={() => setShowForm(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Event" : "Tambah Event"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Nama Event</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama_event"
                                value={formData.nama_event}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Deskripsi</Form.Label>
                            <ReactQuill
                                value={formData.deskripsi}
                                onChange={(value) => setFormData({ ...formData, deskripsi: value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Waktu</Form.Label>
                            <Form.Control
                                type="text"
                                name="waktu"
                                value={formData.waktu}
                                onChange={handleInputChange}
                                placeholder="ex: 08.00 - 10.00 WIB"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Lokasi</Form.Label>
                            <Form.Control
                                type="text"
                                name="lokasi"
                                value={formData.lokasi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Penyelenggara</Form.Label>
                            <Form.Control
                                type="text"
                                name="penyelenggara"
                                value={formData.penyelenggara}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Flyer</Form.Label>
                            <Form.Control
                                type="file"
                                name="flyer"
                                onChange={handleInputChange}
                                accept="image/*"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button type="submit" variant="success">
                            {editMode ? "Update" : "Simpan"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EventAdmin;
