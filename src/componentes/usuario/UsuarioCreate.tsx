import React, { useState } from 'react';
import "./UserForm.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  password: string;
  tipo_id: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  tipo_id?: string;
}

interface UserType {
  value: number;
  label: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    tipo_id: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const userTypes: UserType[] = [
    { value: 1, label: 'EMPRENDEDOR' },
    { value: 2, label: 'EMPRENDEDOR PREMIUM' },
    { value: 3, label: 'INVERSIONISTA' },
    { value: 4, label: 'INVERSIONISTA PREMIUM' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es requerido';
    if (!formData.password.trim()) newErrors.password = 'La contraseña es requerida';
    if (!formData.tipo_id) newErrors.tipo_id = 'Selecciona un tipo de usuario';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          tipo_id: parseInt(formData.tipo_id)
        }),
      });

      if (response.ok) {
        setFormData({ email: '', username: '', password: '', tipo_id: '' });
        setErrors({});
        navigate('/terminos');
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.message}`);
      }
    } catch {
      alert('❌ Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-logo">Revolución Solar⚡</h1>
        <p className="register-subtitle">Crear nuevo usuario</p>

        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            placeholder="usuario123"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? "input error" : "input"}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "input error" : "input"}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "input error" : "input"}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Tipo de Usuario</label>
          <div className="radio-group">
            {userTypes.map(type => (
              <label key={type.value} className="radio-option">
                <input
                  type="radio"
                  name="tipo_id"
                  value={type.value}
                  checked={formData.tipo_id === type.value.toString()}
                  onChange={handleInputChange}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors.tipo_id && <span className="error-text">{errors.tipo_id}</span>}
        </div>

        <button className="btn-register" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creando..." : "Crear usuario ✅"}
        </button>
      </div>
    </div>
  );
}
