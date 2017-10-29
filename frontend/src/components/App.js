import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';
import PostForm from './PostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { loadCategories , loadPosts,  setCategory } from '../actions';
import { connect } from 'react-redux';
import { Grid, Navbar, Jumbotron, Row, Col, ButtonToolbar , Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import {Link, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
      <Navbar inverse fixedTop>
        <Grid>
        <Row className="show-grid">
          <Col xs={8} md={4}> 
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/reader/categories/all" >
                  Readable
                  </Link>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
           </Col>
          <Col xs={4} md={8}>
          <span className="pull-right"> 
              <Navbar.Header>
              <Navbar.Brand>
                <ButtonToolbar>
                  <Link to={{ pathname: "/new", state: { modal: true }}}>
                  <Button bsSize="small"  bsStyle="primary" active onClick={this.openPostModal}>Post Something</Button>
                  </Link>
                </ButtonToolbar>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            </span>
          </Col>
          <Col xsHidden md={4}> </Col>
        </Row>
        </Grid>
      </Navbar>
      <Route exact path="/" render={() => <Redirect to="/reader" />} />
      <Route path="/reader" render={ () => (
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
    loadCategories : (data) => dispatch(loadCategories(data)) , 
    loadPosts : (data) => dispatch(loadPosts(data)), 
    setCategory : (data) => dispatch(setCategory(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
