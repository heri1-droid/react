import React, {useEffect, useState} from "react"
import axios from 'axios'

export  default function List() {
     // state mahasiswa
    const [mahasiswa, setMahasiswa] = useState([]);

    useEffect( () => {
        axios
        .get("https://academic-mi5a.vercel.app/api/api/mahasiswa")
        .then( (response) => {
            console.log(response);
            setMahasiswa(response.data.data)
        })
    }, [] )

    return (
        <>
            <h2>List Mahasiswa</h2>
            <table className="table">
                <thead>
                    <tr>
                    {/* "npm": "2226250001",
      "nama": "Raymond Indrawan Silalahi",
      "tanggal_lahir": "2000-01-01",
      "tempat_lahir": "Palembang",
      "email": "raymond@test.com",
      "hp": "0812",
      "alamat": "Jalan Rajawali",
      "prodi_id": "c2d936a9-7014-11ef-bdc2-a8a1598fdbd1", */}
                        <th>npm</th>
                        <th>Nama</th>
                        <th>Tanggal lahir</th>
                        <th>Tempat lahir</th>
                        <th>email</th>
                        <th>hp</th>
                        <th>alamat</th>
                        <th>prodi</th>
                        <th>Fakultas</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map( (data) => (
                        <tr key={data.id}>
                            <td>{data.npm}</td>
                            <td>{data.nama}</td>
                            <td>{data.tanggal_lahir}</td>
                            <td>{data.tempat_lahir}</td>
                            <td>{data.email}</td>
                            <td>{data.hp}</td>
                            <td>{data.alamat}</td>
                            <td>{data.prodi.nama}</td>
                            <td>{data.prodi.fakultas.nama}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}