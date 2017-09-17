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
      console.log(' react posts ' ,posts );
    });

    ReadableAPI.getPostById('8xf0y6ziyjabvozdd253nd').then((post) => {
      console.log('post ' , post);
    });

    ReadableAPI.getPostComments('8xf0y6ziyjabvozdd253nd').then((comments) => {
      console.log('comments ' , comments);
    });

    var post = {
      id : Math.random().toString(36).substr(-8) , 
      timestamp: Date.now(),
      title : 'Sample Eduardos Post', 
      body : 'Udacity is so cool', 
      author : 'eduzol', 
      category : 'react'
    };

    ReadableAPI.addPost(post).then((response) => {
      console.log('response ' , response );
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
