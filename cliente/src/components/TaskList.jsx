import TaskCard from "./TaskCard";

function TaskList({ herramientas }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {herramientas.map((h) => (
        <TaskCard herramienta={h} key={h._id} />
      ))}
    </div>
  );
}

export default TaskList;