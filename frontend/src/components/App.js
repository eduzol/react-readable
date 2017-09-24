import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';  

class App extends Component {

  state = {
    categories :[]
  };

  componentDidMount(){
    ReadableAPI.getCategories().then((categories) => {
      console.log('categories ', categories );
      this.setState({categories});
    });
  }

  render() {
    return (
      <div className="App">
        <CategoriesList categories={this.state.categories} />
      </div>
    );
  }
}

export default App;
