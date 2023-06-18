import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = ({onAddItemToCart}) => {
    const [amountIsValid,setAmountIsValid]=useState(true);

    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        onAddItemToCart(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                inputLabel='Amount'
                input={{
                id:'amount',
                type: 'number',
                min:'1',
                max:'5',
                step :'1',
                defaultValue : '1'
            }}
                ref={amountInputRef}
            />
            <button> + Add </button>
        </form>
    );
};

export default MealItemForm;