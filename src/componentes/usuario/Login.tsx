import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

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
    if (!formData.password.trim()) newErrors.password = 'La contraseña es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const decoded = jwtDecode<any>(data.token);

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', decoded.role.toString());
        localStorage.setItem('user_id', decoded.user_id.toString());

        alert('✅ Bienvenido!');
        setFormData({ email: '', password: '' });

        if (decoded.role == 2 || decoded.role == 1) {
          navigate('/emprendedor/lista');
        } else {
          navigate('/inversion/lista');
        }

      } else {
        const errorData = await response.json();
        alert(`❌ ${errorData.message || "Error al iniciar sesión"}`);
      }
    } catch {
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-logo">Revolución Solar⚡</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="correo@dominio.com"
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

        <button className="btn-login" onClick={handleSubmit} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar ✅"}
        </button>

        <p className="register-text">
          ¿No tienes cuenta?
          <Link to="/usuarios/crear" className="register-link">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}
