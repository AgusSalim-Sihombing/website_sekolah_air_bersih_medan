import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./EventSma.css"
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const EventSma = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin-sma/events-sma`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };


    return (
        <Container>
            <h2 className="mt-4">Events SMA Advent Air Bersih</h2>
            <Row className="mt-5">
                {events
                    .filter(event => event.status !== 'draft') // Menyembunyikan event yang draft
                    .map((event) => (
                        <Col key={event.id} md={4} className="mb-4">
                            <Card
                                onClick={() => navigate(`/sma/acara/events/detail-events/${event.id}`)}
                                style={{ cursor: 'pointer' }}
                                className='card-event'
                            >
                                <Card.Img
                                    variant="top"
                                    src={`${API_BASE_URL}/admin-sma/events-sma/flyer/${event.id}`}
                                    // style={{ height: '400px' }}
                                    className='image'
                                />
                                <Card.Body>
                                    <Card.Title>{event.nama_event}</Card.Title>
                                    <Card.Text>{truncateText(event.deskripsi, 50)}</Card.Text>
                                    {event.status === 'cancelled' && (
                                        <p className="text-danger font-weight-bold">Cancelled</p>
                                    )}
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{event.tanggal ? format(new Date(event.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}</small>

                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default EventSma;
