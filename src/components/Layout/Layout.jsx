import React, { Component } from 'react';
import Navigation from './../Navigation/Navigation';
import './Layout.css'
import SideDrawer from '../Navigation/SideDrawer';
import { Route, Link, Switch }  from 'react-router-dom';
import CheckoutSummary from '../Checkout/CheckoutSummary';
import Orders from '../Orders/Orders';

class Layout extends Component {

    state = {
        closeSideDrawer: true
    }

    closeSideDrawer = () => {
        this.setState({
            closeSideDrawer: true
        })
    }
    
    openSideDrawer = () => {
        this.setState({
            closeSideDrawer: false
        })
    }

    render(){
        return(
            <React.Fragment>

                <Navigation openSideDrawer={this.openSideDrawer} />
                {   
                this.state.closeSideDrawer
                 ? null : 
                    <SideDrawer closeSideDrawer={this.closeSideDrawer} />
                } 
                <div style={{ marginTop: "100px" }}>
                <Switch>
                        <Route  path="/checkout" render={ () => 
                            <CheckoutSummary  />
                        }/>

                        <Route  path="/orders" render={ () => 
                            <Orders  />
                        }/>
                        
                        
    
                        <Route  path="/burger" render={ () => 
                            <h1>Bro, you wanna order a Burger ? <Link to="/">Click Me</Link></h1>
                        }/>

                        
                        <Route  path="/" render={ ()=>
                            <main className="container">
                                {this.props.children}
                            </main>
                        } />
                       
                </Switch>
                    
                </div>

               
            </React.Fragment>
        )
    }
}

export default Layout;