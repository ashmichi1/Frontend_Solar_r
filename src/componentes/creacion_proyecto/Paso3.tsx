import React from "react";
import Select from "react-select";
import type { FormData } from "./MultiPaso";
import "./Paso3.css";

interface Step3Props {
  data: FormData;
  update: (newData: Partial<FormData>) => void;
  errors: any;
}

const softwareOptions = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
];

const hardwareOptions = [
  { value: "raspberry", label: "Raspberry Pi" },
  { value: "arduino", label: "Arduino" },
  { value: "iot", label: "IoT Device" },
];

export const Paso3: React.FC<Step3Props> = ({ data, update }) => (
  <div className="paso3-container">
    <label className="paso3-label">Tecnologías de Software</label>
    <Select
      isMulti
      options={softwareOptions}
      value={softwareOptions.filter(o => data.software.includes(o.value))}
      onChange={(s) => update({ software: s.map((o) => o.value) })}
      classNamePrefix="vite-select"
    />

    <label className="paso3-label mt-4">Tecnologías de Hardware</label>
    <Select
      isMulti
      options={hardwareOptions}
      value={hardwareOptions.filter(o => data.hardware.includes(o.value))}
      onChange={(s) => update({ hardware: s.map((o) => o.value) })}
      classNamePrefix="vite-select"
    />
  </div>
);