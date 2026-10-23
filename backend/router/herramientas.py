from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import (
    get_todas_herramientas, get_one_herramienta_id,
    get_herramienta_por_nombre, create_herramienta,
    update_herramienta, delete_herramienta
)
from models import Herramienta, UpdateHerramienta

herramientas_router = APIRouter()


@herramientas_router.get('/api/herramientas')
async def get_herramientas():
    return await get_todas_herramientas()


@herramientas_router.post('/api/herramientas')
async def save_herramienta(datos: Herramienta):
    if await get_herramienta_por_nombre(datos.herramienta):
        raise HTTPException(status_code=400, detail="La herramienta ya existe")

    dict_h = datos.model_dump()
    if dict_h.get('id') is None:
        del dict_h['id']
    return await create_herramienta(dict_h)


@herramientas_router.get('/api/herramientas/{id}', response_model=Herramienta)
async def get_herramienta(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")
    h = await get_one_herramienta_id(id)
    if h:
        return h
    raise HTTPException(404, f'Herramienta {id} no encontrada')


@herramientas_router.put('/api/herramientas/{id}', response_model=Herramienta)
async def put_herramienta(id: str, datos: UpdateHerramienta):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")
    resp = await update_herramienta(id, datos)
    if resp:
        return resp
    raise HTTPException(404, f'Herramienta {id} no encontrada')


@herramientas_router.delete('/api/herramientas/{id}')
async def remove_herramienta(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")
    if await delete_herramienta(id):
        return 'Herramienta borrada satisfactoriamente'
    raise HTTPException(404, f'Herramienta {id} no encontrada')