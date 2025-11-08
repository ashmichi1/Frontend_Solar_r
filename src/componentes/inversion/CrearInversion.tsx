import  { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import "./CrearInversion.css";
import NavBar from "../navegacion/NavBarInv";

export default function CrearInversion() {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const nombreProyecto = state?.nombre;

   const [cantidad, setCantidad] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inversionistaId = localStorage.getItem("user_id");
    console.log("Inversionista ID:", inversionistaId);

    if (!inversionistaId) {
      alert("No se encontró el inversionista logueado.");
      return;
    }

     const response=await fetch(`http://localhost:3000/inversionistas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        proyecto_id: id,
        usuario_id: inversionistaId,
        cantidad: Number(cantidad)
      })
    });

   if (!response.ok) throw new Error("Error registrar inversion.");

    alert("Inversión registrada ✅");
    navigate("/inversion/lista");
  };

   return (
    <>
      {/* ✅ Barra de navegación */}
      <NavBar />

      {/* ✅ Contenedor ajustado con margen superior */}
      <div className="detalle-container" style={{ marginTop: "0px" }}>
        <Link to="/proyectos/busqueda" className="volver-btn">
          ⬅ Volver
        </Link>

        <h1 className="titulo-detalle">Nueva Inversión</h1>
        <h2 className="subtitulo">{nombreProyecto}</h2>

        <form className="form-inversion" onSubmit={handleSubmit}>
          <label>Cantidad a invertir (COP)</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />

          <button type="submit" className="btn-registrar">
            💸 Registrar Inversión
          </button>
        </form>
      </div>
    </>
  );

}