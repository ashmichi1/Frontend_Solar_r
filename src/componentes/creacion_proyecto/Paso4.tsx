import React from "react";
import type { FormData } from "./MultiPaso";
import "./Paso4.css";

interface Step4Props {
  data: FormData;
  update: (newData: Partial<FormData>) => void;
  errors: any;
}

export const Paso4: React.FC<Step4Props> = ({ data, update, errors }) => {

  const handleChange = (i: number, field: "nombre" | "valor" | "cantidad", v: any) => {
    const updated = [...data.recursos];
    updated[i] = { ...updated[i], [field]: field !== "nombre" ? Number(v) : v };
    update({ recursos: updated });
  };

  return (
    <div>
      <h3 className="paso4-title">Recursos del proyecto</h3>

      {data.recursos.map((r, i) => (
        <div key={i} className="recurso-card">

          <h4 className="recurso-header">Recurso {i + 1}</h4>

          <label>Nombre</label>
          <input
            className={errors[`rNombre${i}`] ? "mp-input error" : "mp-input"}
            value={r.nombre}
            onChange={(e) => handleChange(i, "nombre", e.target.value)}
          />
          {errors[`rNombre${i}`] && <div className="error-text">{errors[`rNombre${i}`]}</div>}

          <label>Valor</label>
          <input
            type="text"
            className={errors[`rValor${i}`] ? "mp-input error" : "mp-input"}
           
            onChange={(e) => handleChange(i, "valor", e.target.value)}
          />
          {errors[`rValor${i}`] && <div className="error-text">{errors[`rValor${i}`]}</div>}

          <label>Cantidad</label>
          <input
            type="text"
            className={errors[`rCantidad${i}`] ? "mp-input error" : "mp-input"}       
            onChange={(e) => handleChange(i, "cantidad", e.target.value)}
          />
          {errors[`rCantidad${i}`] && <div className="error-text">{errors[`rCantidad${i}`]}</div>}

        </div>
      ))}
    </div>
  );
};