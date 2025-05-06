import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const AdminProfileSma = () => {
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        // Ambil data dari localStorage
        const storedId = localStorage.getItem("id");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role"); // Kalau kamu simpan role juga

        if (storedId && storedUsername) {
            setId(storedId);
            setUser(storedUsername);
            setRole(storedRole || "-");
        }
    }, []);

    return (
        <Container>
            <h2 className="text-center mt-5 mb-4">Profile Admin</h2>
            <h6 className="text-center mt-2">Halo user: {user || ".."}</h6>
            <h6 className="text-center mt-2">Id: {id || ".."}</h6>
            <h6 className="text-center mt-2">Role: {role || ".."}</h6>
        </Container>
    );
};

export default AdminProfileSma;
