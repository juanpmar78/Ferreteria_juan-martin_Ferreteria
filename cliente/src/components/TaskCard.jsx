import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHerramienta } from "../api/herramientas";

function TaskCard({ herramienta }) {
  const navigate = useNavigate();
  const [enOferta, setEnOferta] = useState(herramienta.en_oferta);

  const toggleOferta = async (e) => {
    e.stopPropagation(); // evita que el clic abra el formulario de edición
    try {
      const res = await updateHerramienta(herramienta._id, { en_oferta: !enOferta });
      setEnOferta(res.data.en_oferta);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-900"
      onClick={() => navigate(`/herramientas/${herramienta._id}`)}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">{herramienta.herramienta}</h2>
        <button onClick={toggleOferta} title="Marcar en oferta">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${enOferta ? 'text-green-500' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </button>
      </div>
      <p className="text-slate-300">Marca: {herramienta.marca}</p>
      <p className="text-slate-300">
        Precio: ${Number(herramienta.precio_unitario).toLocaleString('es-CO')}
      </p>
      <p className={herramienta.stock_disponible > 0 ? "text-green-500" : "text-red-500"}>
        Stock: {herramienta.stock_disponible}
      </p>
      {enOferta && <p className="text-green-500 font-bold text-sm mt-1">EN OFERTA</p>}
    </div>
  );
}

export default TaskCard;