# Backend - Task Manager IA

API pequena en FastAPI con persistencia SQLite3 y consulta de OpenAI.

## Requisitos
- Python 3.11+

## Configuracion
1. Crear entorno virtual.
2. Instalar dependencias.
3. Copiar `.env.example` a `.env` y completar `OPENAI_API_KEY`.

## Ejecutar
```bash
uvicorn app.main:app --reload --app-dir backend
```

## Endpoints
- `GET /api/v1/health`
- `POST /api/v1/tareas`
- `GET /api/v1/tareas`
- `POST /api/v1/chat`
