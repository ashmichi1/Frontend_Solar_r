import React, { useState } from "react";
import "./TerminosReferencia.css";
import {  Link } from "react-router-dom";

export default function TerminosReferencia() {
  const [acepta, setAcepta] = useState(false);
  
  const handleContinue = () => {
   
    alert("¡Gracias por aceptar los términos! Ahora puedes revisar tu correo para verificar tu cuenta.");
  };


    return (
    <div className="terminos-content">
      <div className="terminos-card">
        <h1 className="terminos-title">📜 Términos de Referencia</h1>
        <p className="terminos-subtitle">Uso de Software y Tratamiento de Datos</p>

        <div className="terminos-content">
          <h2>1. Objeto</h2>
          <p>
            El presente documento establece los términos de referencia para el uso del software
            proporcionado por la organización, así como las políticas y lineamientos relacionados
            con la recolección, almacenamiento, uso, tratamiento y protección de datos personales
            de los usuarios y/o entidades vinculadas.
          </p>

          <h2>2. Alcance</h2>
          <p>
            Estos términos aplican a todos los usuarios que accedan, utilicen o interactúen 
            con el software, incluyendo empleados, contratistas, clientes y terceros autorizados.
          </p>

          <h2>3. Uso del Software</h2>
          <p>El usuario se compromete a utilizar el software únicamente para los fines autorizados, respetando normas éticas, legales y de seguridad digital. Queda prohibido:</p>
          <ul>
            <li>Modificar, copiar, distribuir o descompilar el software sin autorización.</li>
            <li>Utilizar el software para actividades ilícitas o que comprometan la seguridad.</li>
            <li>Compartir credenciales o permitir acceso a terceros no autorizados.</li>
          </ul>

          <h2>4. Responsabilidades del Usuario</h2>
          <ul>
            <li>Mantener la confidencialidad de su información de acceso.</li>
            <li>Notificar accesos no autorizados o incidentes de seguridad.</li>
            <li>Usar la información del sistema conforme a la ley.</li>
          </ul>

          <h2>5. Tratamiento de Datos Personales</h2>
          <p>
            La organización podrá recolectar y tratar datos personales necesarios para el 
            funcionamiento del software y servicios asociados, incluyendo:
          </p>
          <ul>
            <li>Recolección</li>
            <li>Almacenamiento</li>
            <li>Uso</li>
            <li>Transmisión y transferencia</li>
            <li>Eliminación</li>
          </ul>

          <h2>6. Finalidad del Tratamiento de Datos</h2>
          <ul>
            <li>Garantizar funcionamiento del software</li>
            <li>Mejorar la experiencia del usuario</li>
            <li>Cumplir obligaciones legales</li>
            <li>Gestionar soporte y servicios</li>
            <li>Realizar análisis internos</li>
            <li>Enviar comunicaciones relacionadas</li>
          </ul>

          <h2>7. Autorización del Usuario</h2>
          <p>Al usar el software, el usuario autoriza el tratamiento de sus datos personales.</p>

          <h2>8. Derechos del Titular</h2>
          <ul>
            <li>Conocer, actualizar y rectificar datos</li>
            <li>Solicitar eliminación cuando aplique</li>
            <li>Revocar autorización</li>
            <li>Presentar quejas ante la autoridad</li>
          </ul>

          <h2>9. Seguridad de la Información</h2>
          <p>
            La organización adoptará medidas técnicas y administrativas para proteger los datos
            personales contra pérdida, acceso no autorizado y divulgación indebida.
          </p>

          <h2>10. Transferencia de Datos</h2>
          <p>
            La organización garantizará cumplimiento legal en caso de transmisión de datos a terceros.
          </p>

          <h2>11. Vigencia de la Información</h2>
          <p>Los datos serán tratados durante el tiempo necesario según la normativa vigente.</p>

          <h2>12. Modificaciones</h2>
          <p>El uso continuado implica aceptación de modificaciones a estos términos.</p>

          <h2>13. Aceptación</h2>
          <p>El uso del software implica la aceptación total de estos términos.</p>
        </div>

           {/* ✅ Checkbox de aceptación */}
        <div className="aceptacion-box">
          <label className="aceptacion-label">
            <input
              type="checkbox"
              checked={acepta}
              onChange={(e) => setAcepta(e.target.checked)}
              className="aceptacion-checkbox"
            />
            Acepto los términos y condiciones
          </label>
        </div>

         {/* ✅ Botones */}
        <div className="terminos-footer">
          <Link to="/login" className="terminos-back-btn">⬅ Volver</Link>

          <button
            className={`terminos-continue-btn ${acepta ? "enabled" : "disabled"}`}
            disabled={!acepta}
            onClick={handleContinue}
          >
            Continuar ✅
          </button>
        </div>
      </div>
    </div>
  );
}