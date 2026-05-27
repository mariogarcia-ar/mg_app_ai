import { useState } from "react";

export default function TaskInput({ onSubmit, disabled }) {
  const [texto, setTexto] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const limpio = texto.trim();
    if (!limpio) {
      return;
    }
    onSubmit(limpio);
    setTexto("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-input">Nueva tarea</label>
      <div className="field-row">
        <input
          id="task-input"
          type="text"
          placeholder="Escribir tarea..."
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          disabled={disabled}
        />
        <button type="submit" disabled={disabled || !texto.trim()}>
          Agregar
        </button>
      </div>
    </form>
  );
}
