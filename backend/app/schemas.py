from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    texto: str = Field(min_length=3, max_length=180)


class TaskOut(BaseModel):
    id: int
    texto: str
    completada: bool
    created_at: str


class TaskListResponse(BaseModel):
    items: list[TaskOut]
    total: int


class ChatRequest(BaseModel):
    pregunta: str = Field(min_length=3, max_length=500)
    tareas: list[str] = Field(min_length=1, max_length=50)


class ChatResponse(BaseModel):
    respuesta: str
    modelo: str
    tokens_estimados: int | None = None
