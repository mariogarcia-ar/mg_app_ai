import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


def _load_env_file() -> None:
    # Permite ejecutar desde la raiz del repo o desde la carpeta backend.
    backend_dir = Path(__file__).resolve().parent.parent
    candidates = [
        backend_dir / ".env",
        Path.cwd() / ".env",
        Path.cwd() / "backend" / ".env",
    ]
    for env_path in candidates:
        if env_path.exists():
            load_dotenv(env_path, override=False)
            break


_load_env_file()


@dataclass
class Settings:
    openai_api_key: str
    openai_model: str
    db_path: str


def get_settings() -> Settings:
    return Settings(
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
        openai_model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
        db_path=os.getenv("DB_PATH", "backend/data/app.db"),
    )
