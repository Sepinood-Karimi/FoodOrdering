import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formValidation,setFormValidation]=useState({
        name:true,
        streetInputRef : true,
        postal : true,
        city: true
    })

    const isEmpty = value => value.trim()==='';
    const isFiveChars = value => value.trim().length >=5;

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);

        const formIsValid =
            enteredNameIsValid &&
            enteredPostalIsValid &&
            enteredCityIsValid &&
            enteredStreetIsValid;

        setFormValidation({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })

        if (!formIsValid){
            return;
        };
         props.onConfirm({
             name:enteredName,
             street:enteredStreet,
             postalCode:enteredPostal,
             city:enteredCity
         })
    };

    const nameControlClass = `${classes.control} ${!formValidation.name ? classes.invalid : ''}`;
    const cityControlClass = `${classes.control} ${!formValidation.city ? classes.invalid : ''}`;
    const postalControlClass = `${classes.control} ${!formValidation.postal ? classes.invalid : ''}`;
    const streetControlClass = `${classes.control} ${!formValidation.street ? classes.invalid : ''}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formValidation.name && <p> Entered A Valid Name!</p>}
            </div>
            <div className={streetControlClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formValidation.street && <p> Entered A Valid Street!</p>}
            </div>
            <div className={postalControlClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formValidation.postal && <p> Entered A Valid Postal Code (5 characters) !</p>}
            </div>
            <div className={cityControlClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formValidation.city && <p> Entered A Valid City!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;