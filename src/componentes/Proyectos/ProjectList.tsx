
import { useState, useEffect } from 'react';

interface Proyecto {
  id: number;
  nombre: string;
  tipo_energia: string;
  descripcion: string;

}

interface ApiResponse {
  proyectos: Proyecto[];
  total?: number;
}

export default function ProjectsList(){
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/proyecto',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluir el token en el encabezado
      }} );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Ajustar según la estructura de tu API
      // Si tu API devuelve directamente un array: setProyectos(data);
      // Si devuelve un objeto con el array: setProyectos(data.proyectos);
      setProyectos(Array.isArray(data) ? data : data.proyectos || []);
      
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      setError('Error al cargar los proyectos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = (): void => {
    fetchProyectos();
  };

  const getEnergyTypeColor = (tipo: string): string => {
    const colors: Record<string, string> = {
      'Solar': 'bg-yellow-100 text-yellow-800',
      'Eólica': 'bg-blue-100 text-blue-800',
      'Hidráulica': 'bg-cyan-100 text-cyan-800',
      'Geotérmica': 'bg-orange-100 text-orange-800',
      'Biomasa': 'bg-green-100 text-green-800',
      'Nuclear': 'bg-purple-100 text-purple-800',
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Proyectos de Energía
            </h1>
            <p className="text-gray-600">
              {proyectos.length} proyectos registrados
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
           
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = '/proyectos/crear'}
            >
              + Nuevo Proyecto
            </button>
          </div>
        </div>

        {/* Lista de proyectos */}
        {proyectos.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-sm p-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-600">
              Aún no hay proyectos registrados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectos.map(proyecto => (
              <div
                key={proyecto.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 truncate flex-1 mr-2">
                    {proyecto.nombre}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getEnergyTypeColor(proyecto.tipo_energia)}`}
                  >
                    {proyecto.tipo_energia}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {proyecto.descripcion}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/proyectos/${proyecto.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-none border-none cursor-pointer"
                    >
                      Ver detalles
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        localStorage.setItem('proyecto_id', proyecto.id.toString());     
                        window.location.href = `/proyectos/invertir`
                      }}
                      className="text-green-600 hover:text-green-800 text-sm font-medium bg-none border-none cursor-pointer"
                    >
                      Invertir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}