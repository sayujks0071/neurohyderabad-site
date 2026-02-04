import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cognee
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="MRI Report Analyzer")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev/demo; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "/tmp/mri_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "MRI Analyzer"}

@app.post("/analyze")
async def analyze_mri(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Ingest into Cognee
        # Note: Cognee's add() method handles reading the file path.
        print(f"Ingesting file: {file_path}")
        await cognee.add(file_path)

        # Build knowledge graph
        print("Cognifying...")
        await cognee.cognify()

        # Query Cognee for analysis
        # We ask specifically for findings and interpretations relevant to an MRI report
        query = "Analyze this MRI report. List specific findings, any mentioned abnormalities, and the overall impression."
        print(f"Searching: {query}")
        results = await cognee.search(query)
        
        # Cleanup
        os.remove(file_path)

        return JSONResponse(content={"analysis": results})

    except Exception as e:
        print(f"Error: {str(e)}")
        return HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
