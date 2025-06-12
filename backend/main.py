from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductoBase(BaseModel):
    nombre: str
    precio: float


class Producto(ProductoBase):
    id: int


productos: List[Producto] = []
next_id = 1 

@app.get("/productos", response_model=List[Producto])
def obtener_productos():
    return productos

@app.post("/productos", response_model=Producto)
def agregar_producto(producto_data: ProductoBase):
    global next_id
    nuevo_producto = Producto(id=next_id, **producto_data.dict())
    productos.append(nuevo_producto)
    next_id += 1
    return nuevo_producto

@app.delete("/productos/{id}")
def eliminar_producto(id: int):
    global productos
    for producto in productos:
        if producto.id == id:
            productos = [p for p in productos if p.id != id]
            return {"mensaje": "Producto eliminado"}
    raise HTTPException(status_code=404, detail="Producto no encontrado")
