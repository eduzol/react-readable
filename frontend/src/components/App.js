import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';
import PostList from './PostList';
import { loadCategories , loadPosts } from '../actions';
import { connect } from 'react-redux';
import { Grid, Navbar, Jumbotron, Row, Col, ButtonToolbar , Button } from 'react-bootstrap';


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
    let categories = this.props.categories;
    let posts = this.props.posts;
    return (
    
      <div>
      <Navbar inverse fixedTop>
        <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}> 
              <Navbar.Header>
              <Navbar.Brand>
                Readable
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
           </Col>
          <Col xs={6} md={4}>
              <Navbar.Header>
              <Navbar.Brand>
                <ButtonToolbar>
                  <Button bsSize="small"  bsStyle="primary" active>Create Post</Button>
                </ButtonToolbar>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Col>
          <Col xsHidden md={4}> </Col>
        </Row>
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
