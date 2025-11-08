import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  
  email: string;     // Email del usuario
  role: number;     // ID del rol (clave para la protección de rutas)
  iat?: number;       // Issued At (timestamp)
  exp?: number;       // Expiration (timestamp)
}

/**
 * Hook personalizado para obtener la información del usuario
 * autenticado a partir del token JWT guardado en localStorage.
 */
export function useAuth(): JwtPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Error decodificando token JWT:", error);
    return null;
  }
}