from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

audio_router = APIRouter()

@audio_router.get("/audio/{folder_name}/{audio_name}/file", tags=['Audio'])
async def get_audio(folder_name: str, audio_name: str):
    try:
        # Ruta al directorio de audio y nombre del archivo WAV
        audio_folder_path = Path(f"Audio/{folder_name}")
        file_name = f"{audio_name}.wav"
        file_path = audio_folder_path / file_name
        
        print(f"Buscando archivo en: {file_path}")
        
        if file_path.exists():
            return FileResponse(file_path, media_type="audio/wav")
        else:
            raise HTTPException(status_code=404, detail=f"Audio not found: {file_path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
