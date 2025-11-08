
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import './App.css'
import MultiPaso from './componentes/creacion_proyecto/MultiPaso'
import UserForm from './componentes/usuario/UsuarioCreate'
import LoginForm from './componentes/usuario/Login';
import ProjectsList from './componentes/Proyectos/ProjectList';
import InversionForm from './componentes/inversion/Inversion';
import { ProtectedRoutes } from './componentes/proteccion_rutas/ProtectedRoutes';
import ProjectEmprendimientoList from './componentes/emprendimiento/ProjectEmprendimientoList';
import ProjectDetallesEmprendimiento from './componentes/emprendimiento/ProjectDetallesEmprendimiento';
import InversionesPorProyecto from './componentes/inversion/InversionesPorProyecto';
import InversionesLista from './componentes/inversion/InversionesLista';
import ProyectosBusquedaFiltrada from './componentes/Proyectos/ProyectosBusquedaFiltrada';
import CrearInversion from './componentes/inversion/CrearInversion';
import TerminosReferencia from './componentes/usuario/TerminosReferencia';
import Inicio from './componentes';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/terminos" element={<TerminosReferencia />} />
        <Route path="/usuarios/crear" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/proyectos/crear" element={<MultiPaso />} /> 
        <Route path="/emprendedor/lista" element={<ProtectedRoutes roles={[1, 2]} >
                                                    <ProjectEmprendimientoList />
                                                  </ProtectedRoutes>  } />
        <Route path="emprendedor/proyecto/:id" element={<ProtectedRoutes roles={[1, 2]} >
                  <ProjectDetallesEmprendimiento />
        </ProtectedRoutes>  } />
        <Route path="emprendedor/proyecto/inversiones/:id" element={<ProtectedRoutes roles={[1, 2]} >
                  <InversionesPorProyecto />
        </ProtectedRoutes>  } />
        <Route path="inversion/lista" element={<ProtectedRoutes roles={[3, 4]} >
                  <InversionesLista />
        </ProtectedRoutes>  } />
        <Route path="proyectos/busqueda" element={<ProtectedRoutes roles={[3, 4]} >
                  <ProyectosBusquedaFiltrada />
        </ProtectedRoutes>  } />
        <Route path="/proyectos/lista" element={<ProtectedRoutes roles={[1]}>
          <ProjectsList />
        </ProtectedRoutes>} />
        <Route path="/proyectos/invertir" element={<InversionForm />} />
        <Route path="/proyecto/:id/invertir" element={<CrearInversion />} />
      </Routes>

    </Router>
  )
}

export default App
