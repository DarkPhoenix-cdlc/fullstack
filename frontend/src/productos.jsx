import { useState, useEffect } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [id] = useState("");

  const fetchProductos = async () => {
    const res = await fetch("http://localhost:8080/productos");
    const data = await res.json();
    setProductos(data);
  };

  const agregarProducto = async () => {
    await fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(id),
        nombre,
        precio: parseFloat(precio),
        disponible: true,
      }),
    });
    fetchProductos();
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:8080/productos/${id}`, {
      method: "DELETE",
    });
    fetchProductos();
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      <button onClick={agregarProducto}>Agregar</button>

     <ul>
  {productos.map(p => (
    <li key={p.id}>
      <strong>ID:</strong> {p.id} - <strong>Nombre:</strong> {p.nombre} - <strong>Precio:</strong> {p.precio}€
      <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
    </li>
  ))}
</ul>

    </div>
  );
}
