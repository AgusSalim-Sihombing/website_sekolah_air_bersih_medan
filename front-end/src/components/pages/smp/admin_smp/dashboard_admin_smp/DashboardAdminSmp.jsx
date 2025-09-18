import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./DashboardAdminSmp.css";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DashboardAdminSmp = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total404, setTotal404] = useState(0);
    const [rekap404, setRekap404] = useState([]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    //edit schedule
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event_date: formatDate(new Date()),
    });
    const [showForm, setShowForm] = useState(false);



    const attendanceData = [
        { month: "Feb", percentage: 40 },
        { month: "Mar", percentage: 95 },
        { month: "Apr", percentage: 67 },
        { month: "May", percentage: 90 },
        { month: "Jun", percentage: 50 },
    ];

    const productivityData = [
        { month: "Mar", done: 20 },
        { month: "Apr", done: 37 },
        { month: "May", done: 25 },
        { month: "Jun", done: 30 },
    ];



    const selectedDateStr = formatDate(selectedDate);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const unitSekolah = localStorage.getItem("unit_sekolah");

        if (!token || unitSekolah !== "SMP") {
            navigate("/forbidden");
        }
    }, []);

    useEffect(() => {
        fetchSchedules();
        fetchStatistik404();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await axios.get(`${API_URL}/smp/schedule-admin-smp`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSchedules(res.data);
        } catch (err) {
            console.error("Gagal memuat jadwal:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistik404 = async () => {
        try {
            const resTotal = await axios.get(`${API_URL}/public/404/total`);
            const resRekap = await axios.get(`${API_URL}/public/404/rekap`);
            setTotal404(resTotal.data.total);
            setRekap404(resRekap.data);
        } catch (err) {
            console.error("Gagal memuat statistik 404:", err);
        }
    };



    const filteredSchedules = schedules.filter((item) => {
        const eventDate = new Date(item.event_date);
        const eventDateStr = formatDate(eventDate);
        return eventDateStr === selectedDateStr;
    });

    //form data schedule for edit
    const startEdit = (item) => {
        try {
            setEditId(item.id);
            setFormData({
                title: item.title,
                description: item.description,
                event_date: formatDate(new Date(item.event_date)),
            });
            setEditMode(true);
            setShowForm(true);
        } catch (error) {
            console.error("Gagal memulai edit:", error);
            alert("Gagal memulai edit jadwal.");
        }
    };


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (editMode && editId) {
                // Mode edit
                await axios.put(`${API_URL}/smp/schedule-admin-smp/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                window.confirm("Jadwal berhasil diperbarui!");
            } else {
                // Mode create
                await axios.post(`${API_URL}/smp/schedule-admin-smp`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                window.confirm("Jadwal berhasil dibuat!");
            }

            setFormData({ title: "", description: "", event_date: formatDate(new Date()) });
            setShowForm(false);
            setEditMode(false);
            setEditId(null);
            fetchSchedules();
        } catch (err) {
            console.error("Gagal menyimpan jadwal:", err);
            alert("Gagal menyimpan jadwal.");
        }
    };

    //handle delete
    const handleDelete = async (id) => {
        const confirm = window.confirm("Yakin ingin menghapus jadwal ini?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/smp/schedule-admin-smp/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchSchedules();
        } catch (error) {
            console.error("Gagal menghapus jadwal:", error);
            alert("Gagal menghapus jadwal.");
        }
    };


    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = formatDate(date);
            const hasSchedule = schedules.some(item => formatDate(new Date(item.event_date)) === dateStr);

            if (hasSchedule) {
                return (
                    <div
                        style={{
                            backgroundColor: '#4CAF50',
                            borderRadius: '50%',
                            width: '6px',
                            height: '6px',
                            margin: '0 auto',
                            marginTop: '2px'
                        }}
                    />
                );
            }
        }
        return null;
    };
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "100%" }}>
                {/* Statistik */}
                <div style={{ display: "flex", gap: "20px" }}>
                    <div className="bg-white shadow p-4 rounded-md" style={{ width: "200px" }}>
                        <h2 className="text-sm text-gray-500">Students</h2>
                        <p className="text-2xl font-bold">302</p>
                    </div>
                    <div className="bg-white shadow p-4 rounded-md" style={{ width: "200px" }}>
                        <h2 className="text-sm text-gray-500">Teachers</h2>
                        <p className="text-2xl font-bold">33</p>
                    </div>
                    <div className="bg-white shadow p-4 rounded-md" style={{ width: "200px" }}>
                        <h2 className="text-sm text-gray-500">Staffs</h2>
                        <p className="text-2xl font-bold">28</p>
                    </div>
                </div>

                {/* Attendance */}
                <div className="bg-white shadow p-4 rounded-md mt-4">
                    <h2 className="text-lg font-semibold mb-2">Attendance Overview</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="percentage" stroke="#4CAF50" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>



                {/* Productivity */}
                <div className="bg-white shadow p-4 rounded-md mt-4">
                    <h2 className="text-lg font-semibold mb-2">Productivity</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={productivityData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="done" fill="#4CAF50" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>



                <div className="bg-white shadow p-4 rounded-md mt-4">
                    <h2 className="text-lg font-semibold mb-2">Top 10 Halaman 404 yang Dicari</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={rekap404}>
                            <XAxis dataKey="url_yang_dicari" tick={{ fontSize: 10 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="jumlah" fill="#FF5722" barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "20px",
                        marginTop: "40px",
                    }}>
                        <div className="bg-white shadow p-4 rounded-md" style={{
                            width: "200px",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <h2 className="text-sm text-gray-500">Total Halaman 404</h2>
                            <p className="text-2xl font-bold">{total404}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kalender dan Jadwal */}
            <div className="bg-white shadow p-4 rounded-md ml-4" style={{ width: "350px" }}>
                <h2 className="text-lg font-semibold">Kalender</h2>
                <p className="text-sm text-gray-500 mb-2">Pilih tanggal untuk melihat jadwal</p>
                <Calendar value={selectedDate} onChange={setSelectedDate} tileContent={tileContent} />

                {/* <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-3 text-sm bg-green-600 text-black px-3 py-1 rounded"
                >
                    Tambah Jadwal
                </button> */}
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditMode(false);
                        setEditId(null);
                        setFormData({
                            title: "",
                            description: "",
                            event_date: formatDate(selectedDate)
                        });
                    }}
                    className="mt-3 text-sm bg-green-600 text-black px-3 py-1 rounded"
                >
                    Tambah Jadwal
                </button>

                {showForm && (
                    <div className="modal-overlay" onClick={() => {
                        setShowForm(false);
                        setEditMode(false);
                        setEditId(null);
                    }}>
                        <Form
                            className="bg-dark rounded text-white p-5"
                            onSubmit={handleSubmit}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                {editMode ? "Edit Jadwal" : "Tambah Jadwal"}
                            </h3>

                            <Form.Group className="mb-3">
                                <Form.Label>Judul</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Judul"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder="Deskripsi"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>tanggal</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="event_date"
                                    value={formData.event_date}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Tanggal Jadwal"
                                />

                            </Form.Group>
                            <div style={{
                                gap: "10px",
                                display: "flex",
                                flexDirection: "row"
                            }}>
                                <Button
                                    type="submit"
                                    className="bg-success text-white px-4 py-1 rounded hover:bg-green-700"
                                >
                                    Simpan
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditMode(false);
                                        setEditId(null);
                                        setFormData({ title: "", description: "", event_date: formatDate(new Date()) });
                                    }}
                                    className="ml-2 bg-primary text-white px-4 py-1 rounded hover:bg-gray-600"
                                >
                                    Batal
                                </Button>
                            </div>
                        </Form>

                    </div>
                )}


                <div
                    className="mt-4 space-y-2 overflow-y-auto"
                    style={{ maxHeight: "500px" }}
                >

                    <h3 className="text-sm font-medium text-gray-700">
                        Jadwal pada {selectedDate.toDateString()}
                    </h3>

                    {loading ? (
                        <p className="text-sm text-gray-500">Memuat jadwal...</p>
                    ) : filteredSchedules.length > 0 ? (
                        filteredSchedules.map((item, index) => (
                            <div key={index} className="list-costum bg-white">
                                <p className="text-sm text-gray-700">📌 {item.title} - {item.description}</p>

                                <div className="d-flex flex-row gap-3 mt-1">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="text-xs bg-primary rounded px-3 py-1"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-light bg-danger rounded px-3 py-1 hover:bg-red-700"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>


                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Tidak ada jadwal</p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default DashboardAdminSmp;
