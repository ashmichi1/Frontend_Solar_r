import React from "react";
import type { FormData } from "./MultiPaso";

interface Step2Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }
  

export const Paso2: React.FC<Step2Props>= ({ data, update }) => {

    const handleChange = (index: number, value: string) => {
        const newPasos = [...data.pasos];
        newPasos[index] = value;
        update({ pasos: newPasos });
      };

      const handleAdd = () => {
        update({ pasos: [...data.pasos, ""] });
      };
    
      const handleRemove = (index: number) => {
        const newPasos = data.pasos.filter((_, i) => i !== index);
        update({ pasos: newPasos });
      };



      return (
        <div>
          <h3 className="mb-2 font-bold">Pasos del proyecto</h3>
    
          {data.pasos.map((paso, i) => (
            <div key={i} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                className="border p-2 flex-1"
                placeholder={`Paso ${i + 1}`}
                value={paso}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleRemove(i)}
              >
                Eliminar
              </button>
            </div>
          ))}
    
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleAdd}
          >
            ➕ Añadir paso
          </button>
        </div>
      );
  }


  