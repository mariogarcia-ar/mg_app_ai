#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUN_DIR="$ROOT_DIR/.run"

BACKEND_PID_FILE="$RUN_DIR/backend.pid"
FRONTEND_PID_FILE="$RUN_DIR/frontend.pid"
FORCE_MODE="${1:-}"

usage() {
  echo "Uso: ./stop.sh [--force]"
}

stop_process() {
  local name="$1"
  local pid_file="$2"

  if [[ ! -f "$pid_file" ]]; then
    echo "$name no tiene PID registrado"
    return
  fi

  local pid
  pid="$(cat "$pid_file")"

  if kill -0 "$pid" 2>/dev/null; then
    kill "$pid"
    echo "Deteniendo $name (PID: $pid)"
  else
    echo "$name no estaba corriendo (PID: $pid)"
  fi

  rm -f "$pid_file"
}

kill_port() {
  local port="$1"
  local pids=""

  if command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null | tr '\n' ' ')"
  elif command -v ss >/dev/null 2>&1; then
    pids="$(ss -lptn "sport = :$port" 2>/dev/null | awk -F'pid=' 'NF>1{print $2}' | awk -F',' '{print $1}' | tr '\n' ' ')"
  fi

  if [[ -z "$pids" ]]; then
    echo "No hay procesos escuchando en el puerto $port"
    return
  fi

  for pid in $pids; do
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      kill -9 "$pid"
      echo "Force stop puerto $port (PID: $pid)"
    fi
  done
}

if [[ -n "$FORCE_MODE" && "$FORCE_MODE" != "--force" ]]; then
  usage
  exit 1
fi

stop_process "backend" "$BACKEND_PID_FILE"
stop_process "frontend" "$FRONTEND_PID_FILE"

if [[ "$FORCE_MODE" == "--force" ]]; then
  kill_port "8000"
  kill_port "5173"
fi

echo "Procesos detenidos."
