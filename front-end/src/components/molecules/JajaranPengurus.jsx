import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function JajaranPengurus() {
  return (
    <Container>
      <h2 className="text-center mt-5 mb-4">Jajaran Pengurus Yayasan</h2>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-2 ">
          <Image src="https://placehold.co/300x400" fluid alt="Ketua Yayasan" />
          <h5 className="text-center mt-2">Ketua Yayasan</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-4">
          <Image src="https://placehold.co/300x400" fluid alt="Bendahara Yayasan" />
          <h5 className="text-center mt-2">Bendahara Yayasan</h5>
        </Col>
        <Col md="auto" className="mb-5">
          <Image src="https://placehold.co/300x400" fluid alt="Pengawas Yayasan" />
          <h5 className="text-center mt-2">Pengawas Yayasan</h5>
        </Col>
        <Col md="auto" className="mb-4">
          <Image src="https://placehold.co/300x400" fluid alt="Anggota Pengawas Yayasan" />
          <h5 className="text-center mt-2">Anggota Pengawas Yayasan</h5>
        </Col>
      </Row>
    </Container>
  );
};
export default JajaranPengurus;