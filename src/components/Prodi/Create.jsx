/* eslint-disable no-unused-vars */
// src/components/Fakultas/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateProdi() {
  // Inisialisasi state untuk menyimpan nama fakultas
  const [namaProdi, setNamaProdi] = useState("");
  const [kaprodi, setKaprodi] = useState("");
  const [singkatan, setSingkatan] = useState("");
  const [fakultasId, setFakultasId] = useState("");

  // Inisialisasi state untuk menyimpan daftar fakultas
  const [fakultasList, setFakultasList] = useState([]);

  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaFakultas kosong, set pesan error
    if (namaProdi.trim() === "") {
      setError("Nama Prodi is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (kaprodi.trim() === "") {
      setError("Kaprodi is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (singkatan.trim() === "") {
      setError("singkatan is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (fakultasId.trim() === "") {
      setError("fakultas is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    useEffect(() => {
      const fetchFakultas = async () => {
        try {
          const response = await axios.get(
            "https://academic-mi5a.vercel.app/api/api/fakultas"
          );
          setFakultasList(response.data.result); // Simpan data fakultas ke dalam state
        } catch (error) {
          setError("Failed to fetch fakultas data");
        }
      };

      fetchFakultas(); // Panggil fungsi untuk mengambil data fakultas
    }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat


        try {
          // Melakukan HTTP POST request untuk menyimpan data fakultas
          const response = await axios.post(
            "https://academic-mi5a.vercel.app/api/api/prodi", // Endpoint API yang dituju
            {
              nama: namaProdi, // Data yang dikirim berupa objek JSON dengan properti 'nama'
              kaprodi: kaprodi, // Data yang dikirim berupa objek JSON dengan properti 'nama'
              singkatan: singkatan, // Data yang dikirim berupa objek JSON dengan properti 'nama'
              fakultas_id: fakultasId, // Data ID fakultas yang dipilih
            }
          );

          // Jika response HTTP status 201 (Created), berarti berhasil
          if (response.status === 201) {
            // Tampilkan pesan sukses jika fakultas berhasil dibuat
            setSuccess("Prodi created successfully!");
            setNamaProdi("");
            setKaprodi("");
            setSingkatan("");
            setFakultasId(""); // Kosongkan dropdown setelah sukses submi
          } else {
            // Jika tidak berhasil, tampilkan pesan error
            setError("Failed to create prodi");
          }
        } catch (error) {
          // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
          setError("An error occurred while creating prodi");
        }
      };


    return (
      <div className="container mt-5">
        <h2 className="mb-4">Create Prodi</h2>
        {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
        {success && <div className="alert alert-success">{success}</div>}
        {/* Form untuk mengisi nama fakultas */}
        <form onSubmit={handleSubmit}>
          {/* Tangani event submit dengan handleSubmit */}
          <div className="mb-3">
            <label className="form-label">
              Nama Prodi
            </label>
            {/* Input untuk nama fakultas dengan class bootstrap */}
            <input
              type="text" className="form-control" id="namaProdi"
              value={namaProdi} // Nilai input disimpan di state namaFakultas
              onChange={(e) => setNamaProdi(e.target.value)} // Update state saat input berubah
              placeholder="Enter Prodi Name" // Placeholder teks untuk input
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Kaprodi
            </label>
            {/* Input untuk nama fakultas dengan class bootstrap */}
            <input
              type="text" className="form-control" id="kaprodi"
              value={kaprodi} // Nilai input disimpan di state namaFakultas
              onChange={(e) => setKaprodi(e.target.value)} // Update state saat input berubah
              placeholder="Enter Kaprodi Name" // Placeholder teks untuk input
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              singkatan
            </label>
            {/* Input untuk nama fakultas dengan class bootstrap */}
            <input
              type="text" className="form-control" id="singkatan"
              value={singkatan} // Nilai input disimpan di state namaFakultas
              onChange={(e) => setSingkatan(e.target.value)} // Update state saat input berubah
              placeholder="Enter Fakultas Name" // Placeholder teks untuk input
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fakultas</label>
            {/* Dropdown untuk memilih fakultas */}
            <select
              className="form-select"
              id="fakultasId"
              value={fakultasId} // Nilai dropdown disimpan di state fakultasId
              onChange={(e) => setFakultasId(e.target.value)} // Update state saat pilihan berubah
            >
              <option value="">Select Fakultas</option>
              {fakultasList.map((fakultas) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {/* Set key dan value untuk masing-masing fakultas */}
                  {fakultas.nama} {/* Nama fakultas sebagai teks di dropdown */}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    );
  }
