import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../services/products";
import { AdminNav } from "../AdminNav/AdminNav";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error(`Error al cargar productos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
      try {
        await deleteProduct(id);
        toast.success("Producto eliminado exitosamente");
        fetchProducts();
      } catch (error) {
        toast.error(`Error al eliminar: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <>
        <AdminNav />
        <div className="container mt-4">
          <p>Cargando productos...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNav />
      <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Link to="/admin" className="btn btn-primary" aria-label="Agregar nuevo producto">
          <FaPlus /> Agregar Producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info">
          No hay productos cargados. Agrega el primero!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price.toLocaleString()}</td>
                  <td>
                    <span className="badge bg-secondary">{product.category}</span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link 
                        to={`/admin/edit/${product.id}`} 
                        className="btn btn-sm btn-warning"
                        aria-label="Editar producto"
                      >
                        <FaEdit /> Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="btn btn-sm btn-danger"
                        aria-label="Eliminar producto"
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </>
  );
};