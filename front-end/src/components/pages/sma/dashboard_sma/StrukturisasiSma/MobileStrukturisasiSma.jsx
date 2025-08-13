// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Modal, Button, Spinner, Container, Badge, Alert } from "react-bootstrap";
// import RingLoader from "react-spinners/RingLoader";
// import DeskripsiTugas from "../data/DeskripsiTugas";

// const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

// const HalamanStrukturOrganisasi = () => {
//     const [chartData, setChartData] = useState([]);
//     const [dataAll, setDataAll] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [color] = useState("rgba(3, 29, 68, 1)");
//     const [selectedData, setSelectedData] = useState("");
//     const [show, setShow] = useState(false);

//     useEffect(() => {
//         getDataOrganization();
//     }, []);

//     const getDataOrganization = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/admin/data-organisasi-cart`);
//             setDataAll(response.data);

//             const formattedData = response.data.map((item) => {
//                 const labelWidth = item.name.length < 10 ? 100 : 120;
//                 const levelColor = item.parent_id === null
//                     ? '#0d6efd'
//                     : item.level === 2
//                         ? '#198754'
//                         : '#f0ad4e';

//                 return {
//                     x: item.name || "",
//                     id: `node-${item.node_id}`,
//                     parent: item.parent_id ? `node-${item.parent_id}` : undefined,
//                     label: {
//                         text: item.name,
//                         style: { fontSize: "14px", fontWeight: "bold", color: "#fff" }
//                     },
//                     color: levelColor
//                 };
//             });

//             setChartData(formattedData);
//         } catch (error) {
//             console.error("Gagal mengambil data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (chartData.length === 0) return;

//         JSC.Chart("chartDivFull", {
//             debug: false,
//             type: "organizational",
//             defaultAnnotation: {
//                 padding: [10, 5],
//                 margin: [10, 0],
//             },
//             defaultTooltip_enabled: false,
//             defaultSeries: {
//                 defaultPoint: {
//                     connectorLine: {
//                         radius: [0, 0],
//                         color: "#2c3e50",
//                         width: 1,
//                         caps: { end: { type: "", size: 7 } },
//                     },
//                     annotation: {
//                         padding: 8,
//                         margin: 4,
//                         radius: 8,
//                         outline: { color: "#2c3e50", width: 1 },
//                     },
//                     events_click: function () {
//                         const clickedId = this.id.replace("node-", "");
//                         const selected = dataAll.find(item => item.node_id === clickedId);
//                         if (selected) {
//                             setSelectedData(selected);
//                             setShow(true);
//                         }
//                     }
//                 },
//             },
//             series: [{
//                 points: chartData,
//             }],
//         });
//     }, [chartData, dataAll]);

//     return (
//         <Container className="my-4">
//             <h2 className="text-center mb-4 fw-bold">
//                 📌 Struktur Organisasi SMA Advent Air Bersih
//             </h2>

//             {loading ? (
//                 <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
//                     <RingLoader color={color} loading={loading} size={60} />
//                 </div>
//             ) : (
//                 <div id="chartDivFull" style={{ width: "100%", height: "800px" }}></div>
//             )}

//             <div className="my-5">
//                 <DeskripsiTugas />
//             </div>

//             <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         {selectedData?.name} {" "}
//                         <Badge bg="info">{selectedData?.jabatan || "Jabatan"}</Badge>
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <table className="table table-bordered">
//                         <tbody>
//                             <tr>
//                                 <th scope="row">Nama</th>
//                                 <td>{selectedData?.username || "-"}</td>
//                             </tr>
//                             <tr>
//                                 <th scope="row">Jenis Kelamin</th>
//                                 <td>{selectedData?.jenis_kelamin || "-"}</td>
//                             </tr>
//                             <tr>
//                                 <th scope="row">NIP</th>
//                                 <td>{selectedData?.nip || "-"}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShow(false)}>Tutup</Button>
//                 </Modal.Footer>
//             </Modal>
//         </Container>
//     );
// };

// export default HalamanStrukturOrganisasi;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tree,
  TreeNode,
} from "react-organizational-chart";
import { Container, Card } from "react-bootstrap";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const HalamanStrukturOrganisasi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/admin/data-organisasi-cart`).then((res) => {
      setData(res.data);
    });
  }, []);

  const buildTree = (parentId) => {
    return data
      .filter((item) => item.parent_id === parentId)
      .map((item) => (
        <TreeNode
          key={item.node_id}
          label={
            <Card style={{ padding: "8px 12px", fontSize: "14px" }}>
              <strong>{item.name}</strong>
              <br />
              <small>{item.jabatan || "Jabatan"}</small>
            </Card>
          }
        >
          {buildTree(item.node_id)}
        </TreeNode>
      ));
  };

  const root = data.find((item) => item.parent_id === null);

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">📊 Struktur Organisasi SMA</h3>
      {root ? (
        <div style={{ overflowX: "auto" }}>
          <Tree
            label={
              <Card style={{ padding: "10px 15px", background: "#0d6efd", color: "white" }}>
                <strong>{root.name}</strong>
                <br />
                <small>{root.jabatan || "Jabatan"}</small>
              </Card>
            }
          >
            {buildTree(root.node_id)}
          </Tree>
        </div>
      ) : (
        <p className="text-center">Memuat struktur organisasi...</p>
      )}
    </Container>
  );
};

export default HalamanStrukturOrganisasi;
