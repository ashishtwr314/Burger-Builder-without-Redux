import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';
import './App.css';


class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App;
