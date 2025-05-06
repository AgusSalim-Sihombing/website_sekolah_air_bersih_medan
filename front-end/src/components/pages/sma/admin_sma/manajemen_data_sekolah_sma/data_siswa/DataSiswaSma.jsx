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
    const [formData, setFormData] = useState({
        nama: "",
        nis: "",
        jenis_kelamin: "",
        kelas: "",
        tanggal_lahir: "",
        alamat: "",
    })

    useEffect(() => {
        getDataSiswaSma();
    }, []);

    const getDataSiswaSma = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-sma/get-siswa-sma`, {
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

        try {
            await axios.post("http://localhost:3001/api/admin-sma/upload-excel-sma", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            // const response = await axios.post(`${API_BASE_URL}/admin-sma/upload-excel-sma`, formData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });

            alert("Upload sukses!");
            getDataSiswaSma();
        } catch (error) {
            console.error("Upload error:", error);
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

    const handleEdit = (siswaSma) => {
        setSelectedDataSma(siswaSma);
        setFormData({
            nama: siswaSma.nama,
            nis: siswaSma.nis,
            jenis_kelamin: siswaSma.jenis_kelamin,
            kelas: siswaSma.kelas,
            tanggal_lahir: siswaSma.tanggal_lahir,
            alamat: siswaSma.alamat,
        });
        setShowModal(true);
    }

    const handleDelete = async (id, nama) => {
        const confirmDelete = window.confirm(
            `⚠️ Anda akan menghapus data siswa:\n\n"${nama}"\n\nData yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?`
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_BASE_URL}/admin-sma/siswa-sma/${id}`);
            alert(`✅ Data siswa "${nama}" berhasil dihapus!`);
            getDataSiswaSma();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
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
            await axios.delete(`${API_BASE_URL}/admin-sma/delete-all-data-siswa`);
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

        // Ubah data sebelum dikonversi ke Excel
        const formattedData = data.map(item => ({
            ID: item.id,
            Nama: item.nama,
            NIS: item.nis,
            "Jenis Kelamin": item.jenis_kelamin,
            Kelas: item.kelas,
            "Tanggal Lahir": formatDate(item.tanggal_lahir), // Format tanggal sebelum masuk ke Excel
            Alamat: item.alamat
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Format kolom Tanggal Lahir sebagai date di Excel
        const wscols = [
            { wch: 5 },  // ID
            { wch: 20 }, // Nama
            { wch: 12 }, // NIS
            { wch: 15 }, // Jenis Kelamin
            { wch: 10 }, // Kelas
            { wch: 15 }, // Tanggal Lahir
            { wch: 30 }  // Alamat
        ];
        ws["!cols"] = wscols;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "DataSiswa");

        // Simpan file dengan nama berdasarkan kelas
        XLSX.writeFile(wb, `data-siswa-sma.xlsx`);
    };



    return (
        <div>
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "65px", marginBottom: "30px" }}>Manajemen Data Sekolah SMA</h4>
            <DataSiswaSMA />
            <h4 style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "30px" }}>Upload Data Siswa SMA</h4>

            <div style={{
                justifyContent: "space-between",
                display: "flex",
                margin: "20px"
            }}>
                <div>
                    <input type="file" accept=".xlsx" onChange={handleFileChange} />
                    <button onClick={handleUpload} style={{ borderRadius: "5px", color: "" }}>Upload File</button>
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
                        <option value="X_IPA">X - IPA</option>
                        <option value="X_IPS">X - IPS</option>
                        <option value="XI_IPA">XI - IPA</option>
                        <option value="XI_IPS">XI - IPS</option>
                        <option value="XII_IPA">XII - IPA</option>
                        <option value="XII_IPS">XII - IPS</option>
                    </Form.Select>
                    <button onClick={handleDeleteAllData} style={{ borderRadius: "5px", color: "white", backgroundColor: "red", border: "none" }}>Bersihkan Semua Data</button>
                    <Icon.FiletypeXlsx
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={handleDownloadExcel}
                        title="Download Excel"
                    />
                </div>

            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Nis</th>
                        <th>Jenis kelamin</th>
                        <th>Kelas</th>
                        <th>Tanggal Lahir</th>
                        <th>Alamat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((siswa) => (
                        <tr key={siswa.id}>
                            <td className="border p-2">{siswa.id}</td>
                            <td className="border p-4">{siswa.nama}</td>
                            <td className="border p-2">{siswa.nis}</td>
                            <td className="border p-2">{siswa.jenis_kelamin}</td>
                            <td className="border p-2">{siswa.kelas}</td>
                            <td className="border p-2">{siswa.tanggal_lahir ? format(new Date(siswa.tanggal_lahir), "dd-MMMM-yyyy", { locale: idLocale }) : "-"}</td>
                            <td className="border p-2">{siswa.alamat}</td>
                            <td className="border p-2">
                                <div>
                                    <Button variant="primary" className="mx-1" onClick={() => handleEdit(siswa)}>
                                        <Icon.Pen />
                                    </Button>

                                    <Button variant="danger" onClick={() => handleDelete(siswa.id, siswa.nama)}>
                                        <Icon.Trash />
                                    </Button>
                                </div>
                            </td>
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
                                <option value="X_IPA">X - IPA</option>
                                <option value="X_IPS">X - IPS</option>
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