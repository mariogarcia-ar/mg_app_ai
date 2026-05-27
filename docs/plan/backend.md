# Plan de Implementación Backend

## Objetivo
Construir una API pequeña con FastAPI para:
- gestionar tareas
- recibir preguntas del chat
- consultar la API de OpenAI

## Alcance
- Backend simple en capas mínimas:
  - rutas
  - lógica de negocio
  - integración IA
- Persistencia con SQLite3 para la PoC.
- Respuestas claras y fáciles de explicar.

## Fase 1: Base del servicio
1. Crear proyecto FastAPI mínimo.
2. Definir estructura simple de carpetas:
   - `api/` para rutas
   - `services/` para lógica
   - `db/` para conexión y modelos de base de datos
   - `schemas/` para modelos
3. Configurar arranque local, SQLite3 y variables de entorno.

## Fase 2: API de tareas
1. Definir modelo de tarea con Pydantic.
2. Implementar endpoint `POST /tareas` para crear tarea.
3. Implementar endpoint `GET /tareas` para listar tareas.
4. Guardar tareas en SQLite3.

## Fase 3: API de chat
1. Definir modelo de request con:
   - lista de tareas
   - pregunta del usuario
2. Implementar endpoint `POST /chat`.
3. Armar prompt simple en español para priorizar u organizar tareas.
4. Retornar respuesta directa y breve para el frontend.

## Fase 4: Integración con OpenAI
1. Leer clave API desde variable de entorno.
2. Crear cliente de IA en capa de servicios.
3. Manejar errores de integración (timeout, clave inválida, respuesta vacía).
4. Devolver errores controlados con mensajes simples.

## Fase 5: Integración con frontend
1. Configurar CORS para el origen del frontend.
2. Validar formatos de entrada y salida JSON.
3. Mantener contratos estables para evitar acoplamiento innecesario.

## Criterios de aceptación
- `POST /tareas` crea tareas correctamente.
- `GET /tareas` devuelve la lista actual.
- `POST /chat` recibe tareas y pregunta, y devuelve respuesta útil.
- La app funciona con clave IA en variable de entorno.
- Los errores se reportan con mensajes claros.

## Esquema de la API

### Convenciones generales
- Base URL local: `/api/v1`
- Formato: `application/json`
- Zona horaria recomendada: UTC para fechas
- Versionado por prefijo en rutas
- Persistencia: SQLite3

### Modelo de datos

#### Task
```json
{
   "id": "tsk_001",
   "texto": "Preparar presentacion",
   "completada": false,
   "created_at": "2026-05-27T10:30:00Z"
}
```

#### ErrorResponse
```json
{
   "error": {
      "code": "VALIDATION_ERROR",
      "message": "El campo texto es obligatorio"
   }
}
```

### Endpoints

#### 1) Healthcheck
- Metodo: `GET`
- Ruta: `/api/v1/health`
- Descripcion: verificar que la API este disponible.

Respuesta 200:
```json
{
   "status": "ok"
}
```

#### 2) Crear tarea
- Metodo: `POST`
- Ruta: `/api/v1/tareas`
- Descripcion: crear una nueva tarea.

Request body:
```json
{
   "texto": "Estudiar para el examen"
}
```

Respuesta 201:
```json
{
   "id": "tsk_001",
   "texto": "Estudiar para el examen",
   "completada": false,
   "created_at": "2026-05-27T10:30:00Z"
}
```

Errores:
- `400` si `texto` llega vacio.
- `422` si el body no cumple el esquema.

#### 3) Listar tareas
- Metodo: `GET`
- Ruta: `/api/v1/tareas`
- Descripcion: obtener todas las tareas.

Respuesta 200:
```json
{
   "items": [
      {
         "id": "tsk_001",
         "texto": "Estudiar para el examen",
         "completada": false,
         "created_at": "2026-05-27T10:30:00Z"
      },
      {
         "id": "tsk_002",
         "texto": "Preparar presentacion",
         "completada": false,
         "created_at": "2026-05-27T10:35:00Z"
      }
   ],
   "total": 2
}
```

#### 4) Consultar chat IA
- Metodo: `POST`
- Ruta: `/api/v1/chat`
- Descripcion: enviar pregunta del usuario con el contexto de tareas.

Request body:
```json
{
   "pregunta": "Que deberia hacer primero?",
   "tareas": [
      "Estudiar para el examen",
      "Responder mails",
      "Preparar presentacion",
      "Comprar materiales"
   ]
}
```

Respuesta 200:
```json
{
   "respuesta": "Te recomiendo empezar por preparar la presentacion, luego estudiar para el examen, despues responder mails y finalmente comprar materiales.",
   "modelo": "gpt-4.1-mini",
   "tokens_estimados": 180
}
```

Errores:
- `400` si `pregunta` llega vacia.
- `400` si `tareas` llega vacio.
- `502` si falla el proveedor de IA.
- `504` si la IA supera el timeout.

### Reglas de validacion sugeridas
- `texto`: string, minimo 3 caracteres, maximo 180.
- `pregunta`: string, minimo 3 caracteres, maximo 500.
- `tareas`: lista de strings, minimo 1 item, maximo 50 items.

### Seguridad y configuracion
- Variable obligatoria: `OPENAI_API_KEY`
- No exponer la clave en respuestas ni logs.
- Habilitar CORS solo para el frontend de la app.

### Contrato minimo para frontend
- El frontend solo necesita integrar:
   - `POST /api/v1/tareas`
   - `GET /api/v1/tareas`
   - `POST /api/v1/chat`
- Mantener nombres de campos en espanol para coherencia de clase y demo.
