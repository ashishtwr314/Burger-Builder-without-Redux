import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import BurgerControls from './../BurgerControls/BurgerControls';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
const PRICE = {
    salad: 5,
    meat: 20,
    bacon: 10,
    cheese: 10
}

class BurgerBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            ingredients: {},
            disable : false,
            price: 50,
            purchaseable: false,
            modalOpen: false,
            loading: false,
            displayError: false,
         }

    }

    componentDidMount = () => {
        axios.get("https://burger-builder-25101999.firebaseio.com/ingredients.json")
            .then(response => {
               
                this.setState({ ingredients : response.data});
            })
            .catch(error => {
                this.setState({ displayError: true })
            })
    }

    updatePurchase = () =>{
        const ingredients = this.state.ingredients
        const igQty = Object.values(ingredients);
        const sum = igQty.reduce(function(accumulator, a){
            return accumulator + a;
        })

        this.setState({ purchaseable: sum > 0 })

    }


    handleIncrement = (type) => {
        const ingredientsCopy = this.state.ingredients;
        ingredientsCopy[type] = ingredientsCopy[type] + 1;
        const priceToAdd = PRICE[type];
        const totalPrice = this.state.price + priceToAdd;
        this.setState({
            price: totalPrice,
            ingredients : ingredientsCopy
        });
        this.updatePurchase();

    }


    handleDecrement = (type) => {
        const ingredientsCopy = this.state.ingredients;
        if(ingredientsCopy[type] !== 0){
            ingredientsCopy[type] = ingredientsCopy[type] - 1;
            const priceToSub = PRICE[type];
            const totalPrice = this.state.price - priceToSub;
            this.setState({
                price: totalPrice,
                ingredients : ingredientsCopy
            });
        } 
        this.updatePurchase();
    }
    
    OpenModal = () => {
        this.setState({modalOpen: true});
    }

    CloseModal = () =>{
        this.setState({modalOpen: false});
    }

    ContinuePurchaseHandler = () =>{

        let searchQuery = [];
        let price = this.state.price
        for(let i in this.state.ingredients){
            searchQuery.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        searchQuery = searchQuery.join('&');


        this.props.history.push({
            pathname: "/checkout",
            search : `?${searchQuery}&price=${price}`
        });

      
    }

    render() { 
        let controls =  <h1 style={{ textAlign: "center"}}> Something's Fishy, We are working on this. </h1>

        if(!this.state.displayError){
            controls = <BurgerControls OpenModal={this.OpenModal} purchaseable={this.state.purchaseable} price={this.state.price} disable={this.state.disable} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement} />
        }
        return ( 
            <React.Fragment>
                
                {this.state.modalOpen ?
                    <React.Fragment>
                        <Backdrop CloseModal={this.CloseModal} />
                        <Modal ContinuePurchaseHandler={this.ContinuePurchaseHandler} CloseModal={this.CloseModal} ingredients={this.state.ingredients} price={this.state.price}></Modal>
                    </React.Fragment>
                     : null
                }

               

        
                    <Burger className="mt-100" ingredients={this.state.ingredients} />
                    {controls}
               
                 
                
            </React.Fragment>
         );
    }
}
 
export default withRouter(BurgerBuilder);