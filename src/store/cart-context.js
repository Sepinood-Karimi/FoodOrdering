import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {
    },
    removeItem: (itemId) => {
    },
    clearCart: () => {
    }
});

export default CartContext;