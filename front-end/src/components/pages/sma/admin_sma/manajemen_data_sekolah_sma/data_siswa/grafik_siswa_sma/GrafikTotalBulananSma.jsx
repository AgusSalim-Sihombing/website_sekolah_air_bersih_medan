import React, { useState, useEffect } from 'react';
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

} from 'recharts';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { io } from 'socket.io-client';


const socket = io("http://localhost:3001");

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
            const response = await axios.get("http://localhost:3001/api/admin-sma/total-sma-bulanan");
            formatChartData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    // const formatChartData = (data) => {
    //     const formattedData = {};

    //     data.forEach((item) => {
    //         const bulan = `Bulan ${item.bulan}-${item.tahun}`;

    //         if (!formattedData[bulan]) {
    //             formattedData[bulan] = { name: bulan };
    //         }

    //         formattedData[bulan][`${item.kelas} Laki-Laki`] = item.jumlah_laki_laki;
    //         formattedData[bulan][`${item.kelas} Perempuan`] = item.jumlah_perempuan;
    //     });

    //     setData(Object.values(formattedData));
    // };

    // const formatChartData = (data) => {
    //     const formattedData = {};

    //     data.forEach((item) => {
    //         const bulan = `Bulan ${item.bulan}-${item.tahun}`;

    //         if (!formattedData[bulan]) {
    //             formattedData[bulan] = { name: bulan };
    //         }

    //         // Total siswa = laki-laki + perempuan
    //         formattedData[bulan][item.kelas] = item.jumlah_laki_laki + item.jumlah_perempuan;
    //     });

    //     setData(Object.values(formattedData));
    // };

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
        // <Container>
        //     <h3 className='chart-title'>Perkembangan Siswa per Bulan</h3>
        //     <Row>
        //         <Col>
        //             <BarChart width={1000} height={400} data={data} barSize={30}>
        //                 <XAxis dataKey="name" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 <Legend />
        //                 <Bar dataKey="X IPA Laki-Laki" fill="rgb(0,0,102)" />
        //                 <Bar dataKey="X IPA Perempuan" fill="rgb(0,0,102)" />
        //                 <Bar dataKey="X IPS Laki-Laki" fill="rgb(0,0,204)" />
        //                 <Bar dataKey="X IPS Perempuan" fill="rgb(0,0,204)" />
        //                 <Bar dataKey="XI IPA Laki-Laki" fill="rgb(0,0,255)" />
        //                 <Bar dataKey="XI IPA Perempuan" fill="rgb(0,0,255)" />
        //                 <Bar dataKey="XI IPS Laki-Laki" fill="rgb(0,102,0)" />
        //                 <Bar dataKey="XI IPS Perempuan" fill="rgb(0,102,0)" />
        //                 <Bar dataKey="XII IPA Laki-Laki" fill="rgb(0,204,0)" />
        //                 <Bar dataKey="XII IPA Perempuan" fill="rgb(0,204,0)" />
        //                 <Bar dataKey="XII IPS Laki-Laki" fill="rgb(0,255,0)" />
        //                 <Bar dataKey="XII IPS Perempuan" fill="rgb(0,255,0)" />
        //             </BarChart>
        //         </Col>
        //     </Row>
        // </Container>
        <div style={{ marginTop: "50px" }}>
            {/* <Container>
                <h3 className='chart-title'>Perkembangan Total Siswa per Bulan</h3>
                <Row>
                    <Col>
                        <BarChart
                        width={1000} 
                        height={400} 
                        data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="X IPA" fill="rgb(0, 0, 80)" />
                            <Bar dataKey="X IPS" fill="rgb(0, 0, 120)" />
                            <Bar dataKey="XI IPA" fill="rgb(0, 0, 150)" />
                            <Bar dataKey="XI IPS" fill="rgb(0, 0, 180)" />
                            <Bar dataKey="XII IPA" fill="rgb(0, 0, 210)" />
                            <Bar dataKey="XII IPS" fill="rgb(0, 0, 250)" />
                        </BarChart>
                    </Col>
                </Row>
            </Container> */}

            {/* Total siswa per bulan */}
            {/* <Container>
                <h3 className='chart-title'>Perkembangan Total Siswa per Bulan</h3>
                <Row>
                    <Col>
                        <ComposedChart
                            width={window.innerWidth - 400}
                            height={400}
                            data={data}
                            barSize={40}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalSiswa" name="Total Siswa" fill="blue" />
                            <Line type="monotone" dataKey="totalSiswa" stroke="#ff7300" name='Total Barang' />
                            <Line type="monotone" dataKey="totalSiswa" stroke="#ff7300" name='Total Barang' />
                            <Scatter dataKey="totalSiswa" fill="red" />
                        </ComposedChart>
                    </Col>
                </Row>
            </Container> */}

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
