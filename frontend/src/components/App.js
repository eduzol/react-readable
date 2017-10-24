import React, { Component } from 'react';
import './App.css';
import * as  ReadableAPI from '../utils/api.js'; 
import CategoriesList from './CategoriesList';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import { loadCategories , loadPosts,  setCategory } from '../actions';
import { connect } from 'react-redux';
import { Grid, Navbar, Jumbotron, Row, Col, ButtonToolbar , Button,Modal } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';



class App extends Component {

  state = {
    newPostModalOpen : false
  }

  componentDidMount(){

    ReadableAPI.getCategories().then((categories) => {
      this.props.loadCategories(categories);
    }).then(() =>{

      let path = this.props.location.pathname;
      if ( path.includes('categories') ){
         let category = path.split('/')[2];
         if (this.props.categories.filter( cat => cat.name === category).length > 0  ){
          this.props.setCategory(category);
         }else{
          this.props.history.push("/");
         }
      }

    });

    ReadableAPI.getPosts().then((posts) => {
      this.props.loadPosts(posts);
    });
   
  }

  openPostModal = () => {
    this.setState({newPostModalOpen : true });
  }

  closePostModal = () =>{
    this.setState({newPostModalOpen : false });
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
                  <Link to={{ pathname: "/new", state: { modal: true }}}>
                  <Button bsSize="small"  bsStyle="primary" active onClick={this.openPostModal}>Create Post</Button>
                  </Link>
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
      <Route exact path="/new"  render={ () => (
        <Modal show={this.props.location.pathname === '/new'} onHide={this.closePostModal}>
          <Modal.Header>
              <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewPostForm onNewPost={this.closePostModal} />
          </Modal.Body>
          <Modal.Footer>
            <Link to="/">
              <Button onClick={this.closePostModal}>Close</Button>
            </Link>
          </Modal.Footer>
        </Modal>
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
