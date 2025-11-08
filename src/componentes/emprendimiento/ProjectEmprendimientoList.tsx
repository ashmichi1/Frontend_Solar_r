import React, { useEffect, useState } from "react";
import "./styles.css"; 
import { useNavigate } from "react-router-dom";
import NavBarEmp from "../navegacion/NavBarEmp"; // 

interface Proyecto {
  id: number;
  nombre: string;
  tipo_energia: "Eolica" | "Hidroelectrica" | "Solar";
  descripcion: string;
}




export default function ListaProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

      const navigate = useNavigate();

    useEffect(() => {

        const userId = localStorage.getItem("user_id");

        if (!userId) {
            setError("No se encontró el ID del usuario en localStorage.");
            setLoading(false);
            return;
        }

        const fetchProyectos = async () => {
        
        try {
          const response = await fetch(`http://localhost:3000/emprendedor/${userId}/proyectos`);
          if (!response.ok) throw new Error("Error al obtener los proyectos.");

          const data = await response.json();
          console.log("Proyectos recibidos:", data);
          setProyectos(data.proyectos || []); // Ajusta según la estructura de tu API
        } catch (err) {
          console.error(err);
          setError("No se pudieron cargar los proyectos.");
        } finally {
          setLoading(false);
        }
    };

    fetchProyectos();

  }, [])

  const getColorPorEnergia = (tipo: Proyecto["tipo_energia"]) => {
    switch (tipo) {
      case "Eolica":
        return "#646CFF"; // Vite purple
      case "Hidroelectrica":
        return "#3F51B5"; // Deep violet
      case "Solar":
        return "#FFD62E"; // Lightning yellow
      default:
        return "#000000";
    }
  };

  // 🧭 Render principal
  return (
 <>
    {/* ✅ Barra de navegación arriba, ancho completo */}
    <NavBarEmp />

    {/* ✅ Contenido de la página con margen para que no tape la barra */}
    <div className="lista-container" style={{ marginTop: "80px" }}>
      <h1 className="titulo-principal">Proyectos Energéticos ⚡</h1>

      ¿Deseas crear un proyecto?
      <button
        className="btn-invertir ml-2 mb-2" 
        onClick={() => navigate(`/proyectos/crear`)}
      >
        💡 Click aquí
      </button>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : proyectos.length === 0 ? (
        <p className="mensaje-vacio">El usuario no tiene proyectos creados.</p>
      ) : (
        <>
          <div className="cards-container">
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="card-proyecto"
                style={{ borderLeftColor: getColorPorEnergia(proyecto.tipo_energia) }}
              >
                <h2 className="nombre-proyecto">{proyecto.nombre}</h2>
                <p
                  className="tipo-energia"
                  style={{ color: getColorPorEnergia(proyecto.tipo_energia) }}
                >
                  {proyecto.tipo_energia}
                </p>
                <p className="descripcion-proyecto">{proyecto.descripcion}</p>

                <div className="acciones">
                  <button
                    className="btn btn-detalles"
                    onClick={() => navigate(`/emprendedor/proyecto/${proyecto.id}`)}
                  >
                    Ver detalles
                  </button>

                  <button
                    className="btn btn-inversiones"
                    onClick={() => navigate(`/emprendedor/proyecto/inversiones/${proyecto.id}`)}
                  >
                    Ver inversiones
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total-container">
            <p className="total-texto">Total de proyectos: {proyectos.length}</p>
          </div>
        </>
      )}
    </div>
  </>
  )
}