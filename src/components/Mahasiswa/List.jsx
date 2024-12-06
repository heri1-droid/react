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
                        <th>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map( (data) => (
                        <tr key={data.id}>
                            <td>{data.nama}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}