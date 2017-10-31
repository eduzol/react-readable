import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import Header from './Header';
import Main from './Main';
import { loadCategories , loadPosts,  setCategory, loadComments } from '../actions';
import { connect } from 'react-redux';
import { Route,Redirect ,  withRouter } from 'react-router-dom';
import CommentForm from './CommentForm';

class App extends Component {

  componentDidMount(){

    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories);
    }).then(() =>{
      this.handleUrlChange();
    });

    ReadableAPI.getPosts().then((posts) => {
      this.props.loadPosts(posts);

      posts.forEach((post) => {
        let postId = post.id;
        ReadableAPI.getPostComments(postId).then((comments) => {
            this.props.loadComments( comments, postId);
        });
    });

    });

  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleUrlChange();
    }
  }

  handleUrlChange = () =>{

    let path = this.props.location.pathname;
    if ( path.includes('categories') ){
       let category = path.split('/')[3];
       if (this.props.categories.filter( cat => cat.name === category).length > 0  ){
        this.props.setCategory(category);
       }else{
        this.props.setCategory('all');
        this.props.history.push("/reader");
       }
    }
  }

  render() {

    let categories = this.props.categories;
    let posts = this.props.posts;

    return (
      <div>

        <Header />

        <Route exact path="/" render={() => <Redirect to="/reader" />} />

        <Route path="/reader" render={ () => (

          <Main categories={categories} posts={posts} />

        )} />

        <Route exact path="/new"  render={ () => (
          <PostForm editable="false" />
        )} />

        <Route exact path="/edit"  render={ () => (
          <PostForm editable="true" />
        )} />

        <Route exact path="/post/:id" component={PostDetail} />

        <Route exact path="/comments/add"  render={ () => (
            <CommentForm editable="false" />
        )} />

        <Route exact path="/comments/edit"  render={ () => (
            <CommentForm editable="true" />
        )} />
    
      </div>
    );
  }
}

function  mapStateToProps (state ){
  return {
    categories: state.categories, 
    posts : state.posts,
    currentCategory : state.currentCategory
  };
}

function mapDispatchToProps(dispatch){
  return {
    loadComments : (data, id) => dispatch(loadComments(data, id)), 
    loadCategories : (data) => dispatch(loadCategories(data)) , 
    loadPosts : (data) => dispatch(loadPosts(data)), 
    setCategory : (data) => dispatch(setCategory(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
