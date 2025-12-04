import { useState } from "react";
import { CartContext } from "./CartContext"

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const existsInCart = (id) => {
        return cart.some(p => p.id === id);
    }

    const addToCart = (item) => {
        if (existsInCart(item.id)) {
            setCart(cart.map(p => 
                p.id === item.id 
                    ? { ...p, quantity: p.quantity + item.quantity }
                    : p
            ));
        } else {
            setCart([...cart, item]);
        }
        alert(`${item.name} agregado al carrito`);
    };
    
    const clearCart = () => {
        setCart([]);
    }

    const deleteItem = (id) => {
        setCart(cart.filter(p => p.id !== id));
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const total = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    const checkout = () => {
        alert("Compra finalizada!");
        setCart([]);
    }

    const values = {
        cart, 
        addToCart, 
        clearCart, 
        deleteItem,
        getTotalItems,
        total,
        checkout
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};