import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { format } from "date-fns";
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DetailDataKelasSma = () => {
    const { kelas } = useParams(); // Ambil kelas dari URL
    const [data, setData] = useState([]);
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/admin-sma/siswa-sma/${kelas}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, [kelas]);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin-sma/events-sma`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    if (!event) {
        return <p className="text-center mt-5">Loading data dan detail event...</p>;
    }


    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>

                    <div className="p-5">
                        <h2 className="text-xl font-bold mb-4">Data Siswa {kelas}</h2>
                        <table className="w-full border-collapse border border-gray-400">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-4">Nama</th>
                                    <th className="border p-2">Nis</th>
                                    <th className="border p-2">Jenis Kelamin</th>
                                    <th className="border p-2">Kelas</th>
                                    <th className="border p-2">Tanggal Lahir</th>
                                    <th className="border p-2">Alamat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((siswa) => (
                                    <tr key={siswa.id} className="text-center">
                                        <td className="border p-2">{siswa.id}</td>
                                        <td className="border p-4">{siswa.nama}</td>
                                        <td className="border p-2">{siswa.nis}</td>
                                        <td className="border p-2">{siswa.jenis_kelamin}</td>
                                        <td className="border p-2">{siswa.kelas}</td>
                                        <td className="border p-2">{siswa.tanggal_lahir}</td>
                                        <td className="border p-2">{siswa.alamat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>

                <Col md={4} style={{ maxHeight: "500px", overflowY: "auto" }}>
                    <div className="p-5">
                        <h4>Event Terkini</h4>
                        <ListGroup>
                            {event.map((item) => (
                                <ListGroup.Item key={item.id} action onClick={() => navigate(`/sma/acara/events-detail/${item.id}`)}>
                                    <strong>{item.nama_event}</strong>
                                    {/* <p className="mb-0">{item.tanggal ? format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale }) : "-"}</p> */}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DetailDataKelasSma;
