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


import { useEffect } from "react";
// import JSC from "jscharting";
const JSC = window.JSC;
const OrganizationalChart = () => {
  useEffect(() => {
    const chart = JSC.Chart("chartDiv1", {
      debug: true,
      type: "organizational",
      defaultAnnotation: {
        padding: [30, 20],
        margin: [20, 50],
      },
      defaultTooltip_enabled: false,
      defaultSeries: {
        color: "#dde1e8",
        defaultPoint: {
          label_maxWidth: 400,

          connectorLine: {
            radius: [0, 1],
            color: "#424242",
            width: 1,
            caps: { end: { type: "arrow", size: 6 } },
          },
        },
      },
      series: [
        {
          points: [
            { x: "Project Manager", id: "PM" },
            { x: "Deputy Project Manager", id: "DPM", parent: "PM" },
            { x: "System Engineering", id: "SE", parent: "DPM" },
            { x: "Independent Test Group", id: "ITG", parent: "DPM" },
            { x: "Project Technical Lead", id: "PTL", parent: "DPM" },
            { x: "Quality Assurance", id: "QA", parent: "DPM" },
            { x: "Configuration Manager", id: "CM", parent: "DPM" },
            { x: "S/W Subproject Manager 1", id: "SM1", parent: "PTL" },
            { x: "Team 1", id: "team11", parent: "SM1" },
            { x: "Team 2", id: "team12", parent: "SM1" },
            
            { x: "S/W Subproject Manager 2", id: "SM2", parent: "PTL" },
            { x: "Team 1", id: "team21", parent: "SM2" },
            { x: "Team 2", id: "team22", parent: "SM2" },
            { x: "S/W Subproject Manager 3", id: "SM3", parent: "PTL" },
            { x: "Team 1", id: "team31", parent: "SM3" },
            { x: "Team 2", id: "team32", parent: "SM3" },
          ],
        },
      ],
    //   toolbar: {
    //     defaultItem: {
    //       margin: 5,
    //       events_click: (direction) => orientChart(chart, direction),
    //     },
    //     items: {
    //       Left_icon: "system/default/zoom/arrow-left",
    //       Right_icon: "system/default/zoom/arrow-right",
    //       Down_icon: "system/default/zoom/arrow-down",
    //       Up_icon: "system/default/zoom/arrow-up",
    //     },
    //   },
    });
  }, []);

//   const orientChart = (chart, direction) => {
//     const isVertical = /up|down/.test(direction.toLowerCase());
//     chart.options({
//       type: `organizational ${direction}`,
//       defaultPoint_annotation: {
//         syncWidth: !isVertical,
//         syncHeight: isVertical,
//         margin: isVertical ? [15, 5] : [5, 15],
//       },
//     });
//   };

  return (
    <div>
        <h1 className="text-center mb-4">STRUKTUR ORGANISASI</h1>
        <div id="chartDiv1" style={{ width: "100%", height: "600px" , backgroundColor:"red"}}></div>
    </div>
  );
};

export default OrganizationalChart;

// import { useEffect } from "react";
// // import JSC from "jscharting";

// const JSC = window.JSC;
// const OrganizationalChart = () => {
//     useEffect(() => {
//         // Pastikan JSC sudah terdefinisi sebelum dipanggil
//         if (JSC) {
//             JSC.chart("chartDiv1", {
//                 debug: true,
//                 type: "organizational",
//                 defaultAnnotation: {
//                     padding: [30, 10],
//                     margin: [20, 50],
//                 },
//                 defaultTooltip_enabled: false,
//                 defaultSeries: {
//                     color: "#dde1e8",
//                     defaultPoint: {
//                         label_maxWidth: 400,
//                         connectorLine: {
//                             radius: [0, 1],
//                             color: "#424242",
//                             width: 1,
//                             caps: { end: { type: "arrow", size: 6 } },
//                         },
//                     },
//                 },
//                 series: [
//                     {
//                         points: [
//                             { x: "Project Manager", id: "PM" },
//                             { x: "Deputy Project Manager", id: "DPM", parent: "PM" },
//                             { x: "System Engineering", id: "SE", parent: "DPM" },
//                             { x: "Independent Test Group", id: "ITG", parent: "DPM" },
//                             { x: "Project Technical Lead", id: "PTL", parent: "DPM" },
//                             { x: "Quality Assurance", id: "QA", parent: "DPM" },
//                             { x: "Configuration Manager", id: "CM", parent: "DPM" },
//                             { x: "S/W Subproject Manager 1", id: "SM1", parent: "PTL" },
//                             { x: "Team 1", id: "team11", parent: "SM1" },
//                             { x: "Team 2", id: "team12", parent: "SM1" },
//                             { x: "Team 3", id: "team13", parent: "SM1" },
//                             { x: "S/W Subproject Manager 2", id: "SM2", parent: "PTL" },
//                             { x: "Team 1", id: "team21", parent: "SM2" },
//                             { x: "Team 2", id: "team22", parent: "SM2" },
//                             { x: "S/W Subproject Manager 3", id: "SM3", parent: "PTL" },
//                             { x: "Team 1", id: "team31", parent: "SM3" },
//                             { x: "Team 2", id: "team32", parent: "SM3" },
//                         ],
//                     },
//                 ],
//             });
//         } else {
//             console.error("JSC is not defined");
//         }
//     }, []);

//     return <div id="chartDiv1" style={{ width: "100%", height: "500px" }}></div>;
// };

// export default OrganizationalChart;
