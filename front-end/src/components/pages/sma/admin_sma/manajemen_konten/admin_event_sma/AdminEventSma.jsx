import React, { useState, useEffect } from "react";
import axios from "axios";
import TableEventSma from "./TableEventSma";

const AdminEventSma = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        nama_event: "",
        deskripsi: "",
        tanggal: "",
        waktu: "",
        lokasi: "",
        penyelenggara: "",
        status: "draft",
        flyer: null
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await axios.get("http://localhost:3001/api/admin-sma/events-sma");
        setEvents(response.data);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, flyer: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        await axios.post("http://localhost:3001/api/admin-sma/events-sma", data);
        fetchEvents();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/api/events/${id}`);
        fetchEvents();
    };

    return (
        <TableEventSma/>
    );
};

export default AdminEventSma;
