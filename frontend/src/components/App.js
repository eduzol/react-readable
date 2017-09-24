import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';  
import { loadCategories } from '../actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories);
    });
  }

  render() {
    console.log('props  ' , this.props);
    let categories = this.props.categories;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React-Readable</h2>
        </div>
        <div className="App-intro">
          <CategoriesList categories={categories} />
        </div>
      </div>
    );
  }
}
function  mapStateToProps (state ){
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch){
  return {
    loadCategories : (data) => dispatch(loadCategories(data)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
