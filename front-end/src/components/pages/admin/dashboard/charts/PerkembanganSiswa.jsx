import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../../../../styles/admin/chart/PerkembanganSiswa.css"



const PerkembanganSiswa = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTotalSiswa();
    }, []);

    const getTotalSiswa = async () => {
        
        try {
            const response = await axios.get("http://localhost:3001/api/admin/total-siswa-tahunan");
            
            if (response.data.length > 0) {
                // Format untuk chartnya
                const formattedData = response.data.map((item) => ({
                    name: item.tahun,
                    lakiLaki: item.laki_laki,
                    perempuan: item.perempuan
                }));

                setData(formattedData);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };


    return (
        <div>
            <div className='chart-title'><h3 >Perkembangan Siswa/i Setiap Tahun</h3>
            </div>

            <Container>
                <Row>
                    <Col>Icon disini Semua nanti ya</Col>
                    <Col><
                        div className="chart-aligment">
                        <BarChart
                            barSize={40}
                            width={700}
                            height={350}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >

                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="lakiLaki" name="Laki-Laki" fill="blue" activeBar={<Rectangle stroke="red" />} />
                            <Bar dataKey="perempuan" name="Perempuan" fill="orange" activeBar={<Rectangle stroke="red" />} />
                        </BarChart>
                    </div>
                    </Col>
                </Row>

            </Container>
        </div>



    );
}

export default PerkembanganSiswa;

