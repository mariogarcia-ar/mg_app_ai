#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUN_DIR="$ROOT_DIR/.run"

BACKEND_PID_FILE="$RUN_DIR/backend.pid"
FRONTEND_PID_FILE="$RUN_DIR/frontend.pid"

BACKEND_LOG="$RUN_DIR/backend.log"
FRONTEND_LOG="$RUN_DIR/frontend.log"

mkdir -p "$RUN_DIR"

is_running() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

ensure_frontend_deps() {
  local frontend_dir="$ROOT_DIR/frontend"

  if [[ ! -f "$frontend_dir/package.json" ]]; then
    echo "No se encontro frontend/package.json"
    exit 1
  fi

  if [[ ! -d "$frontend_dir/node_modules" ]]; then
    echo "Instalando dependencias frontend (npm install)..."
    (
      cd "$frontend_dir"
      npm install --no-audit --no-fund
    )
  fi
}

ensure_service_started() {
  local name="$1"
  local pid_file="$2"
  local log_file="$3"

  if [[ ! -f "$pid_file" ]]; then
    echo "No se pudo iniciar $name: falta archivo PID"
    exit 1
  fi

  local pid
  pid="$(cat "$pid_file")"
  if ! is_running "$pid"; then
    echo "No se pudo iniciar $name. Ultimas lineas del log:"
    tail -n 40 "$log_file" || true
    exit 1
  fi
}

start_backend() {
  if [[ -f "$BACKEND_PID_FILE" ]]; then
    local existing_pid
    existing_pid="$(cat "$BACKEND_PID_FILE")"
    if is_running "$existing_pid"; then
      echo "Backend ya esta corriendo (PID: $existing_pid)"
      return
    fi
    rm -f "$BACKEND_PID_FILE"
  fi

  echo "Iniciando backend en :8000"
  (
    cd "$ROOT_DIR"
    nohup uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000 \
      >"$BACKEND_LOG" 2>&1 &
    echo $! >"$BACKEND_PID_FILE"
  )
  ensure_service_started "backend" "$BACKEND_PID_FILE" "$BACKEND_LOG"
  echo "Backend iniciado (PID: $(cat "$BACKEND_PID_FILE"))"
}

start_frontend() {
  if [[ -f "$FRONTEND_PID_FILE" ]]; then
    local existing_pid
    existing_pid="$(cat "$FRONTEND_PID_FILE")"
    if is_running "$existing_pid"; then
      echo "Frontend ya esta corriendo (PID: $existing_pid)"
      return
    fi
    rm -f "$FRONTEND_PID_FILE"
  fi

  ensure_frontend_deps

  echo "Iniciando frontend en :5173"
  (
    cd "$ROOT_DIR/frontend"
    nohup npm run dev -- --host 0.0.0.0 --port 5173 >"$FRONTEND_LOG" 2>&1 &
    echo $! >"$FRONTEND_PID_FILE"
  )
  ensure_service_started "frontend" "$FRONTEND_PID_FILE" "$FRONTEND_LOG"
  echo "Frontend iniciado (PID: $(cat "$FRONTEND_PID_FILE"))"
}

start_backend
start_frontend

echo ""
echo "Servicios levantados:"
echo "- Backend:  http://127.0.0.1:8000"
echo "- Frontend: http://127.0.0.1:5173"
echo ""
echo "Logs:"
echo "- $BACKEND_LOG"
echo "- $FRONTEND_LOG"
