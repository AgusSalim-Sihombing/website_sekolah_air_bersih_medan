import React, { useState, useEffect, PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
} from 'recharts';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { io } from 'socket.io-client';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
const APP_SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL

const socket = io(APP_SOCKET_URL);

const GrafikTotalSiswaBulanan = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();

        // Listen update data dari websocket
        socket.on("updateDataSma", (newData) => {
            formatChartData(newData);
        });
        return () => {
            socket.off("updateDataSma");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-sma/total-sma-bulanan`);
            formatChartData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
            alert("Terjadi kesalahan saat mengambil data. Silakan reload halaman.");
        }
    };


    const formatChartData = (data) => {
        const formattedData = {};
        //  let totalKumulatif = 0; // Untuk menghitung jumlah total siswa yang bertambah setiap tahun

        data.forEach((item) => {
            const bulan = `Bulan ${item.bulan}`;

            if (!formattedData[bulan]) {
                formattedData[bulan] = {
                    name: bulan,
                    totalSiswa: 0,
                    totalLakiLaki: 0,
                    totalPerempuan: 0,
                    // totalKumulatif: 0,
                };
            }

            formattedData[bulan].totalLakiLaki += item.jumlah_laki_laki;
            formattedData[bulan].totalPerempuan += item.jumlah_perempuan;
            formattedData[bulan].totalSiswa += item.jumlah_laki_laki + item.jumlah_perempuan;

            // totalKumulatif += item.jumlah_laki_laki + item.jumlah_perempuan;
            // formattedData[bulan].totalKumulatif = totalKumulatif;
        });

        setData(Object.values(formattedData));
    };

    return (

        <div style={{ marginTop: "60px", marginBottom: "30px" }}>

            <Container>
                <h3 className='chart-title'>Perkembangan Total Siswa per Bulan Tahun 2024</h3>
                <Row>
                    <Col>
                        <ComposedChart width={window.innerWidth - 350} height={400} data={data} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            {/* Bar Chart: Total siswa */}
                            <Bar dataKey="totalSiswa" name="Total Siswa" fill="rgb(2, 105, 190)" />

                            {/* Line Chart: Total Laki-laki & Perempuan */}
                            <Line type="monotone" dataKey="totalLakiLaki" stroke="red" name="Total Laki-Laki" />
                            <Line type="monotone" dataKey="totalPerempuan" stroke="gold" name="Total Perempuan" />

                            {/* Scatter Chart: Jumlah siswa yang bertambah setiap tahun */}
                            {/* <Scatter dataKey="totalKumulatif" fill="red" name="Kumulatif Siswa" /> */}
                        </ComposedChart>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GrafikTotalSiswaBulanan;
