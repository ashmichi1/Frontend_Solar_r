import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect } from "react";

export default function NavBar() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    

    const handleLogout = () => {
        // ✅ limpiar datos de sesión
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        // ✅ redirigir al login
        navigate("/login");
    };



  return (
    <nav className="top-nav">


      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/inversion/lista">Mis Inversiones</Link></li>
        <li><Link to="/proyectos/busqueda">Buscar Proyectos</Link></li>
      </ul>

    
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Salir
      </button>
    </nav>
  );
}