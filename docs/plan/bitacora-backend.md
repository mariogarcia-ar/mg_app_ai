# Bitacora de Progreso Backend

## 2026-05-27

### Estado
En progreso.

### Avances completados
- Se inicializo estructura base del backend en FastAPI.
- Se agrego configuracion inicial por variables de entorno.
- Se implemento persistencia de tareas con SQLite3.
- Se crearon endpoints base:
  - `GET /api/v1/health`
  - `POST /api/v1/tareas`
  - `GET /api/v1/tareas`
  - `POST /api/v1/chat`
- Se integro servicio OpenAI para responder consultas del chat.
- Se corrigio la carga de variables desde `.env` usando `python-dotenv`.

### Pendientes inmediatos
- Agregar manejo de errores mas detallado por tipo.
- Agregar tests minimos de endpoints.
- Ajustar CORS para origen especifico del frontend.
- Documentar ejemplos de request/response en README de backend.

### Riesgos
- Sin `OPENAI_API_KEY` el endpoint de chat devolvera error.
- Falta cubrir tests de regresion.

### Incidencias resueltas
- Error reportado: `Falta OPENAI_API_KEY` aun con `.env` presente.
- Causa: el backend no cargaba el archivo `.env`.
- Solucion: carga automatica de `.env` desde rutas esperadas en `app/config.py`.
