import React from 'react';
import { Image } from 'react-bootstrap';
import Foto from "../../../../../assets/foto_Kepala_sekolahSma.jpg"
import "../../../../../styles/pages/sma/dashboard_sma/kata_sambutan/KataSambutan.css"

const KataSambutan =() => {



    const sambutan = "Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya sehingga kami dapat menghadirkan website ini sebagai sarana informasi dan komunikasi untuk seluruh siswa, orang tua, guru, serta masyarakat umum. Website ini dirancang untuk menjadi jendela yang memberikan gambaran keunggulan, visi, misi, dan berbagai aktivitas yang kami lakukan demi mewujudkan pendidikan berkualitas dengan nilai-nilai Kristiani. Sebagai Kepala Sekolah SMP Swasta Advent Air Bersih Medan, saya berkomitmen untuk terus mendukung perkembangan sekolah ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.Melalui website ini, kami juga ingin memberikan kemudahan bagi seluruh pengunjung untuk: ";


    const maxLength = 800;
    const isLongText = sambutan.length > maxLength;
    const shortText = isLongText ? sambutan.slice(0, maxLength) + "..." : sambutan;


    return (

        <div className='kata-sambutan'>
            <div className='image'>
                <Image
                    src={Foto}
                    fluid="true"
                    rounded="true"
                    thumbnail="true"
                    
                />
                <h4>Kepala Sekolah</h4>
            </div>
           
            <div className='teks-kata-sambutan'>
                <h2>Kata Sambutan Kepala Sekolah</h2>
                <div className='kata-sambutan1'>
                    <p>{shortText}</p>

                    {/* Tombol "Selengkapnya" jika teks terlalu panjang */}
                    {isLongText && (
                        <div >
                            <a
                                href="/sma/kata-sambutan"
                                className="selengkapnya"
                            >
                                Baca Selengkapnya &gt;
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default KataSambutan;