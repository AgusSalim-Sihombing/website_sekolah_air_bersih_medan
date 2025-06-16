import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Image,
  Button,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const AdminProfileSma = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("Administrator");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedId && storedUsername) {
      setId(storedId);
      setUser(storedUsername);
      setRole(storedRole || "Administrator");
      setEmail(`${storedUsername}@example.com`);
      setFullName("John Doe");
    }
  }, []);

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={4} className="text-center">
            <Image
              src="https://www.gravatar.com/avatar/?d=mp&s=150"
              roundedCircle
              width={150}
              height={150}
              className="mb-3"
            />
            <h4>{fullName}</h4>
            <p className="text-muted">
              <a href={`mailto:${email}`}>{email}</a> - {role}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#999" }}>
              Avatar by <a href="https://gravatar.com">gravatar.com</a>. Or upload your own...
            </p>
            <div
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#aaa",
              }}
            >
              Drop your files here or <strong>click in this area</strong>
            </div>
          </Col>

          <Col md={8}>
            <h5 className="mb-3">Account</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control value={user} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value="********" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Full name <span className="text-danger">*</span></Form.Label>
                <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                  <option>Spanish</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary">Update Profile</Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AdminProfileSma;
