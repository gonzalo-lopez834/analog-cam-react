import { useState } from "react";
import { Item } from "../Item/Item";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import './ItemDetail.css';

export const ItemDetail = ({ detail }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartContext();

    const handleAdd = () => {
        addToCart({ ...detail, quantity });
    }

    const increment = () => {
        if (quantity < (detail.stock || 10)) {
            setQuantity(quantity + 1);
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="item-detail">
            <Item {...detail} >
                <div className="quantity-controls">
                    <button onClick={decrement} disabled={quantity <= 1} aria-label="Disminuir cantidad">
                        <FaMinus />
                    </button>
                    <span>Cantidad: {quantity}</span>
                    <button onClick={increment} disabled={quantity >= (detail.stock || 10)} aria-label="Aumentar cantidad">
                        <FaPlus />
                    </button>
                </div>
                <button onClick={handleAdd} className="add-to-cart-btn" aria-label="Agregar al carrito">
                    <FaShoppingCart /> Agregar al carrito
                </button>
            </Item>
        </div>
    );
}