import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({mealId,mealName,mealPriceProps,mealDescription}) => {

    const cartCtx = useContext(CartContext);

    const addItemToCartHandler = amount =>{
        cartCtx.addItem({
            id : mealId,
            name:mealName,
            price:mealPriceProps,
            amount:amount
        })
    };

    const mealPrice = `$ ${mealPriceProps.toFixed(2)}`;
    return(
        <li className={classes.meal}>
            <div>
                <h3>{mealName}</h3>
                <div className={classes.description}>{mealDescription}</div>
                <div className={classes.price}>{mealPrice}</div>
            </div>
            <div>
                <MealItemForm onAddItemToCart={addItemToCartHandler}/>
            </div>
        </li>
    )
};
export default MealItem;