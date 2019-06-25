import React from 'react';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'

let burgerStyles = {
    textAlign: "center",
    height: "200px",
    width: "300px",
    margin: "0 auto",
    overflow: "auto"
}


const Burger = (props) => {

      

     let  TransformedIngredients = Object.keys(props.ingredients)
        .map(key => {
                return [...Array(props.ingredients[key])].map( (_, i) => {
                    return <BurgerIngredients key={key + i} type={key} />
                })
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, [])

    if(TransformedIngredients.length === 0){
        TransformedIngredients = <p>Please Start adding Ingredients</p>
    }

        
   
    return ( 
        <div style={burgerStyles}>
            <BurgerIngredients type="top" />
                {TransformedIngredients}
            <BurgerIngredients type="bottom" />
        </div>
     );

}
 
export default Burger;