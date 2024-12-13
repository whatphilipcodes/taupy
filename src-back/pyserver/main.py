import sys
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

PORT_API = 8008

# Enable immediate prints in dev mode
if "-dev" in sys.argv:
    sys.stdout.reconfigure(line_buffering=True)

app = FastAPI(
    title="taupy-backend-api",
    version="0.0.1",
)

# CORS config
origins = [
    "http://localhost:1420",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/favicon.ico")
async def favicon():
    return {}


@app.get("/")
async def root():
    return {
        "message": f"pyserver backend api root. Head to 'http://localhost:{PORT_API}/docs' to test out routes in the browser."
    }


@app.get("/api/v1/connect")
async def connect():
    return {
        "message": f"Connected to api server on port {PORT_API}. Refer to 'http://localhost:{PORT_API}/docs' for api docs.",
    }


def start_api_server():
    try:
        print("Starting API server...")
        uvicorn.run(app, host="0.0.0.0", port=PORT_API, log_level="info")
        return True
    except HTTPException as e:
        print("Failed to start API server")
        print(e)
        return False


if __name__ == "__main__":
    start_api_server()