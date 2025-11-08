import React from "react";
import type { FormData } from "./MultiPaso";

interface Step1Props {
  data: FormData;
  update: (newData: Partial<FormData>) => void;
  errors: any;
}

export const Paso1: React.FC<Step1Props> = ({ data, update, errors }) => (
  <div className="form-step">

    <label>Nombre del proyecto</label>
    <input
      className={errors.nombre ? "mp-input error" : "mp-input"}
      value={data.nombre}
      onChange={(e) => update({ nombre: e.target.value })}
    />
    {errors.nombre && <div className="error-text">{errors.nombre}</div>}

    <label>Tipo de energía</label>
    <select
      className={errors.energia ? "mp-input error" : "mp-input"}
      value={data.energia}
      onChange={(e) => update({ energia: e.target.value })}
    >
      <option value="">Seleccione...</option>
      <option value="Eolica">Eólica</option>
      <option value="Solar">Solar</option>
      <option value="Hidroelectrica">Hidroeléctrica</option>
    </select>
    {errors.energia && <div className="error-text">{errors.energia}</div>}

    <label>Descripción</label>
    <textarea
      className={errors.descripcion ? "mp-input error" : "mp-input"}
      value={data.descripcion}
      onChange={(e) => update({ descripcion: e.target.value })}
      rows={4}
    />
    {errors.descripcion && <div className="error-text">{errors.descripcion}</div>}

  </div>
);