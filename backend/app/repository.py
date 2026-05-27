from app.config import Settings
from app.db import get_conn


def create_task(settings: Settings, texto: str) -> dict:
    with get_conn(settings) as conn:
        cursor = conn.execute(
            "INSERT INTO tareas (texto, completada) VALUES (?, 0)",
            (texto,),
        )
        task_id = cursor.lastrowid
        row = conn.execute(
            "SELECT id, texto, completada, created_at FROM tareas WHERE id = ?",
            (task_id,),
        ).fetchone()
    return _row_to_task(row)


def list_tasks(settings: Settings) -> list[dict]:
    with get_conn(settings) as conn:
        rows = conn.execute(
            "SELECT id, texto, completada, created_at FROM tareas ORDER BY id DESC"
        ).fetchall()
    return [_row_to_task(row) for row in rows]


def _row_to_task(row) -> dict:
    return {
        "id": row["id"],
        "texto": row["texto"],
        "completada": bool(row["completada"]),
        "created_at": row["created_at"],
    }
