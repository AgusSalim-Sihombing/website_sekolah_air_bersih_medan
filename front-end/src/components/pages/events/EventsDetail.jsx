import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./EventDetail.css"
const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DetailEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [showContent, setShowContent] = useState(false);


    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const res = await axios.get(`${API_URL}/public/events/${id}`);
            setEvent(res.data);
            setTimeout(() => setShowContent(true), 100); // kasih delay biar smooth
        } catch (err) {
            console.error("Gagal memuat detail event:", err);
        }
    };


    if (!event) {
        return (
            <Container className="mt-5 text-center">
                <p>Memuat detail kegiatan...</p>
            </Container>
        );
    }

    return (
        <Container
            className={`mt-5 d-flex flex-column align-items-center text-center transition-container ${showContent ? "show" : ""}`}
            style={{ maxWidth: "900px" }}
        >


            <h2 className="fw-bold mb-4">{event.nama_event}</h2>

            <img
                src={`${API_URL}/public/events/flyer/${event.id}`}
                alt="Flyer Event"
                style={{ width: "100%", maxHeight: "500px", objectFit: "contain", marginBottom: "20px" }}
            />
            <table className="event-detail-table mt-3 text-start w-100">
                <tr>
                    <td><strong>Tanggal</strong></td>
                    <td>:</td>
                    <td>{event.tanggal ? format(new Date(event.tanggal), "dd MMMM yyyy", { locale: idLocale }) : "-"}</td>
                </tr>
                <tr>
                    <td><strong>Waktu</strong></td>
                    <td>:</td>
                    <td>{event.waktu || "-"}</td>
                </tr>
                <tr>
                    <td><strong>Lokasi</strong></td>
                    <td>:</td>
                    <td>{event.lokasi || "-"}</td>
                </tr>
                <tr>
                    <td><strong>Penyelenggara</strong></td>
                    <td>:</td>
                    <td>{event.penyelenggara || "-"}</td>
                </tr>
                <tr>
                    <td><strong>Event Selengkapnya</strong></td>
                    <td>:</td>
                    <td><a href={event.link} target="_blank">Klik Disini</a></td>
                </tr>
               
            </table>

            <div className="mt-4 text-start w-100">
                <h5 className="fw-bold mb-3">Deskripsi Kegiatan:</h5>
                <div
                    dangerouslySetInnerHTML={{ __html: event.deskripsi }}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                        textAlign: "justify"
                    }}
                />
            </div>

            {event.status === "cancelled" && (
                <p className="text-danger fw-bold mt-4">Acara ini telah dibatalkan.</p>
            )}
        </Container>
    );
};

export default DetailEvent;
