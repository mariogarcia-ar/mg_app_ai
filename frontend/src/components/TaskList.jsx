import React from "react";

export default function TaskList({ items }) {
  if (!items.length) {
    return <p className="empty-msg">Aun no hay tareas.</p>;
  }

  return (
    <ol className="task-list">
      {items.map((task) => (
        <li key={task.id}>{task.texto}</li>
      ))}
    </ol>
  );
}
