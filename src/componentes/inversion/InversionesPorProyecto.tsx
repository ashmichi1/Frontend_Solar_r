import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./InversionesProyecto.css";
import NavBarEmp from "../navegacion/NavBarEmp"; // ✅ IMPORTA NAVBAR

interface Inversion {
  id_inversion: number;
  usuario: {
    id: string;
    username: string;
    email: string;
  };
  cantidad: number;
}

export default function InversionesPorProyecto() {
  const { id } = useParams<{ id: string }>();
  const [inversiones, setInversiones] = useState<Inversion[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInversiones = async () => {
      try {
        const response = await fetch(`http://localhost:3000/inversionistas/proyecto-inversiones/${id}`);
        if (!response.ok) throw new Error("Error al cargar las inversiones.");

        const data = await response.json();
        setInversiones(data.inversiones || []);
        setTotal(data.total_invertido || 0);
      } catch (err) {
        setError("No se pudo obtener la información de las inversiones. " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchInversiones();
  }, [id]);

  if (loading) return <p>Cargando inversiones...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      {/* ✅ Navbar emprendedor */}
      <NavBarEmp />

      <div className="detalle-container">
        <Link to="/emprendedor/lista" className="volver-btn">← Volver a proyectos</Link>

        <h1 className="titulo-detalle">Inversiones del Proyecto</h1>

        <div className="seccion inversiones">
          <h2 className="subtitulo">Listado de Inversiones</h2>

          {inversiones.length === 0 ? (
            <p>No hay inversiones registradas para este proyecto.</p>
          ) : (
            <table className="tabla-inversiones">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Cantidad Invertida</th>
                </tr>
              </thead>
              <tbody>
                {inversiones.map((inv) => (
                  <tr key={inv.id_inversion}>
                    <td>{inv.usuario.username}</td>
                    <td>{inv.usuario.email}</td>
                    <td>
                      {inv.cantidad.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="footer-total">💰 Total Invertido</td>
                  <td className="footer-total-valor">
                    {total.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
