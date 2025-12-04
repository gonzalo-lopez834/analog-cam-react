import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext/UseAuthContext";
import { toast } from 'react-toastify';
import { FaPlus, FaList, FaStore, FaSignOutAlt } from "react-icons/fa";
import './AdminNav.css';

export const AdminNav = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
    <nav className="admin-nav">
      <div className="container">
        <h5>Panel de Administración</h5>
        <div className="admin-nav-links">
          <Link to="/admin" className="btn btn-sm btn-outline-light" aria-label="Agregar nuevo producto">
            <FaPlus /> Agregar Producto
          </Link>
          <Link to="/admin/products" className="btn btn-sm btn-outline-light" aria-label="Ver lista de productos">
            <FaList /> Ver Productos
          </Link>
          <Link to="/" className="btn btn-sm btn-outline-info" aria-label="Ir a la tienda">
            <FaStore /> Ir a Tienda
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger" aria-label="Cerrar sesión">
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};