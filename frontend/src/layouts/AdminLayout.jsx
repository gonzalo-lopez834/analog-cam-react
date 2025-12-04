import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/UseAuthContext";
import { toast } from 'react-toastify';

export const AdminLayout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Sesión cerrada");
        navigate("/");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link className="navbar-brand" to="/admin">Admin Panel</Link>
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link" to="/">Ir a Tienda</Link>
                            <button 
                                className="btn btn-outline-light btn-sm" 
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};