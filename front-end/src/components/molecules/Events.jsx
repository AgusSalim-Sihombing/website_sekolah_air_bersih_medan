import React from 'react';
import { Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


const Events = () => {
  return (
    <Container>
      <h2 className="mt-4">Kegiatan Terbaru</h2>
      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://i.pinimg.com/474x/af/d9/65/afd965fe8c6c2e56c3cc9109e0524fe3.jpg" style={{height:"400px"}}/>
            <Card.Body>
              <Card.Title>Magnofestwo</Card.Title>
              <Card.Text>
                DEFINE YOUR SPELL
                FIND MAGIC INSIDE
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">10/02/2025</small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://i.pinimg.com/236x/e8/2f/7f/e82f7f1f89f36445c0e01d45f91a37d2.jpg"  style={{height:"400px"}}/>
            <Card.Body>
              <Card.Title>Walesce Returns</Card.Title>
              <Card.Text>
                TENANTS
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">15/05/2025</small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Events;