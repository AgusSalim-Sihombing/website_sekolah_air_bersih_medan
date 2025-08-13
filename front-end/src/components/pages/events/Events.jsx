import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./Events.css"

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Events = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_URL}/public/events`);
            setEvents(res.data.filter(event => event.status === "published"));
        } catch (err) {
            console.error("Gagal memuat event:", err);
        }
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const getPlainText = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };


    return (
        <Container className="mt-4">
            <h2 className="mb-4">Daftar Kegiatan Sekolah</h2>
            <Row>
                {events.map((event) => (
                    <Col md={4} className="mb-4" key={event.id}>
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={`${API_URL}/public/events/flyer/${event.id}`}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{event.nama_event}</Card.Title>
                                <Card.Text>
                                    {truncateText(getPlainText(event.deskripsi), 100)}
                                </Card.Text>
                                <p className="text-muted">
                                    {event.tanggal ? format(new Date(event.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}
                                </p>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/sma/acara/events/detail-events/${event.id}`)}
                                >
                                    Selengkapnya
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
