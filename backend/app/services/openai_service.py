from openai import OpenAI

from app.config import Settings


def ask_openai(settings: Settings, pregunta: str, tareas: list[str]) -> tuple[str, int | None]:
    if not settings.openai_api_key:
        raise RuntimeError("Falta OPENAI_API_KEY")

    client = OpenAI(api_key=settings.openai_api_key)

    tareas_en_texto = "\n".join([f"- {tarea}" for tarea in tareas])
    instruccion = (
        "Sos un asistente que organiza tareas en espanol. "
        "Responde directo, claro y en menos de 120 palabras."
    )
    contenido = (
        f"Tareas:\n{tareas_en_texto}\n\n"
        f"Pregunta del usuario: {pregunta}\n"
        "Devuelve una recomendacion concreta en orden sugerido."
    )

    response = client.responses.create(
        model=settings.openai_model,
        input=[
            {"role": "system", "content": instruccion},
            {"role": "user", "content": contenido},
        ],
    )

    texto = (response.output_text or "").strip()
    if not texto:
        raise RuntimeError("OpenAI no devolvio texto")

    tokens_estimados = None
    if response.usage:
        tokens_estimados = response.usage.total_tokens

    return texto, tokens_estimados
