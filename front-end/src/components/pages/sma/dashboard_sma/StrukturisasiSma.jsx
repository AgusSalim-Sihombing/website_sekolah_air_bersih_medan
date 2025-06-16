// import React from "react";
// import styled from "@emotion/styled";
// import { Tree, TreeNode } from "react-organizational-chart";

// const StyledNode = styled.div`
//   padding: 10px;
//   display: inline-block;
//   border: 1px solid black;

// `;

// const Strukturisasi = () => (
//     <Tree
//         lineWidth={"2px"}
//         lineColor={"green"}
//         lineBorderRadius={"10px"}
//         label={<StyledNode>Ketua Yayasan GMAHK DSKU</StyledNode>}
//     >
//         <TreeNode label={<StyledNode>Direktur Pendidikan GMAHK DSKU</StyledNode>}>
//             <TreeNode label={<StyledNode>Kepala Sekolah</StyledNode>}>
//                 <TreeNode label={<StyledNode>Bendahara</StyledNode>} />
//                 <TreeNode label="in-line">
//                     <TreeNode label={<StyledNode>Bendahara</StyledNode>} />
//                     <TreeNode label={<StyledNode>Bendahara</StyledNode>} />
//                     <TreeNode label={<StyledNode>Bendahara</StyledNode>} />
//                     <TreeNode label={<StyledNode>Bendahara</StyledNode>} />
//                 </TreeNode>

//                 <TreeNode label={<StyledNode>Kepala Tata Usaha</StyledNode>} />
//             </TreeNode>
//         </TreeNode>

//     </Tree>
// );

// export default Strukturisasi;

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// import { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";



// // import JSC from "jscharting";
// const JSC = window.JSC;

// const OrganizationalChart = () => {

//   const [data, setData] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);
//   const [show, setShow] = useState(false);

//   // Fetch data dari JSON
//   useEffect(() => {
//     fetch("../data/StrukturisasiData.json")
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   console.log(data)


//   useEffect(() => {
//     const chart = JSC.Chart("chartDiv1", {
//       debug: true,
//       type: "organizational",
//       defaultAnnotation: {
//         padding: [20, 5],
//         margin: [30, 10],
//       },
//       defaultTooltip_enabled: false,
//       defaultSeries: {
//         color: "#dde1e8",
//         defaultPoint: {

//           events_click: function () {
//             const id = this.id;
//             const selected = data.find(item => item.id === id);
//             setSelectedData(selected);
//             setShow(true); // Tampilkan modal saat klik
//           },


//           // label_maxWidth: 400,
//           label: {
//             style: { fontSize: "16px" },
//             width: 100,



//           },
//           connectorLine: {
//             // length: 100,
//             radius: [0, 0],
//             color: "#424242",
//             width: 1,
//             caps: { end: { type: "arrow", size: 7 } },
//           },
//         },
//       },
//       series: [
//         {

//           points: [
//             {
//               x: "Ketua Yayasan GMAHK DSKU",
//               id: "PM",
//               label: {
//                 style: { fontSize: "16px" },
//                 width: 300
//               },

//             },
//             {
//               x: "Direktur Pendidikan GMAHK DSKU",
//               id: "DPM",
//               parent: "PM",
//               label: {
//                 style: { fontSize: "16px" },
//                 width: 300
//               },

//             },
//             {
//               x: "Kepala Sekolah",
//               id: "KS", parent: "DPM",
//               label: {
//                 style: { fontSize: "16px" },
//                 width: 300
//               },
//             },
//             { x: "Bendahara", id: "BD", parent: "KS" },
//             {
//               x: "", id: "spacer1",
//               parent: "KS",
//               connectorLine: {
//                 color: "#424242",
//                 width: 1,
//                 caps: { end: { type: "", size: 0 } },
//               },
//             },  // Node kosong sebagai spacer
//             {
//               x: "Wakasek Bid. Akademik",
//               id: "WBA",
//               parent: "spacer1",
//               label: {
//                 width: 250
//               },
//             },
//             {
//               x: "Wakasek Bid. Sarpas",
//               id: "WBS",
//               parent: "spacer1",
//               label: {
//                 width: 250
//               },
//             },
//             {
//               x: "", id: "spacer2", parent: "spacer1",
//               connectorLine: {
//                 color: "#424242",
//                 width: 1,
//                 caps: { end: { type: "", size: 0 } },
//               },
//             },
//             { x: "Guru BP/BK", id: "GBPK", parent: "spacer2" },
//             { x: "Wakil Kelas X IPA", id: "WKXIPA", parent: "spacer2" },
//             { x: "Wakil Kelas X IPS", id: "WKXIPS", parent: "spacer2" },
//             { x: "Wakil Kelas XI IPA", id: "WKXIIPA", parent: "spacer2" },
//             { x: "Wakil Kelas XI IPS", id: "WKXIIPS", parent: "spacer2" },
//             { x: "Wakil Kelas XII IPA", id: "WKXIIIPA", parent: "spacer2" },
//             { x: "Wakil Kelas XII IPS", id: "WKXIIIPS", parent: "spacer2" },
//             { x: "Koord Lab. IPA", id: "KLI", parent: "spacer2" },
//             { x: "Koord Lab. Komp", id: "KLK", parent: "spacer2" },
//             { x: "Koord Perpustakaan", id: "KP", parent: "spacer2" },
//             {
//               x: "Wakasek Bid. Kesiswaan",
//               id: "WBK",
//               parent: "spacer1",
//               label: {
//                 width: 250
//               },
//             },
//             {
//               x: "Wakasek Bid. Humas",
//               id: "WBH",
//               parent: "spacer1",
//               label: {
//                 width: 250
//               },
//             },
//             { x: "Kepala Tata Usaha", id: "KPT", parent: "KS" },

//           ],
//         },
//       ],

//     });
//   }, []);



//   return (
//     <div>
//       <h1 className="text-center mb-4">STRUKTUR ORGANISASI</h1>
//       <div id="chartDiv1" style={{ width: "100%", height: "800px", backgroundColor: "gold" }}></div>
//       <Modal show={show} onHide={() => setShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedData?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>{selectedData?.description}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
//           <Button variant="primary">Save changes</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>


//   );
// };

// export default OrganizationalChart;

import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import DeskripsiTugas from "./data/DeskripsiTugas";
import RingLoader from "react-spinners/RingLoader";

// import Loader from "../../../molecules/Loader";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const OrganizationalChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dataAll, setDataAll] = useState([])
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("rgba(3, 29, 68, 1)");
  const [selectedData, setSelectedData] = useState("");
  const [show, setShow] = useState(false);


  useEffect(() => {
    getDataOrganization();
  }, []);

  const getDataOrganization = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/data-organisasi-cart`);
      setDataAll(response.data);

      const formattedData = response.data.map((item) => {
        const labelWidth = item.name.length < 10 ? 100 : 120;

        return {
          x: item.name || "",
          id: `node-${item.node_id}`,
          parent: item.parent_id ? `node-${item.parent_id}` : undefined,
          label: {
            width: labelWidth,
            style: { fontSize: "16px" },
          }
        };
      });


      setChartData(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {

    if (chartData.length === 0) return;

    JSC.Chart("chartDiv1", {
      debug: false,
      type: "organizational",
      defaultAnnotation: {
        padding: [10, 5],
        margin: [10, 0],
      },
      defaultTooltip_enabled: false,

      defaultSeries: {
        color: "#dde1e8",
        defaultPoint: {
          connectorLine: {
            // length: 100,
            radius: [0, 0],
            color: "#424242",
            width: 1,
            caps: { end: { type: "", size: 7 } },
          },

          events_click: function () {
            const clickedId = this.id.replace("node-", ""); // Ambil ID asli
            const selected = dataAll.find(item => item.node_id === clickedId); // Cari data berdasarkan ID

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
      // series: [
      //   {

      //     points: [
      //       { x: "Ketua Yayasan GMAHK DSKU", id: "PM", label: { style: { fontSize: "16px" }, width: 300 }, },
      //       { x: "Direktur Pendidikan GMAHK DSKU", id: "DPM", parent: "PM", label: { style: { fontSize: "16px" }, width: 300 }, },
      //       { x: "Komite Sekolah", id: "KMS", parent: "DPM" },
      //       { x: "Kepala Sekolah", id: "KS", parent: "KMS", label: { style: { fontSize: "16px" }, width: 300 }, },
      //       { x: "Bendahara", id: "BD", parent: "KS" },
      //       { x: "", id: "spacer1", parent: "KS", connectorLine: { color: "#424242", width: 1, caps: { end: { type: "", size: 0 } }, }, },  // Node kosong sebagai spacer
      //       { x: "Wakasek Bid. Akademik", id: "WBA", parent: "spacer1", label: { width: 250 }, },
      //       { x: "Wakasek Bid. Sarpas", id: "WBS", parent: "spacer1", label: { width: 250 }, },
      //       { x: "", id: "spacer2", parent: "spacer1", connectorLine: { color: "#424242", width: 1, caps: { end: { type: "", size: 0 } }, }, },
      //       { x: "Guru BP/BK", id: "GBPK", parent: "spacer2" },
      //       { x: "Wakil Kelas X IPA", id: "WKXIPA", parent: "spacer2" },
      //       { x: "Wakil Kelas X IPS", id: "WKXIPS", parent: "spacer2" },
      //       { x: "Wakil Kelas XI IPA", id: "WKXIIPA", parent: "spacer2" },
      //       { x: "Wakil Kelas XI IPS", id: "WKXIIPS", parent: "spacer2" },
      //       { x: "", id: "spacer3", parent: "spacer2" },
      //       { x: "Guru", id: "GURU", parent: "spacer3" },
      //       { x: "", id: "spacer4", parent: "spacer3" },
      //       { x: "Penjaga Sekolah", id: "PS", parent: "spacer4" },
      //       { x: "", id: "spacer5", parent: "spacer4" },
      //       { x: "Siswa/Siswi", id: "SIS", parent: "spacer5" },
      //       { x: "Satpam Sekolah", id: "SS", parent: "spacer4" },
      //       { x: "Operator Sekolah", id: "OS", parent: "spacer3" },
      //       { x: "Wakil Kelas XII IPA", id: "WKXIIIPA", parent: "spacer2" },
      //       { x: "Wakil Kelas XII IPS", id: "WKXIIIPS", parent: "spacer2" },
      //       { x: "Koord Lab. IPA", id: "KLI", parent: "spacer2" },
      //       { x: "Koord Lab. Komp", id: "KLK", parent: "spacer2" },
      //       { x: "Koord Perpustakaan", id: "KP", parent: "spacer2" },
      //       { x: "Wakasek Bid. Kesiswaan", id: "WBK", parent: "spacer1", label: { width: 250 }, }, {
      //         x: "Wakasek Bid. Humas",
      //         id: "WBH",
      //         parent: "spacer1",
      //         label: {
      //           width: 250
      //         },
      //       },
      //       { x: "Kepala Tata Usaha", id: "KPT", parent: "KS" },

      //     ],
      //   },
      // ],
    });
  }, [chartData, dataAll]);

  return (
    <div>
      <h1 className="text-center mb-4">STRUKTUR ORGANISASI SMA</h1>
      {dataAll.length > 0 ? <div id="chartDiv1" style={
        {
          width: "100%",
          height: "800px",
          // backgroundColor: "gold"
        }
      }>
      </div> : <div className="sweet-loading" style={{
        alignItems: "center", justifyContent: "center", display: "flex", width: "100%",
        height: "800px",
      }} >

        <RingLoader
          color={color}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"

        />
      </div>}


      <div className="bg-gray-100 min-h-screen flex items-center justify-center" >
        <DeskripsiTugas />
      </div>

      <Modal show={show} onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{selectedData?.username}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>-</td>
              </tr>
              <tr>
                <td>NIP</td>
                <td>:</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrganizationalChart;
