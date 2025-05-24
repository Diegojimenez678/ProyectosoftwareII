from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from routers.estado import estado_router
from routers.user import user_router
from routers.ag import ag_router
from routers.hn import hn_router
from routers.nt import nt_router
from routers.uz import uz_router
from routers.audios import audio_router

# --- NUEVAS IMPORTACIONES Y LÍNEAS PARA EL .ENV ---
import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
# Es buena práctica hacerlo lo más pronto posible en tu script principal
load_dotenv()

# Ahora puedes obtener la URL de la API desde la variable de entorno
API_BASE_URL = os.getenv("API_BASE_URL")

# Puedes usar esta variable si la necesitas en algún lugar de tu configuración
# Por ejemplo, para añadirla a los 'origins' si la URL base de tu API es también un origen permitido.
# O simplemente para fines de depuración o para pasarla a routers si la necesitan.
# print(f"API_BASE_URL cargada desde .env: {API_BASE_URL}")
# --- FIN DE LAS NUEVAS LÍNEAS ---


app = FastAPI(
    title='BRAILLE',
    description='API de aprendizaje braille ',
    version='0.0.1',
)

# Aquí puedes decidir si quieres usar API_BASE_URL en tus orígenes
# Por ejemplo, si tu frontend corre en la misma URL de tu backend
origins = [
    "http://localhost:3000",
    "https://master--codebraille.netlify.app",
    # Opcional: Si la URL de tu propia API también necesita ser un origen CORS
    # Esto es más común si tu API es consumida por algo que corre en la misma dirección,
    # aunque no es estrictamente necesario para la API misma si solo la estás ejecutando.
    # API_BASE_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ErrorHandler)
app.include_router(estado_router)
app.include_router(user_router)
app.include_router(ag_router)
app.include_router(hn_router)
app.include_router(nt_router)
app.include_router(uz_router)
app.include_router(audio_router)


# Esto crea las tablas en la base de datos si no existen, basándose en tus modelos definidos en Base.
Base.metadata.create_all(bind=engine)

# Puedes añadir un endpoint de prueba para verificar que la URL se carga correctamente
@app.get("/api-info")
async def get_api_info():
    return {"message": "API Braille funcionando", "api_base_url_from_env": API_BASE_URL}