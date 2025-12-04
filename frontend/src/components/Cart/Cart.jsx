import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";
import { FaTrash, FaCheckCircle, FaBroom, FaHome } from "react-icons/fa";
import "./Cart.css";

export const Cart = () => {
  const { cart, clearCart, deleteItem, total, checkout } = useCartContext();

  return (
    <section className="item-list-container">
      <h2>Carrito de compras</h2>

      {cart.length ? (
        cart.map((prod) => (
          <Item key={prod.id} {...prod}>
            <span>Cantidad: {prod.quantity}</span>
            <button className="btn" onClick={() => deleteItem(prod.id)} aria-label="Eliminar producto del carrito">
              <FaTrash /> Eliminar
            </button>
          </Item>
        ))
      ) : (
        <p>Carrito Vacio</p>
      )}

      {cart.length ? (
        <div className="btn-container">
          <div className="total-pagar">
            <p>Total a pagar: ${total()}</p>
          </div>
          <button className="btn" onClick={checkout} aria-label="Finalizar compra">
            <FaCheckCircle /> Finalizar compra
          </button>
          <button className="btn" onClick={clearCart} aria-label="Vaciar carrito">
            <FaBroom /> Vaciar carrito
          </button>
        </div>
      ) : (
        <Link className="btn" to="/" aria-label="Volver al inicio">
          <FaHome /> Volver al inicio
        </Link>
      )}
    </section>
  );
};