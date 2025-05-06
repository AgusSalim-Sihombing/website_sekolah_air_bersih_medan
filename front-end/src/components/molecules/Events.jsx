import React, { useEffect, useState } from "react";
import { useNavigate, Link, } from "react-router-dom";
import { Card, Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchPengumuman();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin-sma/events-sma");
      setEvents(response.data.filter(event => event.status !== "draft"));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchPengumuman = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin-sma/pengumuman-sma");
      setPengumuman(response.data);
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Container className="mt-4">

      <Row className="mt-4">
        {/* Kolom Event */}
        <Col md={8} >
          <h4>Kegiatan Terbaru</h4>
          <Row >
            {events.slice(0, 2).map(event => (
              <Col md={6} key={event.id} className="mb-4">
                <Card

                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${event.id}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{event.nama_event}</Card.Title>
                    <Card.Text>{truncateText(event.deskripsi, 50)}</Card.Text>
                    {event.status === "cancelled" && (
                      <p className="text-danger font-weight-bold">Cancelled</p>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      {event.tanggal ? format(new Date(event.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}
                    </small>
                  </Card.Footer>
                  <Button onClick={() => navigate(`/sma/acara/events/detail-events/${event.id}`)}
                    style={{ cursor: "pointer", backgroundColor: "rgba(3, 29, 68, 1)" }}>
                    Selengkapnya
                  </Button>
                </Card>
              </Col>

            ))}
          </Row>
        </Col>

        {/* Kolom Pengumuman */}
        <Col md={4}>
          <h4>Pengumuman</h4>
          <ListGroup style={{ maxHeight: "450px", overflowY: "auto" }}>
            {pengumuman.map(item => (
              <ListGroup.Item
                key={item.id}
                action
                onClick={() => navigate(`/sma/acara/pengumuman/detail-pengumuman/${item.id}`)}
              >
                <strong>{item.judul}</strong>
                <p className="mb-0 text-muted">
                  {item.tanggal ? format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}
                </p>
              </ListGroup.Item>
            ))}
            
          </ListGroup>

        </Col>

      </Row>
    </Container>
  );
};

export default Events;
