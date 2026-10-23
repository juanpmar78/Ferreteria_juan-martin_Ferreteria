import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TaskForm from "./pages/TaskForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/herramientas/new" element={<TaskForm />} />
          <Route path="/herramientas/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;