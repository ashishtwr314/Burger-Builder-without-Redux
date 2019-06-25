import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import './CheckoutSummary.css';
import { Route, withRouter } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

class CheckoutSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients:{},
            price: null
         }
    }
    cancellCheckout = () =>{
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/proceed');
    }

    componentDidMount = () => {
        
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {}
        let price = 0
        for(let params of query.entries()){
            if(params[0] === "price"){
                price = params[1]
            }
            else{
                ingredients[params[0]] = +params[1];
            }
            
        }
        this.setState({ingredients: ingredients, price: price});

    }

    placeOrderHandler = (event, customerData, submitStatus) =>{
        event.preventDefault();

        if(submitStatus){
            let customerDataTransfromed = {}
            for(let elem in customerData){
                customerDataTransfromed[elem] = customerData[elem].value;
            }


            
            this.setState({loading: true, modalOpen: false})
            const data = {
                ingredients : this.state.ingredients,
                price: this.state.price,
                customerData: customerDataTransfromed
            }

        

                axios.post("https://burger-builder-25101999.firebaseio.com/orders.json", data)
                        .then(response => {
                            this.setState({loading: false})
                            this.props.history.push("/");
                })
        }
        else{
            alert("Please fill the form correclty");
        }

               
    }

    render() {
        return ( 
            
            <React.Fragment>

                
                    <div className="CheckoutSummary">
                        <h1>Well, That looks like a Tasty Burger</h1>
                        <Burger ingredients={this.state.ingredients} />
                        <button type="button" onClick={this.cancellCheckout} className="btn btn-neg">Cancel</button>
                        <button type="button" onClick={this.continueCheckout} className="btn btn-pos">Continue</button>
                    </div>
                
                    {
                        this.state.loading ? <React.Fragment> <Backdrop /> <Spinner /> </React.Fragment> : null 
                    }
                    
                
                    <Route path={  this.props.match.path + "/proceed" } render={() => (
                        <ContactForm  placeOrderHandler={this.placeOrderHandler}  />
                    )} />
                
            </React.Fragment>
         );
    }
}
 
export default withRouter(CheckoutSummary);