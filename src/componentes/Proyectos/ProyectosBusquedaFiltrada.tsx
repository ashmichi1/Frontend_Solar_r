import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProyectosLista.css";
import NavBar from "../navegacion/NavBarInv";

interface Creador {
  id: number;
  nombre: string;
  email: string;
}

interface Proyecto {
  id: number;
  nombre: string;
  tipo_energia: string;
  creador: Creador;
  total_invertido: number;
}




export default function ProyectosBusquedaFiltrada() {

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtroEnergia, setFiltroEnergia] = useState<string>("Todos");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProyectos = async () => {
        try {
            const response = await fetch("http://localhost:3000/proyecto");
            if (!response.ok) throw new Error("Error al obtener los proyectos.");

            const data = await response.json();
            setProyectos(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("No se pudieron cargar los proyectos.");
        } finally {
            setLoading(false);
        }
    };

    fetchProyectos();
  }, []);


  const proyectosFiltrados =
    filtroEnergia === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.tipo_energia === filtroEnergia);

    if (loading) return <p>Cargando proyectos...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
     <>
    {/* ✅ Barra de navegación del inversionista */}
    <NavBar />

    {/* ✅ Contenido con espacio para no chocar con la barra */}
    <div className="detalle-container" style={{ marginTop: "70px" }}>
      <h1 className="titulo-detalle">Listado de Proyectos</h1>

      {/* Filtro */}
      <div className="filtro-container">
        <label className="filtro-label">Filtrar por tipo de energía:</label>
        <select
          className="filtro-select"
          value={filtroEnergia}
          onChange={(e) => setFiltroEnergia(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Eolica">Eólica</option>
          <option value="Solar">Solar</option>
          <option value="Hidroelectrica">Hidroeléctrica</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="seccion">
        <h2 className="subtitulo">Proyectos Registrados</h2>

        {proyectosFiltrados.length === 0 ? (
          <p>No hay proyectos que coincidan con el filtro seleccionado.</p>
        ) : (
          <table className="tabla-recursos">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Tipo de Energía</th>
                <th>Creador</th>
                <th>Total Invertido</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {proyectosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.tipo_energia}</td>
                  <td>{p.creador.nombre}</td>
                  <td style={{ fontWeight: "bold", color: "#FFD62E" }}>
                    {Number(p.total_invertido).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td>
                    <button
                      className="btn-invertir"
                      onClick={() =>
                        navigate(`/proyecto/${p.id}/invertir`, {
                          state: { nombre: p.nombre },
                        })
                      }
                    >
                      💸 Invertir
                    </button>
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
