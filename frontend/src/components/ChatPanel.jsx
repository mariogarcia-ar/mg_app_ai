import { useState } from "react";

export default function ChatPanel({ onAsk, loading, response }) {
  const [pregunta, setPregunta] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const limpia = pregunta.trim();
    if (!limpia) {
      return;
    }
    onAsk(limpia);
  }

  return (
    <section className="panel chat-panel">
      <h2>Chat IA</h2>
      <form onSubmit={handleSubmit} className="chat-form">
        <label htmlFor="chat-input">Pregunta para la IA</label>
        <textarea
          id="chat-input"
          placeholder="Ej: Que deberia hacer primero?"
          rows={4}
          value={pregunta}
          onChange={(event) => setPregunta(event.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !pregunta.trim()}>
          {loading ? "Analizando..." : "Enviar"}
        </button>
      </form>

      <div className="chat-response">
        <h3>Respuesta IA</h3>
        <p>{response || "Todavia no hay respuesta."}</p>
      </div>
    </section>
  );
}
