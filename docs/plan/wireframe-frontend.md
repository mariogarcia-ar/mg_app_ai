# Wireframe Frontend - App de Tareas con Chat IA

## Objetivo
Definir una maqueta simple de la pantalla principal para implementar el frontend en React.

## Wireframe Desktop

```text
+----------------------------------------------------------------------------------+
|                              APP: Task Manager IA                               |
+----------------------------------------------------------------------------------+
| [Logo/Nombre]                                                  [Estado de API]   |
+--------------------------------------+-------------------------------------------+
| MIS TAREAS                           | CHAT IA                                   |
|--------------------------------------|-------------------------------------------|
| Nueva tarea                          | Pregunta para la IA                       |
| +----------------------------------+ | +---------------------------------------+ |
| | Escribir tarea...                | | | Ej: Que deberia hacer primero?       | |
| +----------------------------------+ | +---------------------------------------+ |
| [Agregar]                            | [Enviar]                                  |
|                                      |                                           |
| Lista de tareas                      | Respuesta IA                              |
| +----------------------------------+ | +---------------------------------------+ |
| | 1. Estudiar para el examen      | | | Te recomiendo empezar por...          | |
| | 2. Responder mails              | | | ...                                   | |
| | 3. Preparar presentacion        | | +---------------------------------------+ |
| | 4. Comprar materiales           | |                                           |
| +----------------------------------+ | Historial breve (opcional)               |
|                                      | +---------------------------------------+ |
|                                      | | Tu: Organiza por prioridad             | |
|                                      | | IA: 1) ... 2) ...                     | |
|                                      | +---------------------------------------+ |
+--------------------------------------+-------------------------------------------+
| Mensajes del sistema: Cargando..., Error de red, Sin tareas                     |
+----------------------------------------------------------------------------------+
```

## Wireframe Mobile

```text
+--------------------------------------+
| APP: Task Manager IA                 |
+--------------------------------------+
| MIS TAREAS                           |
| Nueva tarea                          |
| +----------------------------------+ |
| | Escribir tarea...                | |
| +----------------------------------+ |
| [Agregar]                            |
| Lista de tareas                      |
| +----------------------------------+ |
| | 1. Estudiar...                   | |
| | 2. Responder...                  | |
| +----------------------------------+ |
+--------------------------------------+
| CHAT IA                              |
| Pregunta para la IA                  |
| +----------------------------------+ |
| | Que deberia hacer primero?       | |
| +----------------------------------+ |
| [Enviar]                             |
| Respuesta IA                         |
| +----------------------------------+ |
| | Te recomiendo...                 | |
| +----------------------------------+ |
+--------------------------------------+
```

## Jerarquia visual sugerida
1. Titulo de app y estado de conexion.
2. Accion primaria de tareas: agregar tarea.
3. Accion primaria de chat: enviar pregunta.
4. Contenido principal: lista de tareas y respuesta IA.

## Estados de UI
- Vacio tareas: mostrar mensaje "Aun no hay tareas".
- Carga chat: bloquear boton Enviar y mostrar "Analizando...".
- Error API: mostrar mensaje simple y accion para reintentar.

## Componentes minimos
- `TaskInput`
- `TaskList`
- `ChatInput`
- `ChatResponse`
- `StatusBanner`

## Notas de implementacion
- Desktop: usar grilla de 2 columnas (50/50).
- Mobile: apilar secciones en una sola columna.
- Mantener textos y mensajes en espanol claro.
