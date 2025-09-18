// import React from 'react';
// import { Image } from 'react-bootstrap';
// import Foto from "../../../../../assets/foto_Kepala_sekolahSma.jpg"
// import "../../../../../styles/pages/sma/dashboard_sma/kata_sambutan/KataSambutan.css"

// const KataSambutan =() => {



//     const sambutan = "Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya sehingga kami dapat menghadirkan website ini sebagai sarana informasi dan komunikasi untuk seluruh siswa, orang tua, guru, serta masyarakat umum. Website ini dirancang untuk menjadi jendela yang memberikan gambaran keunggulan, visi, misi, dan berbagai aktivitas yang kami lakukan demi mewujudkan pendidikan berkualitas dengan nilai-nilai Kristiani. Sebagai Kepala Sekolah SMP Swasta Advent Air Bersih Medan, saya berkomitmen untuk terus mendukung perkembangan sekolah ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin memberikan kemudahan bagi seluruh pengunjung untuk: ";


//     const maxLength = 800;
//     const isLongText = sambutan.length > maxLength;
//     const shortText = isLongText ? sambutan.slice(0, maxLength) + "..." : sambutan;


//     return (

//         <div className='kata-sambutan'>
//             <div className='image'>
//                 <Image
//                     src={Foto}
//                     fluid="true"
//                     rounded="true"
//                     thumbnail="true"
                    
//                 />
//                 <h4>Kepala Sekolah</h4>
//             </div>
           
//             <div className='teks-kata-sambutan'>
//                 <h2>Kata Sambutan Kepala Sekolah</h2>
//                 <div className='kata-sambutan1'>
//                     <p>{shortText}</p>

//                     {/* Tombol "Selengkapnya" jika teks terlalu panjang */}
//                     {isLongText && (
//                         <div >
//                             <a
//                                 href="/sma/kata-sambutan"
//                                 className="selengkapnya"
//                             >
//                                 Baca Selengkapnya &gt;
//                             </a>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default KataSambutan;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const KataSambutan = () => {
  const [sambutan, setSambutan] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState("");

  useEffect(() => {
    fetchSambutan();
  }, []);

  const fetchSambutan = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin-sma/get-kata-sambutan-sma`);
      setNamaKepsek(res.data.nama_kepala_sekolah || "");
      setSambutan(res.data.sambutan || "");
      if (res.data.foto_kepala) {
        setFotoKepsek(`data:image/jpeg;base64,${res.data.foto_kepala}`);
      }
    } catch (err) {
      console.error("Gagal mengambil kata sambutan:", err);
    }
  };

  const truncateText = (text, maxLength = 500) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={4} className="text-center mb-4 mb-md-0">
          {fotoKepsek && (
            <Image
              src={fotoKepsek}
              fluid
              rounded
              style={{ maxHeight: "300px", borderRadius: "12px" }}
            />
          )}
          <h5 className="mt-3">{namaKepsek}</h5>
          <p className="text-muted">Kepala Sekolah SMA</p>
        </Col>
        <Col md={8}>
          <h3 className="mb-3">Kata Sambutan Kepala Sekolah SMA</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: truncateText(sambutan),
            }}
            style={{
              textAlign:"justify"
            }}
          ></div>
          <Button variant="outline-primary" className="mt-3" href="/sma/kata-sambutan">
            Baca Selengkapnya &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default KataSambutan;
