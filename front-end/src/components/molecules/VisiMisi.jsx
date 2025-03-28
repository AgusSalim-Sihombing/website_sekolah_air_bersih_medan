// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import PulseLoader from "react-spinners/PulseLoader";

// import axios from 'axios';
// import "../../styles/molecules/VisiMisi.css"
// import Loader from './Loader';

// const VisiMisiTujuan = () => {
//   const [visi, setVisi] = useState("");
//   const [misi, setMisi] = useState([]);
//   const [tujuan, setTujuan] = useState([]);
//   let [loading, setLoading] = useState(true);
//   let [color, setColor] = useState("rgba(3, 29, 68, 1)");



//   useEffect(() => {
//     getVisi();
//     getMisi();
//     getTujuan();
//   }, []);


//   const getVisi = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/admin/visi");
//       console.log("Response dari API:", response.data);
//       if (response.data.length > 0) {
//         const data = response.data[0];
//         setVisi(data.visi);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     }
//   };

//   const getMisi = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/admin/misi")
//       // console.log("Response dari API:", response.data);

//       if (Array.isArray(response.data)) {
//         const data = response.data;
//         setMisi(data)
//       } else {
//         setMisi([])
//       }

//     } catch (error) {
//       console.log("Gagal Mengambil data :", error)
//       setMisi([])
//     }
//   }

//   const getTujuan = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/admin/tujuan")
//       // console.log("Response dari API:", response.data);

//       if (Array.isArray(response.data)) {
//         const data = response.data;
//         setTujuan(data)
//       } else {
//         setTujuan([])
//       }
//     } catch (error) {
//       console.log("Gagal Mengambil data :", error)
//       setTujuan([])
//     }
//   }


//   return (
//     <div className='vmt'> {/* Parent Class yang Membatasi CSS */}
//       <Container className="mt-5">
//         <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>
//         <Row className="justify-content-center">
//           <Col xs={12} sm={6} md={4} className="mb-4">
//             <div className="card shadow cvisi">
//               <div className="card-header">
//                 <h2 className="card-title text-center">Visi</h2>
//               </div>
//               <div className="card-body costum ">
//                 <p>{visi ? visi : <Loader />}</p>
//               </div>
//             </div>
//           </Col>
//           <Col xs={12} sm={6} md={4} className="mb-4">
//             <div className="card shadow">
//               <div className="card-header">
//                 <h2 className="card-title text-center">Misi</h2>
//               </div>
//               <div className="card-body costum cmisi">
//                 <ul className="costum-list">
//                   {misi?.length > 0 ? (
//                     misi.map((item, index) => (
//                       <li key={index}>{item.misi}</li>
//                     ))
//                   ) : (
//                     <Loader />
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </Col>
//           <Col xs={12} sm={6} md={4} className="mb-4">
//             <div className="card shadow">
//               <div className="card-header">
//                 <h2 className="card-title text-center">Tujuan</h2>
//               </div>
//               <div className="card-body costum ctujuan">
//                 <ul className="costum-list">
//                   {tujuan?.length > 0 ? (
//                     tujuan.map((item, index) => (
//                       <li key={index}>{item.tujuan}</li>
//                     ))
//                   ) : (
//                     <Loader />
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );

// };

// export default VisiMisiTujuan;

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import "../../styles/molecules/VisiMisi.css";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/effect-cube";
import "swiper/css/effect-creative";

import "swiper/css/pagination";
import { EffectCoverflow, EffectFade, Pagination } from "swiper/modules";
import Tilt from "react-parallax-tilt";

const VisiMisiTujuan = () => {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState([]);
  const [tujuan, setTujuan] = useState([]);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    getVisi();
    getMisi();
    getTujuan();

    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/visi");
      if (response.data.length > 0) {
        setVisi(response.data[0].visi);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const getMisi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/misi");
      if (Array.isArray(response.data)) {
        setMisi(response.data);
      } else {
        setMisi([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setMisi([]);
    }
  };

  const getTujuan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/tujuan");
      if (Array.isArray(response.data)) {
        setTujuan(response.data);
      } else {
        setTujuan([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setTujuan([]);
    }
  };

  const cardContent = [
    {
      title: "Visi",
      content: visi ? visi : <Loader />,
    },
    {
      title: "Misi",
      content: misi.length > 0 ? (
        <ul>{misi.map((item, index) => <li key={index}>{item.misi}</li>)}</ul>
      ) : (
        <Loader />
      ),
    },
    {
      title: "Tujuan",
      content: tujuan.length > 0 ? (
        <ul>{tujuan.map((item, index) => <li key={index}>{item.tujuan}</li>)}</ul>
      ) : (
        <Loader />
      ),
    },
  ];

  return (
    <div className="vmt">
      <Container className="mt-5">
        <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>

        {isMobile ? (
          // Mode Mobile: Full Screen Fade Effect
          <Swiper
            effect={"flip"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[EffectFade, Pagination]}
            className="mySwiper"
          >
            {cardContent.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="mobile-card">
                  <h2 className="text-center">{item.title}</h2>
                  <div className="mobile-content">{item.content}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : isTablet ? (
          // Mode Tablet: 3D Coverflow
          <Swiper
            effect={"flip"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {cardContent.map((item, index) => (
              <SwiperSlide key={index}>
                <Tilt glareEnable={true} glareMaxOpacity={0.3} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                  <div className="card shadow">
                    <div className="card-header">
                      <h2 className="card-title text-center">{item.title}</h2>
                    </div>
                    <div className="card-body costum">{item.content}</div>
                  </div>
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Mode Desktop: Grid Layout
          <div className="row justify-content-center">
            {cardContent.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow desktop">
                  <div className="card-header">
                    <h2 className="card-title text-center">{item.title}</h2>
                  </div>
                  <div className="card-body costum">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default VisiMisiTujuan;
