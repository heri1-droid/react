/* eslint-disable no-unused-vars */
// src/components/Fakultas/Create.jsx
import React, { useState, useEffect } from "react";

import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateProdi() {
    // Inisialisasi state untuk menyimpan nama fakultas
    const [npmMahasiswa, setNpmMahasiswa] = useState("");
    const [nama, setNama] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [prodi, setProdi] = useState("");
    const [fakultas, setFakultas] = useState("");
  const [fakultasId, setFakultasId] = useState("");

    // Inisialisasi state untuk menyimpan daftar fakultas
    const [fakultasList, setFakultasList] = useState([]);

    const [prodiList, setProdiList] = useState([]);
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProdi = async () => {
            try {
                const response = await axios.get(
                    "https://academic-mi5a.vercel.app/api/api/prodi"
                );
                console.log(response.data);  // Tambahkan log untuk memeriksa struktur data

                // Periksa struktur data yang tepat
                if (response.data && Array.isArray(response.data.data)) {
                    setProdiList(response.data.data);
                } else if (response.data && Array.isArray(response.data.result)) {
                    setProdiList(response.data.result);
                } else {
                    setError("Unexpected data structure");
                }
            } catch (error) {
                setError("Failed to fetch Prodi data");
                console.error(error);
            }
        };

        fetchProdi();
    }, []);

    useEffect(() => {
        const fetchFakultas = async () => {
            try {
                const response = await axios.get(
                    "https://academic-mi5a.vercel.app/api/api/fakultas"
                );
                console.log(response.data);  // Tambahkan log untuk memeriksa struktur data

                // Periksa struktur data yang tepat
                if (response.data && Array.isArray(response.data.data)) {
                    setFakultasList(response.data.data);
                } else if (response.data && Array.isArray(response.data.result)) {
                    setFakultasList(response.data.result);
                } else {
                    setError("Unexpected data structure");
                }
            } catch (error) {
                setError("Failed to fetch fakultas data");
                console.error(error);
            }
        };

        fetchFakultas();
    }, []);

    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman setelah form disubmit
        setError(""); // Reset pesan error sebelum proses
        setSuccess(""); // Reset pesan sukses sebelum proses

        // Validasi input: jika namaFakultas kosong, set pesan error
        if (npmMahasiswa.trim() === "") {
            setError("Npm is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (nama.trim() === "") {
            setError("nama is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (tanggalLahir.trim() === "") {
            setError("tanggal lahir is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (tempatLahir.trim() === "") {
            setError("tempat lahir is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (email.trim() === "") {
            setError("email lahir is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }

        if (hp.trim() === "") {
            setError("nomor hp is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (alamat.trim() === "") {
            setError("alamat is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (prodi.trim() === "") {
            setError("alamat is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }
        if (fakultasId.trim() === "") {
            setError("fakultas is required"); // Set pesan error jika input kosong
            return; // Stop eksekusi fungsi jika input tidak valid
        }

        try {
            // Melakukan HTTP POST request untuk menyimpan data fakultas
            const response = await axios.post(
                "https://academic-mi5a.vercel.app/api/api/mahasiswa", // Endpoint API yang dituju
                {
                    npm: npmMahasiswa, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    nama: nama, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    tanggal_lahir: tanggalLahir, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    tempatLahir: tempatLahir, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    email: email, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    hp: hp, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    alamat: alamat, // Data yang dikirim berupa objek JSON dengan properti 'nama'
                    prodi_id : prodiid,
                    fakultas_id: fakultasId, // Data ID fakultas yang dipilih
                }
            );

            // Jika response HTTP status 201 (Created), berarti berhasil
            if (response.status === 201) {
                // Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Prodi created successfully!");
                setNpmMahasiswa("");
                setNama("");
                setTanggalLahir("");
                setTempatLahir("");
                setEmail("");
                setHp("");
                setProdi("");
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
            <h2 className="mb-4">Create Mahasiswa</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
            {/* Form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>
                {/* Tangani event submit dengan handleSubmit */}
                <div className="mb-3">
                    <label className="form-label">
                        Npm
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="npmMahasiswa"
                        value={npmMahasiswa} // Nilai input disimpan di state namaFakultas
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
