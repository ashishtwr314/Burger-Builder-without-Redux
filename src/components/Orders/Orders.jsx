import React, { Component } from 'react';
import axios from 'axios';
import Order from './Order';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders: [],
            loading: true
        }
    }

    componentDidMount = () =>{
        axios.get('https://burger-builder-25101999.firebaseio.com/orders.json')
            .then(response => {

                let data = []
                
                for(let i in response.data){
                    data.push( { 
                        ...response.data[i],
                        id: i
                     });
                }
               
                this.setState({ loading: false, orders: data} )
              
            
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() { 
        
        return ( 

            <React.Fragment>
               {
                    this.state.loading ?
                       <React.Fragment><Backdrop /> <Spinner />    </React.Fragment>
                    :
                        this.state.orders.map(order => (
                            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                        ))
                    
                    
               }
            </React.Fragment>
         );
    }
}
 
export default Orders;