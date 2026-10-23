import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchHerramienta, createHerramienta,
  updateHerramienta, deleteHerramienta
} from "../api/herramientas";

function TaskForm() {
  const [herramienta, setHerramienta] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [enOferta, setEnOferta] = useState(false);
  const [error, setError] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const datos = {
      herramienta,
      marca,
      precio_unitario: parseFloat(precio),
      stock_disponible: parseInt(stock, 10),
      en_oferta: enOferta,
    };
    try {
      if (!params.id) await createHerramienta(datos);
      else await updateHerramienta(params.id, datos);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.detail || "Ocurrió un error al guardar");
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchHerramienta(params.id)
        .then((res) => {
          setHerramienta(res.data.herramienta);
          setMarca(res.data.marca);
          setPrecio(res.data.precio_unitario);
          setStock(res.data.stock_disponible);
          setEnOferta(res.data.en_oferta);
        })
        .catch((err) => console.log(err));
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas borrar esta herramienta?")) return;
    try {
      await deleteHerramienta(params.id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4">
            {params.id ? "Actualizar Herramienta" : "Crear Herramienta"}
          </h1>

          <input type="text" placeholder="Herramienta" required autoFocus
            className="block py-2 px-3 mb-4 w-full text-black"
            value={herramienta} onChange={(e) => setHerramienta(e.target.value)} />
          <input type="text" placeholder="Marca" required
            className="block py-2 px-3 mb-4 w-full text-black"
            value={marca} onChange={(e) => setMarca(e.target.value)} />
          <input type="number" placeholder="Precio unitario" min="0" step="any" required
            className="block py-2 px-3 mb-4 w-full text-black"
            value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input type="number" placeholder="Stock disponible" min="0" step="1" required
            className="block py-2 px-3 mb-4 w-full text-black"
            value={stock} onChange={(e) => setStock(e.target.value)} />

          <label className="flex items-center gap-2 mb-4">
            <input type="checkbox" checked={enOferta}
              onChange={(e) => setEnOferta(e.target.checked)} />
            En oferta
          </label>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Actualizar Herramienta" : "Crear Herramienta"}
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={handleDelete}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;