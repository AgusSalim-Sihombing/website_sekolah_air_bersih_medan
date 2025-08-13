import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import DataSiswaSMA from "./DataSiswaSma2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import Spinner from "react-bootstrap/Spinner";

// import * as XLSX from "xlsx";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DataSiswaSma = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState("");
    const [selectedDataSma, setSelectedDataSma] = useState(null);
    const token = localStorage.getItem("token");
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        nama: "",
        jk: "",
        nisn: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nik: "",
        agama: "",
        alamat: "",
        nama_ayah: "",
        nama_ibu: "",
        kelas: ""
    })

    useEffect(() => {
        getDataSiswaSma();
    }, []);

    const getDataSiswaSma = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/siswa`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true);  // Mulai loading

        try {
            await axios.post(`${API_BASE_URL}/public/siswa`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            alert("Upload sukses!");
            getDataSiswaSma();
            setFile(null); // Reset input file
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload gagal!");
        } finally {
            setIsUploading(false); // Selesai loading
        }
    };

    const handleUpdate = async () => {

        const updateData = {
            nama: formData.nama,
            nis: formData.nis,
            jenis_kelamin: formData.jenis_kelamin,
            kelas: formData.kelas,
            tanggal_lahir: formData.tanggal_lahir,
            alamat: formData.alamat,
        };

        try {
            await axios.put(`http://localhost:3001/api/admin-sma/siswa-sma/${selectedDataSma.id}`, updateData);
            setShowModal(false);
            alert("Data berhasil di update :)")
            getDataSiswaSma()
        } catch (error) {
            console.error("Gagal memperbaharui data siswa :", error)
        }
    }
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };





    const handleDeleteAllData = async () => {
        if (data.length === 0) {
            alert("⚠️ Data sudah kosong! Tidak ada yang bisa dihapus.");
            return;
        }
        const confirmDelete = window.confirm(
            "⚠️ PERINGATAN !!\nSemua data siswa akan dihapus PERMANEN dan tidak dapat dikembalikan. Apakah Anda yakin?"
        );

        if (!confirmDelete) {
            return; // Jika pengguna membatalkan, hentikan proses
        }

        try {
            await axios.delete(`${API_BASE_URL}/public/siswa`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            alert("Semua data berhasil dihapus!");
            getDataSiswaSma();
        } catch (error) {
            console.error("Error deleting all data:", error);
        }
    };

    const filteredData = data.filter(siswa =>
        siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedKelas === "" || siswa.kelas === selectedKelas)

    );

    const formatDate = (dateString) => {
        if (!dateString) return ""; // Jika tanggal kosong, return string kosong
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tambah leading zero jika perlu
        const day = String(date.getDate()).padStart(2, "0"); // Tambah leading zero jika perlu
        return `${year}-${month}-${day}`;
    };

    const handleDownloadExcel = () => {
        if (data.length === 0) return;

        // Ubah data sesuai struktur tabel database
        const formattedData = data.map(item => ({
            ID: item.id,
            Nama: item.nama,
            "Jenis Kelamin": item.jk,
            NIS: item.nis,
            NISN: item.nisn,
            "Tempat Lahir": item.tempat_lahir,
            "Tanggal Lahir": formatDate(item.tanggal_lahir),
            NIK: item.nik,
            Agama: item.agama,
            Alamat: item.alamat,
            "Nama Ayah": item.nama_ayah,
            "Nama Ibu": item.nama_ibu,
            Kelas: item.kelas,
            "Unit Sekolah": item.unit_sekolah
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Format lebar kolom (opsional, bisa disesuaikan)
        const wscols = [
            { wch: 5 },   // ID
            { wch: 20 },  // Nama
            { wch: 12 },  // Jenis Kelamin
            { wch: 15 },  // NIS
            { wch: 15 },  // NISN
            { wch: 20 },  // Tempat Lahir
            { wch: 15 },  // Tanggal Lahir
            { wch: 20 },  // NIK
            { wch: 10 },  // Agama
            { wch: 30 },  // Alamat
            { wch: 20 },  // Nama Ayah
            { wch: 20 },  // Nama Ibu
            { wch: 10 },  // Kelas
            { wch: 15 },  // Unit Sekolah
        ];
        ws["!cols"] = wscols;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "DataSiswa");

        // Simpan file Excel
        XLSX.writeFile(wb, `data-siswa-sma.xlsx`);
    };



    return (
        <div>
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "65px", marginBottom: "30px" }}>Manajemen Data Sekolah SMA</h4>
            <DataSiswaSMA />
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "30px" }}>Upload Data Siswa</h4>

            <div style={{
                justifyContent: "space-between",
                alignItems:"center",
                display: "flex",
                margin: "20px"
            }}>
                <div className="d-flex flex-column p-2 bd-highlight">
                    <input type="file" accept=".xlsx" onChange={handleFileChange} />
                    <button
                        className="mt-1"
                        onClick={handleUpload}
                        style={{ borderRadius: "5px" }}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Mengupload...
                            </>
                        ) : "Upload File"}
                    </button>
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                    <Form.Control
                        type="text"
                        placeholder="Cari Nama Siswa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "250px" }}
                    />
                    <Form.Select
                        value={selectedKelas}
                        onChange={(e) => setSelectedKelas(e.target.value)}
                        style={{ width: "200px" }}
                    >
                        <option value="">Semua Kelas</option>
                        <option value="VII">VII</option>
                        <option value="VIII_A">VIII - A</option>
                        <option value="VIII_B">VIII - B</option>
                        <option value="IX_A">IX - A</option>
                        <option value="IX_B">IX -B</option>
                        <option value="X_1">X - 1</option>
                        <option value="X_2">X - 2</option>
                        <option value="XI_IPA">XI - IPA</option>
                        <option value="XII_IPA">XII - IPA</option>
                        <option value="XII_IPS">XII - IPS</option>
                        <option value="X_TKJ">X - TKJ</option>
                        <option value="XI_TKJ">X - TKJ</option>
                        <option value="XII">XII - SMK</option>

                    </Form.Select>
                    <button onClick={handleDeleteAllData} style={{ borderRadius: "5px", color: "white", backgroundColor: "red", border: "none" }}>Bersihkan Semua Data</button>
                    <div className="d-flex p-2 bd-highlight">
                        <p>Unduh Seluruh Data</p>
                        <Icon.FiletypeXlsx
                            size={24}
                            style={{ cursor: "pointer", color: "#007bff" }}
                            onClick={handleDownloadExcel}
                            title="Download Excel"
                        />
                    </div>
                </div>

            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>NISN</th>
                        <th>Tempat Lahir</th>
                        <th>Tanggal Lahir</th>
                        <th>NIK</th>
                        <th>Agama</th>
                        <th>Alamat</th>
                        <th>Nama Ayah</th>
                        <th>Nama Ibu</th>
                        <th>Kelas</th>
                        <th>Unit</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((siswa) => (
                        <tr key={siswa.id}>
                            <td className="border p-2">{siswa.id}</td>
                            <td className="border p-4">{siswa.nama}</td>
                            <td className="border p-2">{siswa.jk}</td>
                            <td className="border p-2">{siswa.nisn}</td>
                            <td className="border p-2">{siswa.tempat_lahir}</td>
                            <td className="border p-2">{siswa.tanggal_lahir ? format(new Date(siswa.tanggal_lahir), "dd MMMM yyy", { locale: idLocale }) : "-"}</td>
                            <td className="border p-2">{siswa.nik}</td>
                            <td className="border p-2">{siswa.agama}</td>
                            <td className="border p-2">{siswa.alamat}</td>
                            <td className="border p-2">{siswa.nama_ayah}</td>
                            <td className="border p-2">{siswa.nama_ibu}</td>
                            <td className="border p-2">{siswa.kelas}</td>
                            <td className="border p-2">{siswa.unit_sekolah}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nis</Form.Label>
                            <Form.Control type="text" value={formData.nis} onChange={(e) => setFormData({ ...formData, nis: e.target.value })} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <div className="mb-3 p-2">
                                <Form.Check
                                    inline
                                    label="Laki-laki"
                                    type="radio"
                                    name="jenis_kelamin"
                                    value="Laki-Laki"
                                    checked={formData.jenis_kelamin === "Laki-Laki"}
                                    onChange={handleInputChange}
                                />
                                <Form.Check
                                    inline
                                    label="Perempuan"
                                    type="radio"
                                    name="jenis_kelamin"
                                    value="Perempuan"
                                    checked={formData.jenis_kelamin === "Perempuan"}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Kelas</Form.Label>
                            <Form.Select value={formData.kelas} onChange={handleInputChange} name="kelas">
                                <option value="X_1">X - 1</option>
                                <option value="X_2">X - 2</option>
                                <option value="XI_IPA">XI - IPA</option>
                                <option value="XI_IPS">XI - IPS</option>
                                <option value="XII_IPA">XII - IPA</option>
                                <option value="XII_IPS">XII - IPS</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control type="date" value={formData.tanggal_lahir ? format(new Date(formData.tanggal_lahir), "yyyy-MM-dd", { locale: idLocale }) : "-"} onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
                        </Form.Group>

                        {/* <Form.Group>
                                        <Form.Label>Upload Flyer</Form.Label>
                                        <Form.Control type="file" name="flyer" onChange={handleFileChange} />
                                    </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DataSiswaSma;