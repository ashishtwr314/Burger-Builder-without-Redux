import React from 'react';
import './BurgerControls.css'

const Control = (props) => {
    return ( 
        <div>
            <span className="label">{props.label}</span>
            <button className="btn-more" onClick={props.handleIncrement}>+</button>
            <button className="btn-less"  onClick={props.handleDecrement} >-</button>
        </div>
     );
}
 
export default Control;