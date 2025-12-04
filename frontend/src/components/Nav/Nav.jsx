import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { useAuthContext } from "../../context/AuthContext/UseAuthContext";
import { FaShoppingCart, FaToolbox, FaSignInAlt } from "react-icons/fa";
import './Nav.css';

export const Nav = () => {
    const { getTotalItems } = useCartContext();
    const { user } = useAuthContext();

    return (
        <nav>
            <ul>
                <li className="logo-item">
                    <Link to={"/"} aria-label="Ir al inicio">
                        <img src="/logo.png" alt="AnalogCam Logo" className="nav-logo" />
                    </Link>
                </li>
                <li>
                    <Link to={"/"}> Home </Link>
                </li>
                <li>
                    <Link to={"/category/SLR"}> SLR </Link>
                </li>
                <li>
                    <Link to={"/category/Compactas"}> Compactas </Link>
                </li>
                <li>
                    <Link to={"carrito"} aria-label="Ver carrito de compras"> 
                        <FaShoppingCart /> Carrito ({getTotalItems() || 0})
                    </Link>
                </li>
                {user ? (
                    <li>
                        <Link to={"/admin"} className="admin-link" aria-label="Acceder al panel de administración"> 
                            <FaToolbox /> Admin Panel 
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to={"/login"} className="login-link" aria-label="Iniciar sesión"> 
                            <FaSignInAlt /> Login 
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};
