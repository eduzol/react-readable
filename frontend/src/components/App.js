import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';
import PostList from './PostList';
import { loadCategories , loadPosts } from '../actions';
import { connect } from 'react-redux';
import { Grid, Navbar, Jumbotron, Row, Col } from 'react-bootstrap';


class App extends Component {

  componentDidMount(){
    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories);
    });

    ReadableAPI.getPosts().then((posts) => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    console.log('props  ' , this.props);
    let categories = this.props.categories;
    let posts = this.props.posts;
    return (
    
      <div>
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              React Readable
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
      <Jumbotron>
        <Grid>
        <Row className="show-grid">
            <Col xs={6} md={4}>
              <CategoriesList categories={categories} />
            </Col>
            <Col xs={12} md={8}>
              <PostList posts={posts} />
            </Col>     
        </Row>
       
       
       
       </Grid> 
      </Jumbotron>
    </div>
    
    );
  }
}
function  mapStateToProps (state ){
  return {
    categories: state.categories, 
    posts : state.posts
  };
}

function mapDispatchToProps(dispatch){
  return {
    loadCategories : (data) => dispatch(loadCategories(data)) , 
    loadPosts : (data) => dispatch(loadPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
