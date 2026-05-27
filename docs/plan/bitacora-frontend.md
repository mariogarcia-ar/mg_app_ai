# Bitacora de Progreso Frontend

## 2026-05-27

### Estado
En progreso.

### Avances completados
- Se inicio proyecto frontend con React + Vite.
- Se implemento pantalla unica con dos secciones:
  - Mis tareas
  - Chat IA
- Se crearon componentes base:
  - TaskInput
  - TaskList
  - ChatPanel
  - StatusBanner
- Se integro cliente API para conectar con backend:
  - GET /api/v1/tareas
  - POST /api/v1/tareas
  - POST /api/v1/chat
- Se agrego estilo responsive para desktop y mobile.

### Pendientes inmediatos
- Probar flujo completo con backend levantado.
- Ajustar mensajes de error segun respuestas reales.
- Definir origen final para CORS y URL de API por ambiente.
- Agregar pruebas basicas de componentes.

### Riesgos
- Si backend no esta levantado, la UI mostrara errores de conexion.
- Si OPENAI_API_KEY no es valida, el chat fallara en backend.
