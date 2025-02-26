import React from 'react';
import { Image } from 'react-bootstrap';
import Foto from "../../../../../assets/foto_Kepala_sekolahSma.jpg"
import "../../../../../styles/pages/sma/dashboard_sma/kata_sambutan/DetailKataSambutan.css"


const DetailKataSambutan = () => {
    return (
        <div>
            <div className='judul'>Kata Sambutan Kepala Sekolah</div>
            <div className='image-padding'>
                <div className='image-detail'></div>
                <div className='background'></div>
            </div>
            <div className='detail-kata-sambutan'>
                <p>
                    Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya
                    sehingga kami dapat menghadirkan website ini sebagai sarana
                    informasi dan komunikasi untuk seluruh siswa, orang tua, guru,
                    serta masyarakat umum. Website ini dirancang untuk menjadi jendela
                    yang memberikan gambaran <span style={{ fontWeight: 'bold' }}>keunggulan, visi, misi, dan berbagai
                        aktivitas </span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan
                    nilai-nilai Kristiani. <br /> <br />
                    Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMP Swasta Advent Air Bersih Medan</span>,
                    saya berkomitmen untuk terus mendukung perkembangan sekolah
                    ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara
                    akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan,
                    tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin
                    memberikan kemudahan bagi seluruh pengunjung untuk:
                    <ul>
                        <li>
                            <p><span style={{ fontWeight: 'bold' }} >Mengakses Informasi</span> tentang program sekolah, prestasi siswa, jadwal kegiatan, dan pengumuman penting lainnya.</p>
                        </li>
                        <li>
                            <p><span style={{ fontWeight: 'bold' }} >Menjalin komunikasi interaktif </span> dengan pihak sekolah untuk meningkatkan sinergi dalam mendukung perkembangan siswa.</p>
                        </li>
                        <li>
                            <p><span style={{ fontWeight: 'bold' }} >Mengenal lebih dekat </span> lingkungan belajar yang kami bangun dengan penuh kasih dan dedikasi.</p>
                        </li>
                    </ul>
                    Kami mengundang semua pihak untuk terus mendukung dan berkontribusi dalam perjalanan pendidikan di SMP Swasta Advent Air Bersih Medan. Mari bersama-sama kita wujudkan generasi muda yang cerdas, beriman, dan berbudi pekerti luhur.
                    Akhir kata, semoga website ini dapat memberikan manfaat yang besar bagi seluruh keluarga besar sekolah dan masyarakat luas. Tuhan memberkati kita semua.<br/>
                    <span style={{fontWeight:"bold"}}>Hormat kami</span>,<br/> Hendra Manullang,ST.h<br/> Kepala Sekolah <br/>SMP Swasta Advent Air Bersih Medan

                </p>
            </div>
        </div>




        // <div className='bg-image'>

        //      <div className='teks-katasambutan'>
        //         <h2>Kata Sambutan Kepala Sekolah SMA</h2>
        //         <div className='kata-sambutan1'>
        //             <p>
        //                 Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya
        //                 sehingga kami dapat menghadirkan website ini sebagai sarana
        //                 informasi dan komunikasi untuk seluruh siswa, orang tua, guru,
        //                 serta masyarakat umum. Website ini dirancang untuk menjadi jendela
        //                 yang memberikan gambaran <span style={{ fontWeight: 'bold' }}>keunggulan, visi, misi, dan berbagai
        //                     aktivitas </span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan
        //                 nilai-nilai Kristiani. <br /> <br />
        //                 Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMP Swasta Advent Air Bersih Medan</span>,
        //                 saya berkomitmen untuk terus mendukung perkembangan sekolah
        //                 ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin memberikan kemudahan bagi seluruh pengunjung untuk:

        //             </p>
        //         </div>
        //         <div className='selengkapnya bg-gradient-to-b from-white/70 to-transparent backdrop-blur-md'>
        //             <a href="#" className='teks-selengkapnya'>Selengkapnya &gt;</a>
        //         </div>


        //     </div>



        // <Container className="mt-5" >
        //     <Row>
        //         <Col md={3} style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        //             <Image
        //                 src={Foto}
        //                 fluid="true"
        //                 rounded="true"
        //                 thumbnail="true"
        //             />
        //             <h4>Kepala Sekolah SMA</h4>
        //         </Col>
        //         <Col md={9}>
        //             <h2>Kata Sambutan Kepala Sekolah SMA</h2>
        //             <div className='kata-sambutan1'>
        //                 <p>
        //                     Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya
        //                     sehingga kami dapat menghadirkan website ini sebagai sarana
        //                     informasi dan komunikasi untuk seluruh siswa, orang tua, guru,
        //                     serta masyarakat umum. Website ini dirancang untuk menjadi jendela
        //                     yang memberikan gambaran <span style={{ fontWeight: 'bold' }}>keunggulan, visi, misi, dan berbagai
        //                         aktivitas </span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan
        //                     nilai-nilai Kristiani. <br /> <br />
        //                     Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMP Swasta Advent Air Bersih Medan</span>,
        //                     saya berkomitmen untuk terus mendukung perkembangan sekolah
        //                     ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin memberikan kemudahan bagi seluruh pengunjung untuk:

        //                 </p>
        //             </div>
        //             <div className='selengkapnya'>
        //                 <a href="#">Selengkapnya &gt;</a>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>

    );
}

export default DetailKataSambutan;