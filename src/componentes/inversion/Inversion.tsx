                                                                                import { useState, useEffect } from 'react';

interface FormData {
  cantidad: string;
  usuario_id: number | null;
  proyecto_id: number | null;
}

interface FormErrors {
  cantidad?: string;
  usuario_id?: string;
  proyecto_id?: string;
}

export default function InversionForm() {
  const [formData, setFormData] = useState<FormData>({
    cantidad: '',
    usuario_id: null,
    proyecto_id: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Obtener usuario_id del localStorage
    const usuarioIdStorage = localStorage.getItem('usuario_id');
    
    // Obtener proyecto_id del localStorage (asumiendo que se guarda al hacer clic en "Invertir")
    const proyectoIdStorage = localStorage.getItem('proyecto_id');

    setFormData(prev => ({
      ...prev,
      usuario_id: usuarioIdStorage ? parseInt(usuarioIdStorage) : null,
      proyecto_id: proyectoIdStorage ? parseInt(proyectoIdStorage) : null
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Solo permitir números y punto decimal para cantidad
    if (name === 'cantidad') {
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(value)) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.cantidad.trim()) {
      newErrors.cantidad = 'La cantidad a invertir es requerida';
    } else {
      const cantidad = parseFloat(formData.cantidad);
      if (isNaN(cantidad) || cantidad <= 0) {
        newErrors.cantidad = 'La cantidad debe ser un número mayor a 0';
      } else if (cantidad < 1000) {
        newErrors.cantidad = 'La cantidad mínima de inversión es $1,000';
      }
    }

    if (!formData.usuario_id) {
      newErrors.usuario_id = 'No se encontró el ID de usuario. Inicia sesión nuevamente.';
    }

    if (!formData.proyecto_id) {
      newErrors.proyecto_id = 'No se encontró el ID del proyecto.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/proyecto/invertir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cantidad: parseFloat(formData.cantidad),
          usuario_id: formData.usuario_id,
          proyecto_id: formData.proyecto_id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('¡Inversión realizada con éxito!');
        
        // Opcional: Redirigir o limpiar formulario
        setFormData(prev => ({
          ...prev,
          cantidad: ''
        }));
        setErrors({});
        
        // Redirigir a lista de proyectos o dashboard
        // window.location.href = '/proyectos';
        
      } else {
        const errorData: any = await response.json();
        alert(`Error al realizar inversión: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error: unknown) {
      console.error('Error al realizar inversión:', error);
      alert('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value) return '';
    const number = parseFloat(value);
    return isNaN(number) ? '' : number.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    });
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 Realizar Inversión</h1>
          <p className="text-gray-600">Invierte en proyectos de energía renovable</p>
        </div>

        <div className="space-y-6">
          {/* Campo Cantidad */}
          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad a Invertir
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-lg">$</span>
              <input
                type="text"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-lg ${
                  errors.cantidad ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
            </div>
            {formData.cantidad && (
              <p className="mt-2 text-sm text-gray-600">
                Equivale a: {formatCurrency(formData.cantidad)}
              </p>
            )}
            {errors.cantidad && (
              <p className="mt-1 text-sm text-red-600">{errors.cantidad}</p>
            )}
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">ℹ️ Información importante:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Inversión mínima: $1,000 COP</li>
              <li>• Tu inversión será procesada inmediatamente</li>
              <li>• Recibirás confirmación por email</li>
              <li>• Usuario ID: {formData.usuario_id || 'No encontrado'}</li>
              <li>• Proyecto ID: {formData.proyecto_id || 'No encontrado'}</li>
            </ul>
          </div>

          {/* Mostrar errores generales */}
          {errors.usuario_id && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.usuario_id}</p>
            </div>
          )}

          {errors.proyecto_id && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.proyecto_id}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => window.location.href = '/proyectos'}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Procesando...
                </div>
              ) : (
                'Confirmar Inversión'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}