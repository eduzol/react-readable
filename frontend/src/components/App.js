import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';  

class App extends Component {

  state = {
    categories :[]
  };

  componentDidMount(){
    ReadableAPI.getCategories().then((categories) => {
      this.setState({categories});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React-Readable</h2>
        </div>
        <div className="App-intro">
        <CategoriesList categories={this.state.categories} />
        </div>
      </div>
    );
  }
}

export default App;
