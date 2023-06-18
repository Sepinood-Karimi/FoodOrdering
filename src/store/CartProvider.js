import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (prevState,action) => {
    if (action.type === 'ADD_ITEM'){
        const updatedTotalAmount = prevState.totalAmount + action.item.amount * action.item.price

        const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = prevState.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem){
            let updatedItem;
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...prevState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = prevState.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    if (action.type==='REMOVE_ITEM'){
        const existingCartItemIndex = prevState.items.findIndex(item=>item.id===action.itemId);
        const existingCartItem = prevState.items[existingCartItemIndex];

        const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount===1){
            updatedItems=prevState.items.filter(item=>item.id!==action.itemId);
        }else{

            const updatedItem={...existingCartItem,
                amount: existingCartItem.amount - 1
            };
            updatedItems = [...prevState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'CLEAR_CART'){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = ({children}) => {

    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type:'ADD_ITEM',
            item : item
        })
    };

    const removeItemFromCartHandler = itemId => {
        dispatchCartAction({
            type:'REMOVE_ITEM',
            itemId : itemId
        })
    };

    const clearCartHandler = () => {
        dispatchCartAction({
            type : 'CLEAR_CART'
        })
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart : clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
