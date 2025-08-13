// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Col, Container, ListGroup, Row , Card} from "react-bootstrap";
// import { format } from "date-fns";
// import axios from 'axios';
// const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

// const DetailDataKelasSma = () => {
//     const { kelas } = useParams(); // Ambil kelas dari URL
//     const [data, setData] = useState([]);
//     const [event, setEvent] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();


//     useEffect(() => {
//         fetch(`${API_BASE_URL}/admin-sma/siswa-sma/${kelas}`)
//             .then((res) => res.json())
//             .then((data) => setData(data))
//             .catch((err) => console.error("Error fetching data:", err));
//     }, [kelas]);




//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/admin-sma/events-sma`);
//                 setEvent(response.data);
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//             }
//         };

//         fetchEvents();
//     }, []);

//     if (!event) {
//         return <p className="text-center mt-5">Loading data dan detail event...</p>;
//     }

//     const filteredData = data.filter(siswa =>
//         siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
//     );


//     return (
//         <Container className="mt-4">
//             <Row>
//                 <Col md={8}>

//                     <div className="p-5">
//                         <h2 className="text-xl font-bold mb-4">Data Siswa {kelas}</h2>
//                         <h5>Wali Kelas : </h5>
//                         <table className="w-full border-collapse border border-gray-400">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="border p-2">No.</th>
//                                     <th className="border p-4">Nama</th>
//                                     <th className="border p-2">Nis</th>
//                                     <th className="border p-2">Jenis Kelamin</th>
//                                     <th className="border p-2">Kelas</th>
//                                     <th className="border p-2">Tanggal Lahir</th>
//                                     <th className="border p-2">Alamat</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.map((siswa) => (
//                                     <tr key={siswa.id} className="text-center">
//                                         <td className="border p-2">{siswa.id}</td>
//                                         <td className="border p-4">{siswa.nama}</td>
//                                         <td className="border p-2">{siswa.nis}</td>
//                                         <td className="border p-2">{siswa.jenis_kelamin}</td>
//                                         <td className="border p-2">{siswa.kelas}</td>
//                                         <td className="border p-2">{siswa.tanggal_lahir}</td>
//                                         <td className="border p-2">{siswa.alamat}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </Col>

//                 <Col md={4}>
//                     <Card className="shadow-sm p-4 border-0" style={{ maxHeight: "550px", overflowY: "auto" }}>
//                         <h4 className="mb-3">📅 Event Terkini</h4>
//                         <ListGroup variant="flush">
//                             {event.map((item) => (
//                                 <ListGroup.Item
//                                     key={item.id}
//                                     action
//                                     className="mb-2 border rounded"
//                                     onClick={() => navigate(`/sma/acara/events/detail-events/${item.id}`)}
//                                 >
//                                     <strong>{item.nama_event}</strong>
//                                     <br />
//                                     <small className="text-muted">{item.tanggal}</small>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DetailDataKelasSma;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, Form, Badge } from "react-bootstrap";
import axios from 'axios';
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "./DetailKelas.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DetailDataKelasSma = () => {
    const { kelas } = useParams();
    const [data, setData] = useState([]);
    const [event, setEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
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
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    if (!event) {
        return <p className="text-center mt-5">Memuat data siswa dan event terkini...</p>;
    }

    const filteredData = data.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-4">
            <Row>
                {/* Data Siswa */}
                <Col md={8}>
                    <div className="mb-4">
                        <h3 className="fw-bold mb-3 border-bottom pb-2">📘 Data Siswa - Kelas {kelas}</h3>

                        <Form.Control
                            type="text"
                            placeholder="Cari nama siswa..."
                            className="mb-3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="custom-table-wrapper">
                            <table className="table table-striped table-bordered align-middle text-center w-100">
                                <thead className="table-primary">
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>NIS</th>
                                        <th>Jenis Kelamin</th>
                                        <th>Kelas</th>
                                        <th>Tgl. Lahir</th>
                                        <th>Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((siswa, index) => (
                                        <tr key={siswa.id}>
                                            <td>{index + 1}</td>
                                            <td>{siswa.nama}</td>
                                            <td>{siswa.nis}</td>
                                            <td>{siswa.jenis_kelamin}</td>
                                            <td><Badge bg="info" >{siswa.kelas}</Badge></td>
                                            <td>{siswa.tanggal_lahir ? format(new Date(siswa.tanggal_lahir), "dd MMMM yyyy", { locale: idLocale }) : "-"}</td>
                                            <td>{siswa.alamat}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>

                {/* Event Sidebar */}
                <Col md={4}>
                    <div className="p-3 rounded shadow-sm bg-white" style={{ maxHeight: "550px", overflowY: "auto" }}>
                        <h4 className="mb-3">📅 Event Terkini</h4>
                        <ListGroup variant="flush">
                            {event.map((item) => (
                                <ListGroup.Item
                                    key={item.id}
                                    action
                                    className="mb-2 border rounded"
                                    onClick={() => navigate(`/sma/acara/events/detail-events/${item.id}`)}
                                >
                                    <strong>{item.nama_event}</strong>
                                    <br />
                                    <small className="text-muted">{item.tanggal ? format(new Date(item.tanggal), "dd MMMM yyyy", { locale: idLocale }) : "-"}</small>
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
