import React, { useEffect, useMemo, useState } from "react";

import ChatPanel from "./components/ChatPanel";
import StatusBanner from "./components/StatusBanner";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { consultarChat, crearTarea, fetchTareas } from "./services/api";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargandoTareas, setCargandoTareas] = useState(false);
  const [cargandoChat, setCargandoChat] = useState(false);
  const [respuestaIA, setRespuestaIA] = useState("");
  const [estadoTexto, setEstadoTexto] = useState("Cargando tareas...");
  const [estadoTipo, setEstadoTipo] = useState("info");

  const tareasComoTexto = useMemo(() => tareas.map((item) => item.texto), [tareas]);

  useEffect(() => {
    async function cargarTareas() {
      setCargandoTareas(true);
      try {
        const data = await fetchTareas();
        setTareas(data.items || []);
        setEstadoTexto("API conectada");
        setEstadoTipo("ok");
      } catch (error) {
        setEstadoTexto(`Error al cargar tareas: ${error.message}`);
        setEstadoTipo("error");
      } finally {
        setCargandoTareas(false);
      }
    }

    cargarTareas();
  }, []);

  async function agregarTarea(texto) {
    setCargandoTareas(true);
    try {
      const task = await crearTarea(texto);
      setTareas((prev) => [task, ...prev]);
      setEstadoTexto("Tarea agregada");
      setEstadoTipo("ok");
    } catch (error) {
      setEstadoTexto(`No se pudo crear la tarea: ${error.message}`);
      setEstadoTipo("error");
    } finally {
      setCargandoTareas(false);
    }
  }

  async function preguntarAI(pregunta) {
    if (!tareasComoTexto.length) {
      setEstadoTexto("Agrega tareas antes de consultar al chat.");
      setEstadoTipo("error");
      return;
    }

    setCargandoChat(true);
    try {
      const data = await consultarChat(pregunta, tareasComoTexto);
      setRespuestaIA(data.respuesta || "Sin respuesta");
      setEstadoTexto("Respuesta recibida");
      setEstadoTipo("ok");
    } catch (error) {
      setEstadoTexto(`No se pudo consultar al chat: ${error.message}`);
      setEstadoTipo("error");
    } finally {
      setCargandoChat(false);
    }
  }

  return (
    <div className="page-wrap">
      <header className="top-header">
        <div>
          <p className="kicker">Clase 11</p>
          <h1>Task Manager IA</h1>
        </div>
      </header>

      <StatusBanner text={estadoTexto} type={estadoTipo} />

      <main className="layout">
        <section className="panel">
          <h2>Mis tareas</h2>
          <TaskInput onSubmit={agregarTarea} disabled={cargandoTareas} />
          <h3>Lista de tareas</h3>
          {cargandoTareas && !tareas.length ? (
            <p className="empty-msg">Cargando...</p>
          ) : (
            <TaskList items={tareas} />
          )}
        </section>

        <ChatPanel onAsk={preguntarAI} loading={cargandoChat} response={respuestaIA} />
      </main>
    </div>
  );
}
