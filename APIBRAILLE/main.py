from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import engine,Base
from middlewares.error_handler import ErrorHandler
from routers.estado import estado_router
from routers.user import user_router
from routers.ag import ag_router
from routers.hn import hn_router
from routers.nt import nt_router
from routers.uz import uz_router
from routers.audios import audio_router

app = FastAPI(
    title= 'BRAILLE',
    description= 'API de aprendizaje braille ',
    version= '0.0.1',
)


origins = [    
    "http://localhost:3000",
    "https://master--codebraille.netlify.app",
    
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


Base.metadata.create_all(bind=engine)



