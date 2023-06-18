import ReactDOM from "react-dom";
import classes from './Modal.module.css';

const Backdrop = ({onClose}) => {
    return (
        <div className={classes.backdrop} onClick={onClose}/>
    );
};

const Overlay = ({children}) => {
    return (
        <div className={classes.modal}>
            <div>
                {children}
            </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = ({children,onClose}) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={onClose}/>,portalElement)}
            {ReactDOM.createPortal(<Overlay>{children}</Overlay>, portalElement)}
        </>
    );
};

export default Modal;