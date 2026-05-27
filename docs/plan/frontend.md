# Plan de Implementación Frontend

## Objetivo
Construir una interfaz React simple y clara para:
- crear tareas
- listar tareas
- consultar al chat IA

## Alcance
- Una sola pantalla con 2 secciones: Mis tareas y Chat IA.
- Estado local simple con `useState`.
- Sin librerías extra innecesarias.

## Fase 1: Estructura base
1. Crear layout principal con dos bloques:
   - Mis tareas
   - Chat IA
2. Definir componentes mínimos:
   - formulario de nueva tarea
   - lista de tareas
   - formulario de pregunta al chat
   - área de respuesta
3. Mantener estilos básicos y legibles.

## Fase 2: Funcionalidad de tareas
1. Implementar input de nueva tarea.
2. Implementar botón Agregar.
3. Mostrar lista de tareas cargadas.
4. Validar que no se agreguen tareas vacías.

## Fase 3: Funcionalidad de chat
1. Implementar input para pregunta del usuario.
2. Implementar botón Enviar.
3. Mostrar estado de carga mientras responde la IA.
4. Mostrar mensaje de error simple si falla la solicitud.

## Fase 4: Integración con backend
1. Crear cliente API simple para:
   - obtener tareas
   - crear tarea
   - enviar pregunta con tareas al endpoint de chat
2. Conectar la UI al backend con `fetch`.
3. Actualizar la pantalla según respuestas del backend.

## Fase 5: Experiencia de uso
1. Deshabilitar botones durante requests.
2. Mostrar textos claros en español.
3. Ajustar diseño para desktop y móvil.

## Criterios de aceptación
- Se puede agregar una tarea y verla en la lista.
- Se pueden ver las tareas disponibles sin recargar.
- Se puede enviar una pregunta al chat y recibir respuesta.
- El usuario ve mensajes claros de carga y error.
