"use client"
import { useState, useEffect } from "react";

const Products = ({ params }) => {
  const { ventaId } = params;
  const [venta, setVenta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://salesbackend.azurewebsites.net/api/sales")
      .then((res) => res.json())
      .then((data) => {
        const foundVenta = data.find((venta) => venta._id === ventaId);

        if (foundVenta) {
          setVenta(foundVenta);
        } else {
          console.error("Venta not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en el request:", error);
        setLoading(false);
      });
  }, [ventaId]);

  if (loading) {
    return <h2>Cargando lista de productos...</h2>;
  }

  if (!venta || !venta.customer) {
    return <h2>No se encontró la lista de productos.</h2>;
  }

  return (
    <>
      {
        venta.items.map((product, index) => (
          <div key={index}>
            <p>Nombre: {product.name}</p>
            <p>Precio: {product.price.$numberDecimal}</p>
            <p>Cantidad: {product.quantity}</p>
          </div>
        ))
      }
    </>
  );
};

export default Products;
