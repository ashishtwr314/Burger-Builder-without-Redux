import React from 'react';
import Control from './Control';

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" }

];


const BurgerControls = (props) => {
    return ( 
        <div className="controls-wrapper">
            <div className="container">
                <p className="price">Current Price: <b>{props.price}</b></p>
                {
                    controls.map(control => {
                        return <Control disable={props.disable} handleDecrement={() => props.handleDecrement(control.type)}   handleIncrement={() => props.handleIncrement(control.type)}  label={control.label} type={control.type} key={control.label} />
                    })
                }
                <button disabled={!props.purchaseable} onClick={props.OpenModal} className="order-btn">Order Now</button>
            </div>
        </div>
     );
}
 
export default BurgerControls;