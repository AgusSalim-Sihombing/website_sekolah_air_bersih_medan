import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons"
import * as XLSX from "xlsx";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DataKelasSma = () => {

    const { kelas } = useParams();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null)
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

    })

    const getDataSiswaSma = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-sma/siswa-sma/${kelas}`);
            console.log
            // setData(response.data)
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {

            console.error("Gagal mengambil data event :", error)
        }
    }


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (siswaSma) => {
        setSelectedData(siswaSma);
        setFormData({
            nama: siswaSma.nama,
            nis: siswaSma.nis,
            jenis_kelamin: siswaSma.jenis_kelamin,
            kelas: siswaSma.kelas,
            tanggal_lahir: siswaSma.tanggal_lahir,
            alamat: siswaSma.alamat,
        });
        setShowEditModal(true);
    }

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
            await axios.put(`http://localhost:3001/api/admin-sma/siswa-sma/${selectedData.id}`, updateData);
            setShowEditModal(false);
            alert("Data berhasil di update :)")
            getDataSiswaSma()
        } catch (error) {
            console.error("Gagal memperbaharui data siswa :", error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data siswa ini ?")) {
            try {
                await axios.delete(`http://localhost:3001/api/admin-sma/siswa-sma/${id}`);
                getDataSiswaSma();
            } catch (error) {
                console.error("Gagal menghapus data siswa :", error)
            }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
    };

    const handleDownloadCSV = () => {
        if (data.length === 0) return;

        const csvHeader = "ID,Nama,NIS, Jenis Kelamin, Kelas, Tanggal Lahir, Alamat\n";
        const csvRows = data.map(item =>
            `${item.id},"${item.nama}","${item.nis}","${item.jenis_kelamin}","${item.kelas}","${formatDate(item.tanggal_lahir)}" ,"${item.alamat}"`
        );

        const csvContent = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `data-siswa-${kelas}.csv`;
        link.click();
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
        XLSX.writeFile(wb, `data-siswa-${kelas}.xlsx`);
    };

    const filteredData = data.filter(siswa =>
        siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="p-4">

            <h2 className="text-xl font-bold mb-3">Data Siswa {kelas}</h2>
            <div style={{ display: "flex", gap: "20px", padding: "10px", justifyContent: "end" }}>
                <Form.Control
                    type="text"
                    placeholder="Cari Nama Siswa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "250px" }}
                />
                Unduh Data Siswa:
                <Icon.FiletypeCsv
                    size={24}
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={handleDownloadCSV}
                    title="Download CSV"
                />

                <Icon.FiletypeXlsx
                    size={24}
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={handleDownloadExcel}
                    title="Download Excel"
                />

            </div>
            <Table>
                <thead>
                    <tr className="bg-grey-800">
                        <th className="border p-2">ID</th>
                        <th className="border p-4">Nama</th>
                        <th className="border p-2">Nis</th>
                        <th className="border p-2">Jenis Kelamin</th>
                        <th className="border p-2">Kelas</th>
                        <th className="border p-2">Tanggal Lahir</th>
                        <th className="border p-2">Alamat</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((siswa) => (
                        <tr key={siswa.id} className="text-center">
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

                                    <Button variant="danger" onClick={() => handleDelete(siswa.id)}>
                                        <Icon.Trash />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
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
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default DataKelasSma;
