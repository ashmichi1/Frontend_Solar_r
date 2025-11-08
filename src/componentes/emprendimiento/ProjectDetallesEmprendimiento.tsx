import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetallesProyecto.css";
import NavBarEmp from "../navegacion/NavBarEmp"; 



interface Paso {
  id: number;
  paso: string;
}

interface Recurso {
  id: number;
  nombre: string;
  valor: string;
  cantidad: number;
}

interface Tecnologia {
  id: number;
  nombre: string;
  tipo: string;
}

interface ProyectoDetalle {
  id: string;
  nombre: string;
  tipo_energia: string;
  descripcion: string;
  pasos: Paso[];
  recursos: Recurso[];
  tecnologias: Tecnologia[];
  total_recursos: number;
}

export default function ProjectDetallesEmprendimiento() {
  const { id } = useParams<{ id: string }>();
  const [proyecto, setProyecto] = useState<ProyectoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/proyecto/${id}`);
        if (!response.ok) throw new Error("Error al cargar el proyecto.");
        const data = await response.json();
        setProyecto(data);
      } catch (err) {
        setError("No se pudo obtener la información del proyecto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProyecto();
  }, [id]);

  if (loading) return <p>Cargando detalles del proyecto...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!proyecto) return <p>No se encontró el proyecto.</p>;

  return (
    <>
      {/* ✅ Barra de navegación de emprendedor */}
      <NavBarEmp />

      <div className="detalle-container">
        <Link to="/emprendedor/lista" className="volver-btn">← Volver a proyectos</Link>

        <h1 className="titulo-detalle">Proyecto: {proyecto.nombre}</h1>

        {/* Datos básicos + pasos */}
        <div className="seccion datos-basicos">
          <h2 className="subtitulo">Datos básicos</h2>
          <div className="grid-datos">
            <div className="columna-izquierda">
              <p><strong>Tipo de energía:</strong> {proyecto.tipo_energia}</p>
              <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            </div>
            <div className="columna-derecha">
              <h3 className="sub-subtitulo">Pasos del proyecto</h3>
              <ul className="lista-pasos">
                {proyecto.pasos.map((p) => (
                  <li key={p.id}>{p.paso}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recursos */}
        <div className="seccion recursos">
          <h2 className="subtitulo">Recursos del proyecto</h2>
          <table className="tabla-recursos">
            <thead>
              <tr>
                <th>Recurso</th>
                <th>Unidades</th>
                <th>Valor por unidad</th>
              </tr>
            </thead>
            <tbody>
              {proyecto.recursos.map((r) => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.cantidad}</td>
                  <td>{r.valor}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="footer-total">💰 Total</td>
                <td className="footer-total-valor">{proyecto.total_recursos}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tecnologías */}
        <div className="seccion tecnologias">
          <h2 className="subtitulo">Tecnologías utilizadas</h2>
          <ul className="lista-tecnologias">
            {proyecto.tecnologias.map((t) => (
              <li key={t.id}>
                {t.nombre} <span className="tipo-tecnologia">({t.tipo})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}