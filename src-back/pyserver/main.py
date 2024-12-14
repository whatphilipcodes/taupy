import sys
import argparse
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import dataclass
from typing import Optional


@dataclass
class CommandLineArgs:
    dev: Optional[bool]
    port: Optional[int]
    devurl: Optional[str]


def parse_arguments() -> CommandLineArgs:
    parser = argparse.ArgumentParser(description="pyserver backend API")
    parser.add_argument(
        "--dev",
        "-d",
        action="store_true",
        default=False,
        help="enable development mode",
        required=False,
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="port number at which the uvicorn server is initialized at (default: 8000)",
        required=False,
    )
    parser.add_argument(
        "--devurl",
        type=str,
        default="http://localhost:1420",
        help="vite dev server url; must include a port number (default: http://localhost:1420)",
        required=False,
    )
    args = parser.parse_args()

    if args.port < 1024 or args.port > 65535:
        raise ValueError("Port must be between 1024 and 65535")

    return args


args = parse_arguments()
cors_origins = []

if args.dev:
    # Enable immediate prints in dev mode
    sys.stdout.reconfigure(line_buffering=True)
    # Add dev origin to CORS
    cors_origins.append(args.devurl)
else:
    cors_origins.append("tauri://localhost")  # default url at tauri build time

app = FastAPI(
    title="taupy-backend-api",
    version="1.0.0",
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/favicon.ico")
async def favicon():
    return {}


@app.get("/")
async def root():
    return {
        "message": f"pyserver backend API root. Head to 'http://localhost:{args.port}/docs' to test out routes in the browser."
    }


@app.get("/api/v1/connect")
async def connect():
    return {
        "message": f"connected to api server on port {args.port}. Refer to 'http://localhost:{args.port}/docs' for API docs.",
    }


def start_api_server():
    try:
        print("starting API server...")
        uvicorn.run(app, port=args.port)
        return True
    except HTTPException as e:
        print("failed to start API server")
        print(e)
        return False


if __name__ == "__main__":
    start_api_server()
