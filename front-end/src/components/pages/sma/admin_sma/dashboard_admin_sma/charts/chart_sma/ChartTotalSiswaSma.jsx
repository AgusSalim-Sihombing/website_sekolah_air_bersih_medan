import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { io } from "socket.io-client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
const APP_SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL

import TotalSiswaTable from './TableTotalSiswaTahunan';

const socket = io(APP_SOCKET_URL);

const PerkembanganSiswa = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTotalSiswa();

        // Listen update data dari WebSocket
        socket.on("updateData", (newData) => {
            updateChartData(newData);
        });

        return () => {
            socket.off("updateData");
        };
    }, []);

    // const getTotalSiswa = async () => {

    //     try {
    //         const response = await axios.get("http://localhost:3001/api/admin/total-siswa-tahunan");
    //         updateChartData(response.data);
    //     } catch (error) {
    //         console.error("Gagal mengambil data:", error);
    //     }
    // };

    const updateChartData = (data) => {
        // Format untuk chartnya
        const formattedData = data
            .filter((item) => item.is_active)
            .map((item) => ({
                name: item.tahun,
                lakiLaki: item.laki_laki,
                perempuan: item.perempuan
            }));

        setData(formattedData);
    }





    return (
        <div>
            <div className='chart-title'>
                Perkembangan Siswa/i Setiap Tahun
            </div>

            <Container>
                <Row>
                    <Col>
                        <div className="chart-aligment">
                            <BarChart
                                barSize={40}
                                width={550}
                                height={300}
                                data={data}

                            >

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lakiLaki" name="Laki-Laki" fill="rgba(0, 63, 114, 1)" activeBar={<Rectangle fill="rgba(0, 63, 114, 1)" />} />

                            </BarChart>
                        </div>
                    </Col>
                    
                    <Col>
                        <div className="chart-aligment">
                            <BarChart
                                barSize={40}
                                width={550}
                                height={300}
                                data={data}

                            >

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar dataKey="perempuan" name="Perempuan" fill="rgba(0, 63, 114, 1)" activeBar={<Rectangle fill="rgba(0, 63, 114, 1)" />} />
                            </BarChart>
                        </div>
                    </Col>
                </Row>

            </Container>
            <TotalSiswaTable />
        </div>

    );
}

export default PerkembanganSiswa;

