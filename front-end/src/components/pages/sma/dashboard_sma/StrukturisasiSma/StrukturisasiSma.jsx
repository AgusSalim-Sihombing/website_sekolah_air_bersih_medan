import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button, Spinner, Container, Badge, Alert } from "react-bootstrap";
import DeskripsiTugas from "../data/DeskripsiTugas";
import RingLoader from "react-spinners/RingLoader";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const OrganizationalChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("rgba(3, 29, 68, 1)");
  const [selectedData, setSelectedData] = useState("");
  const [show, setShow] = useState(false);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    getDataOrganization();
  }, []);

  const getDataOrganization = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/data-organisasi-cart`);
      setDataAll(response.data);

      const formattedData = response.data.map((item) => {
        const labelWidth = item.name.length < 10 ? 100 : 200;

        return {
          x: item.name || "",
          id: `node-${item.node_id}`,
          parent: item.parent_id ? `node-${item.parent_id}` : undefined,
          label: {
            text: item.name,
            width: labelWidth,
            align: "center",
            verticalAlign: "middle",
            style: {
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
              fill: "black"
            }
          }

        };
      });

      setChartData(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chartData.length === 0) return;

    const chartContainer = document.getElementById("chartDiv1");
    if (!chartContainer) return; // Stop kalau elemen belum ada

    JSC.Chart("chartDiv1", {
      debug: false,
      type: "organizational",
      defaultAnnotation: {
        padding: [10, 5],
        margin: [10, 0],
        width: "auto",
      },
      defaultTooltip_enabled: true,
      defaultSeries: {
        color: "#f0f4fa",
        defaultPoint: {
          connectorLine: {
            radius: [0, 0],
            color: "#2c3e50",
            width: 1,
            caps: { end: { type: "", size: 7 } },
          },
          annotation: {
            padding: 8,
            margin: 4,
            label: {
              style: { fontSize: "14px", fontWeight: "500" },
            },
            radius: 6,
            outline: { color: "#2c3e50", width: 1 },
            color: "#ffffff",
          },
          events_click: function () {
            const clickedId = this.id.replace("node-", "");
            const selected = dataAll.find(item => item.node_id === clickedId);
            if (selected) {
              setSelectedData(selected);
              setShow(true);
            }
          }
        },
      },
      series: [{
        points: chartData,
      }],
    });
  }, [chartData, dataAll]);


  return (
    <Container>
      <h2 className="text-center mb-4 fw-bold">Struktur Organisasi SMA</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
          <RingLoader color={color} loading={loading} size={60} />
        </div>
      ) : (isMobile ? (
        <Alert variant="info" className="text-center">
          Untuk melihat struktur organisasi secara lengkap, silakan kunjungi halaman khusus di
          <br />
          <Button variant="outline-primary" className="mt-2" href="/sma/detail-strukturisasi">Lihat Struktur Organisasi</Button>
        </Alert>
      ) : (
        <div id="chartDiv1" style={{ width: "100%", height: "750px", }}></div>
      )
      )}

      <div className="my-5">
        <DeskripsiTugas />
      </div>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Nama</th>
                <td>{selectedData?.username || "-"}</td>
              </tr>
              <tr>
                <th scope="row">Jenis Kelamin</th>
                <td>-</td>
              </tr>
              <tr>
                <th scope="row">NIP</th>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrganizationalChart;


// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Modal, Button, Spinner, Container, Badge, Alert } from "react-bootstrap";
// import DeskripsiTugas from "./data/DeskripsiTugas";
// import RingLoader from "react-spinners/RingLoader";

// const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

// const OrganizationalChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [dataAll, setDataAll] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [color, setColor] = useState("rgba(3, 29, 68, 1)");
//   const [selectedData, setSelectedData] = useState("");
//   const [show, setShow] = useState(false);

//   const isMobile = window.innerWidth <= 768;

//   useEffect(() => {
//     getDataOrganization();
//   }, []);

//   const getDataOrganization = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/admin/data-organisasi-cart`);
//       setDataAll(response.data);

//       const formattedData = response.data.map((item) => {
//         const labelWidth = item.name.length < 10 ? 100 : 120;

//         const levelColor = item.parent_id === null
//           ? '#0d6efd'
//           : item.level === 2
//             ? '#198754'
//             : '#f0ad4e';

//         return {
//           x: item.name || "",
//           id: `node-${item.node_id}`,
//           parent: item.parent_id ? `node-${item.parent_id}` : undefined,
//           label: {
//             text: item.name,
//             style: { fontSize: "14px", fontWeight: "bold", color: "#fff" }
//           },
//           color: levelColor
//         };
//       });

//       setChartData(formattedData);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (chartData.length === 0 || isMobile) return;

//     JSC.Chart("chartDiv1", {
//       debug: false,
//       type: "organizational",
//       defaultAnnotation: {
//         padding: [10, 5],
//         margin: [10, 0],
//       },
//       defaultTooltip_enabled: false,
//       defaultSeries: {
//         defaultPoint: {
//           connectorLine: {
//             radius: [0, 0],
//             color: "#2c3e50",
//             width: 1,
//             caps: { end: { type: "", size: 7 } },
//           },
//           annotation: {
//             padding: 8,
//             margin: 4,
//             radius: 8,
//             outline: { color: "#2c3e50", width: 1 },
//           },
//           events_click: function () {
//             const clickedId = this.id.replace("node-", "");
//             const selected = dataAll.find(item => item.node_id === clickedId);
//             if (selected) {
//               setSelectedData(selected);
//               setShow(true);
//             }
//           }
//         },
//       },
//       series: [{
//         points: chartData,
//       }],
//     });
//   }, [chartData, dataAll, isMobile]);

//   return (
//     <Container>
//       <h2 className="text-center mb-4 fw-bold">
//         📊 Struktur Organisasi SMA
//       </h2>

//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
//           <RingLoader color={color} loading={loading} size={60} />
//         </div>
//       ) : (
//         isMobile ? (
//           <Alert variant="info" className="text-center">
//             Untuk melihat struktur organisasi secara lengkap, silakan kunjungi halaman khusus di
//             <br />
//             <Button variant="outline-primary" className="mt-2" href="/struktur-organisasi">Lihat Struktur Organisasi</Button>
//           </Alert>
//         ) : (
//           <div id="chartDiv1" style={{ width: "100%", height: "800px" }}></div>
//         )
//       )}

//       <div className="my-5">
//         <DeskripsiTugas />
//       </div>

//       <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {selectedData?.name} {" "}
//             <Badge bg="info">{selectedData?.jabatan || "Jabatan"}</Badge>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th scope="row">Nama</th>
//                 <td>{selectedData?.username || "-"}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Jenis Kelamin</th>
//                 <td>{selectedData?.jenis_kelamin || "-"}</td>
//               </tr>
//               <tr>
//                 <th scope="row">NIP</th>
//                 <td>{selectedData?.nip || "-"}</td>
//               </tr>
//             </tbody>
//           </table>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>Tutup</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default OrganizationalChart;
