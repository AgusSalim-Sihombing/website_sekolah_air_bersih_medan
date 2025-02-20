import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Foto from "../../../../assets/foto_Kepala_sekolahSma.jpg"
import "../../../../styles/pages/sma/dashboard_sma/KataSambutan.css"
function KataSambutan() {
    return (
        <Container className="mt-5" >
            <Row>
                <Col md={6} style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                    <Image src={Foto} fluid />
                    <h4>Kepala Sekolah SMA</h4>
                </Col>
                <Col md={6}>
                    <h2>Kata Sambutan Kepala Sekolah SMA</h2>
                    <div className='kata-sambutan1'>
                        <p>
                            Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya
                            sehingga kami dapat menghadirkan website ini sebagai sarana
                            informasi dan komunikasi untuk seluruh siswa, orang tua, guru,
                            serta masyarakat umum. Website ini dirancang untuk menjadi jendela
                            yang memberikan gambaran <span style={{ fontWeight: 'bold' }}>keunggulan, visi, misi, dan berbagai
                                aktivitas </span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan
                            nilai-nilai Kristiani. <br/> <br/>
                            Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMP Swasta Advent Air Bersih Medan</span>, 
                            saya berkomitmen untuk terus mendukung perkembangan sekolah 
                            ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin memberikan kemudahan bagi seluruh pengunjung untuk:

                        </p>
                    </div>
                    <a href="#">Selengkapnya &gt;</a>
                </Col>
            </Row>
        </Container>
    );
}

export default KataSambutan;