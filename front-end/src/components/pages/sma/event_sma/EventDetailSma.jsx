import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./EventDetailSma.css";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const EventDetailSma = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [pengumuman, setPengumuman] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin-sma/events-sma/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event detail:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin-sma/pengumuman-sma`);
        setPengumuman(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchEventDetail();
    fetchNews();
  }, [id]);

  if (!event) {
    return <p className="text-center mt-5">Loading event details...</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Kolom Kiri: Detail Event */}
        <Col md={8}>
          <h2>{event.nama_event}</h2>
          <Image src={`${API_BASE_URL}/admin-sma/events-sma/flyer/${event.id}`} fluid className="mb-3" />
          <Card>
            <Card.Body>
              <Card.Text>{event.deskripsi}</Card.Text>
              <p><strong>Tanggal:</strong> {event.tanggal ? format(new Date(event.tanggal), "dd MMM yyyy, HH:mm", { locale: idLocale }) : "-"}</p>
              {event.status === 'cancelled' && <p className="text-danger font-weight-bold">Cancelled</p>}
            </Card.Body>
          </Card>
        </Col>

        {/* Kolom Kanan: Daftar Berita */}
        <Col md={4} style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h4>Pengumunan Terkini</h4>
          <ListGroup>
            {pengumuman.map((item) => (
              <ListGroup.Item key={item.id} action onClick={() => navigate(`/sma/acara/detail-pengumuman/${item.id}`)}>
                <strong>{item.judul}</strong>
                <p className="mb-0">{item.tanggal ? format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetailSma;