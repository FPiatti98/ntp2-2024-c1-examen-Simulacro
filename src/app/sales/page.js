"use client"
import { useEffect, useState } from "react"

const Sales = () => {

    const [firstHundred, setFirstHundred] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://salesbackend.azurewebsites.net/api/sales")
            .then((res) => res.json())
            .then(data => {
                const dataFound = data.slice(0, 100);
                if(dataFound) {
                    setFirstHundred(dataFound)
                } else {
                    console.error("Error al obtener las ventas");
                }
                setLoading(false)
            })
            .catch(error => {
                console.error("Error en el request:", error);
                setLoading(false);
            })
    }, [])

    if(loading) {
        return <h2>Cargando...</h2>
    }

    if(!firstHundred) {
        return <h2>No se encontraron ventas</h2>
    }

    return (
        <>
            <h1>Primeras 100 ventas</h1>
            <ul>
                {firstHundred.map((sale, index) => (
                    <li key={index} style={{ listStyleType: 'none', marginBottom: '20px' }}>
                        <h2>Venta número: {index + 1}</h2>
                        <div>
                            <p><strong>Fecha de venta:</strong> {sale?.saleDate}</p>
                            <p><strong>Localización del depósito:</strong> {sale?.storeLocation}</p>
                            <p><strong>Método de compra:</strong> {sale?.purchaseMethod}</p>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>


        </>
    )
}

export default Sales;