from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from models import Herramienta, UpdateHerramienta

cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.ferreteriadatabase
coleccion = database.herramientas


async def get_one_herramienta_id(id: str):
    doc = await coleccion.find_one({'_id': ObjectId(id)})
    if doc:
        doc['_id'] = str(doc['_id'])
    return doc


async def get_herramienta_por_nombre(nombre: str):
    return await coleccion.find_one({'herramienta': nombre})


async def get_todas_herramientas():
    herramientas = []
    cursor = coleccion.find({})
    async for doc in cursor:
        doc['_id'] = str(doc['_id'])
        herramientas.append(Herramienta(**doc))
    return herramientas


async def create_herramienta(data: dict):
    nuevo = await coleccion.insert_one(data)
    creado = await coleccion.find_one({'_id': nuevo.inserted_id})
    if creado:
        creado['_id'] = str(creado['_id'])
    return creado


async def update_herramienta(id: str, data: UpdateHerramienta):
    campos = data.model_dump(by_alias=True, exclude_none=True)
    campos.pop('_id', None)
    if campos:
        await coleccion.update_one({'_id': ObjectId(id)}, {'$set': campos})
    doc = await coleccion.find_one({'_id': ObjectId(id)})
    if doc:
        doc['_id'] = str(doc['_id'])
    return doc


async def delete_herramienta(id: str):
    result = await coleccion.delete_one({'_id': ObjectId(id)})
    return result.deleted_count > 0