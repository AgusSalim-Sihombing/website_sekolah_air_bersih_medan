import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Image } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const GuruTendikAdmin = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);


    const [formData, setFormData] = useState({
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        gender: "",
        jabatan: "",
        status: "",
        tmt: "",
        masa_kerja: "",
        mapel_dampu: "",
        jumlah_jam: "",
        ijazah: "",
        jurusan: "",
        tamat_tahun: "",
        foto: null
    });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/public/guru-tendik`);
            setData(res.data);
        } catch (err) {
            console.error("Gagal memuat data:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "foto") {
            const file = files[0];
            setFormData({ ...formData, foto: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewFoto(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewFoto(null);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key]);
            }

            if (editMode) {
                await axios.put(`${API_URL}/public/guru-tendik/${editId}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                window.confirm("Data Berhasil di Update")
            } else {
                await axios.post(`${API_URL}/public/guru-tendik`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                window.confirm("Data Berhasil di Tambah")
            }

            fetchData();
            setShowForm(false);
            resetForm();
            setEditMode(false);
            setEditId(null);
        } catch (err) {
            console.error("Gagal menyimpan data:", err);
        }
    };

    const startEdit = (item) => {
        setFormData({
            nama: item.nama,
            tempat_lahir: item.tempat_lahir,
            tanggal_lahir: item.tanggal_lahir ? item.tanggal_lahir.substr(0, 10) : "",
            gender: item.gender,
            jabatan: item.jabatan,
            status: item.status,
            tmt: item.tmt ? item.tmt.substr(0, 10) : "",
            masa_kerja: item.masa_kerja,
            mapel_dampu: item.mapel_dampu,
            jumlah_jam: item.jumlah_jam,
            ijazah: item.ijazah,
            jurusan: item.jurusan,
            tamat_tahun: item.tamat_tahun,
            foto: null
        });
        setPreviewFoto(`${API_URL}/public/guru-tendik/foto/${item.id}`);
        setEditId(item.id);
        setEditMode(true);
        setShowForm(true);
    };



    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus data ini?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/public/guru-tendik/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus data:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            nama: "",
            tempat_lahir: "",
            tanggal_lahir: "",
            gender: "",
            jabatan: "",
            status: "",
            tmt: "",
            masa_kerja: "",
            mapel_dampu: "",
            jumlah_jam: "",
            ijazah: "",
            jurusan: "",
            tamat_tahun: "",
            foto: null
        });
        setPreviewFoto(null);
    };



    return (
        <div className="p-4">
            <h3>Manajemen Guru & Tendik</h3>
            <Button className="mb-3" onClick={() => { setShowForm(true); setEditMode(false); resetForm(); }}>
                Tambah Data
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nama</th>
                        <th>Tempat Lahir</th>
                        <th>Tanggal Lahir</th>
                        <th>JK</th>
                        <th>Jabatan</th>
                        <th>Status</th>
                        <th>TMT</th>
                        <th>Masa Kerja</th>
                        <th>Mapel</th>
                        <th>Jumlah Jam</th>
                        <th>Ijazah</th>
                        <th>Jurusan</th>
                        <th>Tamat Tahun</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.id ? (
                                    <img
                                        src={`${API_URL}/public/guru-tendik/foto/${item.id}`}
                                        alt="Foto"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                ) : "-"}
                            </td>
                            <td>{item.nama}</td>
                            <td>{item.tempat_lahir}</td>
                            <td>{item.tanggal_lahir ? format(new Date(item.tanggal_lahir), "dd MMMM yyy", {locale : idLocale}) : "-"}</td>
                            <td>{item.gender}</td>
                            <td>{item.jabatan}</td>
                            <td>{item.status}</td>
                            <td>{item.tmt ? format(new Date(item.tmt), "dd MMMM yyy", {idLocale : idLocale}) : "-"}</td>
                            <td>{item.masa_kerja}</td>
                            <td>{item.mapel_dampu}</td>
                            <td>{item.jumlah_jam}</td>
                            <td>{item.ijazah}</td>
                            <td>{item.jurusan}</td>
                            <td>{item.tamat_tahun}</td>
                            <td>
                                <Button size="sm" variant="primary" onClick={() => startEdit(item)}>Edit</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Data" : "Tambah Data"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" name="nama" value={formData.nama} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Tempat Lahir</Form.Label>
                            <Form.Control type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="">Pilih</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control type="text" name="jabatan" value={formData.jabatan} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" value={formData.status} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>TMT</Form.Label>
                            <Form.Control type="date" name="tmt" value={formData.tmt} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Masa Kerja</Form.Label>
                            <Form.Control type="text" name="masa_kerja" value={formData.masa_kerja} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Mata Pelajaran Dampu</Form.Label>
                            <Form.Control type="text" name="mapel_dampu" value={formData.mapel_dampu} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Jumlah Jam</Form.Label>
                            <Form.Control type="number" name="jumlah_jam" value={formData.jumlah_jam} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Ijazah Pendidikan</Form.Label>
                            <Form.Control type="text" name="ijazah" value={formData.ijazah} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Control type="text" name="jurusan" value={formData.jurusan} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Tamat Tahun</Form.Label>
                            <Form.Select name="tamat_tahun" value={formData.tamat_tahun} onChange={handleInputChange}>
                                <option value="">Pilih Tahun</option>
                                {Array.from({ length: 50 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control type="file" name="foto" onChange={handleInputChange} accept="image/*" />
                        </Form.Group>
                        {previewFoto && (
                            <div className="mb-3">
                                <p>Preview Foto:</p>
                                <img
                                    src={previewFoto}
                                    alt="Preview"
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                />
                            </div>
                        )}

                        <Button type="submit" variant="success">{editMode ? "Update" : "Simpan"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GuruTendikAdmin;
