"""
FastAPI app to serve HTML files for local preview.
Pure HTML files - no templating, ready for copy/paste to Squarespace.
"""

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI(title="TranslationalAI Website Preview")

# Base directory for HTML files
BASE_DIR = Path(__file__).parent


def read_html_file(filename: str) -> str:
    """Read HTML file and return content."""
    file_path = BASE_DIR / filename
    if not file_path.exists():
        return f"<h1>File not found: {filename}</h1>"
    return file_path.read_text(encoding="utf-8")


@app.get("/", response_class=HTMLResponse)
async def index():
    """Index navigation page"""
    return read_html_file("index.html")


@app.get("/home", response_class=HTMLResponse)
async def home():
    """Homepage - main.html"""
    return read_html_file("main.html")


@app.get("/lightscribe", response_class=HTMLResponse)
async def lightscribe():
    """LightScribe page"""
    return read_html_file("lightscribe.html")


@app.get("/chartprepper", response_class=HTMLResponse)
async def chartprepper():
    """ChartPrepper page"""
    return read_html_file("chartprepper.html")


@app.get("/partner-in-practice", response_class=HTMLResponse)
async def partner_in_practice():
    """Partner in Practice page"""
    return read_html_file("partner-in-practice.html")


@app.get("/api-integration", response_class=HTMLResponse)
async def api_integration():
    """API Integration page"""
    return read_html_file("api-integration.html")


# Simple versions
@app.get("/home-simple", response_class=HTMLResponse)
async def home_simple():
    """Simplified homepage"""
    return read_html_file("main-simple.html")


@app.get("/lightscribe-simple", response_class=HTMLResponse)
async def lightscribe_simple():
    """Simplified LightScribe page"""
    return read_html_file("lightscribe-simple.html")


@app.get("/chartprepper-simple", response_class=HTMLResponse)
async def chartprepper_simple():
    """Simplified ChartPrepper page"""
    return read_html_file("chartprepper-simple.html")


@app.get("/partner-in-practice-simple", response_class=HTMLResponse)
async def partner_in_practice_simple():
    """Simplified Partner in Practice page"""
    return read_html_file("partner-in-practice-simple.html")


@app.get("/api-integration-simple", response_class=HTMLResponse)
async def api_integration_simple():
    """Simplified API Integration page"""
    return read_html_file("api-integration-simple.html")


@app.get("/team", response_class=HTMLResponse)
async def team():
    """Team/About page"""
    return read_html_file("team.html")


if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("fastapi_app:app", host="0.0.0.0", port=port, reload=True)

