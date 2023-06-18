import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({onHideCart}) => {

    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmitted,setDidSubmitted]=useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;

    const hasItem = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    }
    const cartItems =
        (<ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                >
                    {item.name}
                </CartItem>
            )}
        </ul>);

    const modalActions =
        (<div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onHideCart}> Close</button>
            {hasItem && <button className={classes.button} onClick={orderHandler}> Order </button>}
        </div>);

    const confirmOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-ordering-460e9-default-rtdb.firebaseio.com/orders.json',{
            method : 'POST',
            body:JSON.stringify({
                user : userData,
                orderItems : cartCtx.items
            }),
            headers : {
                'content-type' :'app/cartData/json'
            }
        });
        setIsSubmitting(false);
        setDidSubmitted(true);
        cartCtx.clearCart();
    };

    const modalContent =
        <>
            {cartItems}
            <div className={classes.total}>
                <span> Total Amount </span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onConfirm={confirmOrderHandler} onCancel={onHideCart}/>}
            {!isCheckOut && modalActions}
        </>
    const submittingContent = <p> We Are Submitting Your Order ... </p>
    const didSubmittedContent =
        <>
            <p> We Will Get in Touch With You ASAP To Send Your Order </p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={onHideCart}> Close</button>
            </div>
        </>

    return (
        <Modal onClose={onHideCart}>
            {!isSubmitting && !didSubmitted && modalContent}
            {isSubmitting && !didSubmitted && submittingContent}
            {didSubmitted && didSubmittedContent}
        </Modal>
    );
};

export default Cart;