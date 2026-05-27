# **Clase 11 — App de Tareas con Chat IA**

## **Objetivo**

Construir y entender una aplicación simple donde el usuario pueda:

1. crear tareas  
2. ver una lista de tareas  
3. hablar con un chat  
4. pedirle a la IA que priorice, ordene o analice esas tareas

# **Flujo Principal de la App**

## **Usuario**

Carga tareas como:

Estudiar para el examen  
Responder mails  
Preparar presentación  
Comprar materiales

Luego le pregunta al chat:

¿Qué debería hacer primero?

La app envía esas tareas a la **API de ChatGPT**.

ChatGPT responde:

Te recomiendo empezar por preparar la presentación, luego estudiar, después responder mails y finalmente comprar materiales.

# **Conceptos que explicás con este único flujo**

## **1\. Frontend**

Es la parte que ve el usuario.

En nuestra app:

* input para escribir tareas  
* botón “Agregar”  
* lista de tareas  
* chat para hacer preguntas

Frase simple:

“El frontend es la pantalla con la que interactúa la persona.”

## **2\. Backend**

Es la parte que trabaja detrás.

En nuestra app:

* recibe las tareas  
* recibe la pregunta del usuario  
* arma el pedido para ChatGPT  
* devuelve la respuesta al frontend

Frase simple:

“El backend es el intermediario entre la pantalla y la inteligencia artificial.”

## **3\. API**

Es la forma en que dos sistemas se comunican.

En nuestra app:

* nuestro backend habla con la API de ChatGPT  
* le manda tareas \+ pregunta  
* recibe una respuesta

Frase simple:

“Una API es como un mozo digital: lleva un pedido y trae una respuesta.”

## **4\. ChatGPT API**

Es el modelo de IA usado dentro de la aplicación.

No entramos a ChatGPT manualmente.  
La app usa ChatGPT por detrás.

Frase clave:

“La diferencia es que ahora ChatGPT no está en una pestaña aparte: vive dentro de nuestra aplicación.”

# **Arquitectura Simple para Mostrar en Clase**

Usuario  
  ↓  
Frontend  
  ↓  
Backend  
  ↓  
ChatGPT API  
  ↓  
Backend  
  ↓  
Frontend  
  ↓  
Usuario ve la respuesta

# **App Elegida: Task Manager con Chat IA**

## **Pantalla de la app**

Debe tener:

### **Sección 1 — Mis tareas**

* campo para escribir tarea  
* botón agregar  
* lista de tareas

### **Sección 2 — Chat IA**

* campo para preguntar  
* botón enviar  
* respuesta de la IA

# **Ejemplos de preguntas al chat**

¿Qué tarea debería hacer primero?

Organizame estas tareas por prioridad.

¿Cuáles parecen urgentes?

Armame un plan de trabajo para hoy.

¿Cuánto tiempo debería dedicarle a cada una?