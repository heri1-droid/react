import React, {useEffect, useState} from "react"
import axios from 'axios'

export  default function List() {
    // state fakultas
    const [fakultas, setFakultas] = useState({});

    useEffect( () => {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
        .then( (response) => {
            console.log(response);
            setFakultas(response.data.result)
        })
    } )

    return (
        <>
            <h2>List Fakultas</h2>
        </>
    )
}