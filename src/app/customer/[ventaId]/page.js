"use client"
import { useState, useEffect } from "react";

const Customer = ({ params }) => {
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
    return <h2>Cargando información del cliente...</h2>;
  }

  if (!venta || !venta.customer) {
    return <h2>No se encontró información del cliente.</h2>;
  }

  const { customer: Customer } = venta;

  return (
    <>
      <h1>Información del cliente</h1>
      <div>
        <h2>Email del cliente: {Customer.email}</h2>
        <h2>Edad: {Customer.age}</h2>
        <h2>Género: {Customer.gender}</h2>
        <h2>Nivel de satisfacción: {Customer.satisfaction}</h2>
        {Customer.couponUsed ? (
          <h2>Se usó un cupón</h2>
        ) : (
          <h2>No se usó un cupón</h2>
        )}
      </div>
    </>
  );
};

export default Customer;
