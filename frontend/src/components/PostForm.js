import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, Button,Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/api';
import serializeForm from 'form-serialize';
import { loadPost } from '../actions';
import { withRouter } from 'react-router-dom';

class PostForm extends Component{

    state = {
        id : '',
        title: '', 
        body : '', 
        category: '', 
        author : '', 
        timestamp : ''
    };

    componentDidMount(){
      
        let editable = this.props.editable;
        if ( editable === "true"){
            let postId = this.props.currentPost;
            let post = this.props.posts.filter((post) => post.id === postId )[0];
            if (post){
                this.setState({
                    id : postId, 
                    title: post.title, 
                    body: post.body, 
                    category: post.category
                });
            }else{
                this.closePostModal();
            }
        }
     }

    getTitleValidationState = ( ) => {
        const length = this.state.title.length;
        if (length > 1) return 'success';
        else if (length > 5) return 'error';
    }

    getBodyValidationState = ( ) => {
        const length = this.state.body.length;
        if (length > 1) return 'success';
        else if (length > 5) return 'error';
    }

    closePostModal = () =>{
        this.props.history.push("/");
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let editable = this.props.editable;
        const values =serializeForm(e.target, {hash:true});
        if ( editable === "false"){
           
            let post = {
                id : Math.random().toString(36).substr(-8) , 
                timestamp: Date.now(),
                title : values.title, 
                body : values.body, 
                author : localStorage.token ? localStorage.token : 'anon' , 
                category : values.category
              };
          
              ReadableAPI.addPost(post).then((response) => {
                this.props.loadPost(response);
                this.props.history.push("/");
              });
        }else{
            let postId = this.props.currentPost;
            let post  ={
                title : values.title, 
                body: values.body, 
                category: values.category
            }

            ReadableAPI.editPost(postId,post ).then((response) => {
                this.props.loadPost(response);
                this.props.history.push('/post/'+postId);
            });
        }
        
    }

    render(){
        let categories = this.props.categories;
        let title = this.props.editable === "true" ? "Edit post" : "Create new post";
        return (
            <Modal show={this.props.location.pathname === '/new'
                        || this.props.location.pathname === '/edit' } onHide={this.closePostModal}>
            <form  onSubmit={this.handleSubmit}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                        <FormGroup controlId='form-title'
                            validationState={this.getTitleValidationState()}>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                name = "title"
                                type="text"
                                value={this.state.title}
                                placeholder="Enter Post Title"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId='form-body'
                            validationState={this.getBodyValidationState()}>
                            <ControlLabel>Content</ControlLabel>
                            <FormControl
                                name = "body"
                                componentClass="textarea"
                                value={this.state.body}
                                placeholder="Enter Post Content"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Category</ControlLabel>
                            <FormControl name="category" componentClass="select" placeholder="select">
                            {categories.map( (category) => 
                                (<option key={category.name} value={category.name} selected={(this.state.category===category.name)}>{category.name}</option>  )   
                            )}
                            </FormControl>
                        </FormGroup>
            </Modal.Body>
            <Modal.Footer>
            <Link to="/reader/categories/all">
            <span  className="pull-left"> 
              <Button onClick={this.closePostModal}>Cancel</Button>
            </span>
            </Link>
            <span  className="pull-right"> 
                <Button type="submit"  bsStyle="primary">Submit </Button> 
            </span>
          </Modal.Footer>
          </form>
        </Modal>
        );
    }
}

function  mapStateToProps (state ){
    return {
      categories: state.categories, 
      currentPost : state.currentPost, 
      posts : state.posts
    };
  }

function mapDispatchToProps(dispatch){
    return {
      loadPost : (data) => dispatch(loadPost(data))
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
