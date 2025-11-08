import React, { useEffect, useState } from "react";
import "./InversionesLista.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../navegacion/NavBarInv"; 


interface Proyecto {
  id: number;
  nombre: string;
  tipo_energia: string;
  descripcion: string;
}

interface Inversion {
  proyecto: Proyecto;
  total_invertido: string;
}

export default function InversionesLista() {

    const [inversiones, setInversiones] = useState<Inversion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
    const idInversionista = localStorage.getItem("user_id"); // 👈 obtenemos el id del inversionista
    if (!idInversionista) {
      setError("No se encontró el ID del inversionista en localStorage.");
      setLoading(false);
      return;
    }
      const fetchInversiones = async () => {
      try {
        const response = await fetch(`http://localhost:3000/inversionistas/${idInversionista}`);
        if (!response.ok) throw new Error("Error al obtener las inversiones.");
        const data = await response.json();
        setInversiones(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar las inversiones del inversionista.");
      } finally {
        setLoading(false);
      }
    };

    fetchInversiones();
  }, []);

    if (loading) return <p>Cargando inversiones...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


   return (
    <>
    {/* ✅ Barra de navegación del inversionista */}
    <NavBar />

    {/* ✅ contenido con margen para no quedar debajo de la navbar */}
    <div className="detalle-container" style={{ marginTop: "0px" }}>
      <h1 className="titulo-detalle">Inversiones del Inversionista</h1>
      
      ¿Deseas invertir?
      <button
        className="btn-invertir mb-2"
        onClick={() => navigate(`/proyectos/busqueda`)}
      >
        💸 Click aquí
      </button>

      <div className="seccion inversiones-lista">
        <h2 className="subtitulo">Listado de Proyectos Invertidos</h2>

        {inversiones.length === 0 ? (
          <p>No hay inversiones registradas para este inversionista.</p>
        ) : (
          <table className="tabla-recursos">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Tipo de Energía</th>
                <th>Total Invertido</th>
              </tr>
            </thead>
            <tbody>
              {inversiones.map((inv, index) => (
                <tr key={index}>
                  <td>{inv.proyecto.nombre}</td>
                  <td>{inv.proyecto.tipo_energia}</td>
                  <td style={{ fontWeight: "bold", color: "#FFD62E" }}>
                    {Number(inv.total_invertido).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </>
  );

}