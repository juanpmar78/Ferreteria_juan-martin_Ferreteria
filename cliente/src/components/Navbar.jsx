import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center my-7">
      <Link to="/">
        <h1 className="text-2xl sm:text-3xl font-bold">Ferretería · Catálogo de Herramientas</h1>
      </Link>
      <Link
        to="/herramientas/new"
        className="bg-zinc-950 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-center"
      >
        Nueva Herramienta
      </Link>
    </header>
  );
}

export default Navbar;