const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.detail || data?.error?.message || "Error de API";
    throw new Error(message);
  }
  return data;
}

export async function fetchTareas() {
  const response = await fetch(`${API_BASE_URL}/tareas`);
  return parseResponse(response);
}

export async function crearTarea(texto) {
  const response = await fetch(`${API_BASE_URL}/tareas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  return parseResponse(response);
}

export async function consultarChat(pregunta, tareas) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta, tareas }),
  });
  return parseResponse(response);
}
