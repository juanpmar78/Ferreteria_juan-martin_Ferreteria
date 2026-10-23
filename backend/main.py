from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.herramientas import herramientas_router

app = FastAPI()

origins = [config('FRONTEND_URL')]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
def welcome():
    return {'message': 'Bienvenido a la API de la Ferretería'}


app.include_router(herramientas_router)