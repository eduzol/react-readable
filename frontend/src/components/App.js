import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from '../utils/api';

class App extends Component {
  render() {

    ReadableAPI.getCategories().then((categories) => {
      console.log('categories ', categories );
    });

    ReadableAPI.getPostsByCategory('react').then((posts) => {
      console.log('react posts ' ,posts );
    });

    ReadableAPI.getPosts().then((posts) => {
      console.log('react posts ' ,posts );
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
