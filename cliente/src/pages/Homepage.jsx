import { useEffect, useState } from "react";
import { fetchHerramientas } from "../api/herramientas";
import TaskList from "../components/TaskList";

function Homepage() {
  const [herramientas, setHerramientas] = useState([]);

  useEffect(() => {
    fetchHerramientas()
      .then((res) => setHerramientas(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <TaskList herramientas={herramientas} />;
}

export default Homepage;