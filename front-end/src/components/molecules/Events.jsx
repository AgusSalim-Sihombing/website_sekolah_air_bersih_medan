import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./style/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchPengumuman();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container className="event-section">
      <Row className="mt-1">
        <Col md={8}>
          <h2 className="event-title">Kegiatan Terbaru</h2>
          <Row className="align-items-center">
            {isMobile ? (
              <>
                <Col xs={2} className="text-center">
                  <Button variant="secondary" className="event-nav-btn" onClick={prevSlide}>&lt;</Button>
                </Col>
                <Col xs={8} className="event-card-container">
                  {events.length > 0 && (
                    <Card className="event-card">
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${events[currentIndex].id}`}
                        style={{ objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{truncateText(events[currentIndex].nama_event, 20)}</Card.Title>
                        <Card.Text style={{ textAlign: "justify" }}>
                          {truncateText(events[currentIndex].deskripsi, 50)}
                        </Card.Text>
                        {events[currentIndex].status === "cancelled" && (
                          <p className="text-danger fw-bold">Cancelled</p>
                        )}
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          {events[currentIndex].tanggal ? format(new Date(events[currentIndex].tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}
                        </small>
                      </Card.Footer>
                      <Button
                        onClick={() => navigate(`/sma/acara/events/detail-events/${events[currentIndex].id}`)}
                        style={{ backgroundColor: "rgba(3, 29, 68, 1)" }}
                      >
                        Selengkapnya
                      </Button>
                    </Card>
                  )}
                </Col>
                <Col xs={2} className="text-center">
                  <Button variant="secondary" className="event-nav-btn" onClick={nextSlide}>&gt;</Button>
                </Col>
              </>
            ) : (
              events.slice(currentIndex, currentIndex + 2).map((event) => (
                <Col md={6} key={event.id} className="mb-4">
                  <Card className="event-card">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3001/api/admin-sma/events-sma/flyer/${event.id}`}
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{truncateText(event.nama_event, 20)}</Card.Title>
                      <Card.Text style={{ textAlign: "justify" }}>
                        {truncateText(event.deskripsi, 50)}
                      </Card.Text>
                      {event.status === "cancelled" && (
                        <p className="text-danger fw-bold">Cancelled</p>
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {event.tanggal ? format(new Date(event.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}
                      </small>
                    </Card.Footer>
                    <Button
                      onClick={() => navigate(`/sma/acara/events/detail-events/${event.id}`)}
                      style={{ backgroundColor: "rgba(3, 29, 68, 1)" }}
                    >
                      Selengkapnya
                    </Button>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>

        <Col md={4}>
          <h2>Pengumuman</h2>
          <ListGroup style={{ maxHeight: "450px", overflowY: "auto" }}>
            {pengumuman.map((item) => (
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