from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]


class Herramienta(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    herramienta: str
    marca: str
    precio_unitario: float = Field(ge=0)
    stock_disponible: int = Field(default=0, ge=0)
    en_oferta: bool = False

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }


class UpdateHerramienta(BaseModel):
    herramienta: Optional[str] = None
    marca: Optional[str] = None
    precio_unitario: Optional[float] = Field(default=None, ge=0)
    stock_disponible: Optional[int] = Field(default=None, ge=0)
    en_oferta: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }