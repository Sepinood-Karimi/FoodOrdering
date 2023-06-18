import React from "react";
import classes from './Input.module.css';

const Input = React.forwardRef(({inputLabel,input,className},ref) => {
    return(
        <div className={`${classes.input}` + className}>
            <label htmlFor={input.id}>{inputLabel}</label>
            <input {...input} ref={ref}/>
        </div>
    )
});
export default Input;