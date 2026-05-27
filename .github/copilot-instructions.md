# Copilot Instructions

Construye este repo como un PoC simple de una app de tareas con chat IA.

## Reglas generales

- Mantén el flujo corto y claro.
- Prioriza crear tareas, listar tareas y consultar al chat.
- Evita sobreingeniería y dependencias innecesarias.
- Escribe todo en español.
- Usa nombres simples y descriptivos.

## Backend

- Usa FastAPI o una alternativa similar.
- Crea una API pequeña.
- Separa tareas, lógica de negocio e integración con la IA.
- Guarda secretos en variables de entorno.
- Expón solo los endpoints necesarios.
- Devuelve respuestas simples y fáciles de explicar.

## Frontend

- Usa React.
- Construye una interfaz simple y limpia.
- Divide la pantalla en tareas y chat IA.
- Permite agregar tareas, ver la lista y enviar preguntas.
- Muestra respuestas claras y directas.
- Evita estado, componentes o librerías extra si no hacen falta.

## Flujo de la app

- Recibe tareas desde el frontend.
- Envía tareas y pregunta al backend.
- Llama a la IA desde el backend.
- Devuelve una respuesta útil para priorizar u organizar.

## Estilo de trabajo

- Escribe código legible.
- Respeta el estilo existente del proyecto.
- Mantén cada cambio pequeño.
- Añade comentarios solo si son necesarios.
