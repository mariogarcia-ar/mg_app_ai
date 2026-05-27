from fastapi import APIRouter, HTTPException, status

from app.config import get_settings
from app.repository import create_task, list_tasks
from app.schemas import ChatRequest, ChatResponse, TaskCreate, TaskListResponse, TaskOut
from app.services.openai_service import ask_openai

router = APIRouter(prefix="/api/v1", tags=["app"])


@router.get("/health")
def health() -> dict:
    return {"status": "ok"}


@router.post("/tareas", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def post_tarea(payload: TaskCreate) -> TaskOut:
    settings = get_settings()
    task = create_task(settings, payload.texto.strip())
    return TaskOut(**task)


@router.get("/tareas", response_model=TaskListResponse)
def get_tareas() -> TaskListResponse:
    settings = get_settings()
    items = [TaskOut(**task) for task in list_tasks(settings)]
    return TaskListResponse(items=items, total=len(items))


@router.post("/chat", response_model=ChatResponse)
def post_chat(payload: ChatRequest) -> ChatResponse:
    settings = get_settings()

    pregunta = payload.pregunta.strip()
    tareas = [t.strip() for t in payload.tareas if t.strip()]
    if not pregunta:
        raise HTTPException(status_code=400, detail="La pregunta es obligatoria")
    if not tareas:
        raise HTTPException(status_code=400, detail="Debe enviar al menos una tarea")

    try:
        respuesta, tokens = ask_openai(settings, pregunta, tareas)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=504, detail="Error al consultar OpenAI") from exc

    return ChatResponse(
        respuesta=respuesta,
        modelo=settings.openai_model,
        tokens_estimados=tokens,
    )
