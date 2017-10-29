import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, Button,Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/api';
import serializeForm from 'form-serialize';
import { loadPost } from '../actions';
import { withRouter } from 'react-router-dom';

class NewPostForm extends Component{

    state = {
        id : '',
        title: '', 
        body : '', 
        category: '', 
        author : '', 
        timestamp : ''
    };

    componentDidMount(){
        console.log('*** NewPostForm :  Component did mount');
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
        const values =serializeForm(e.target, {hash:true});
        
        var post = {
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
    }

    render(){
        let categories = this.props.categories;
        
        return (
            <Modal show={this.props.location.pathname === '/new'} onHide={this.closePostModal}>
            <form  onSubmit={this.handleSubmit}>
            <Modal.Header>
                <Modal.Title>Create New Post</Modal.Title>
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
                                (<option key={category.name} value={category.name}>{category.name}</option>  )   
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
      categories: state.categories
    };
  }

function mapDispatchToProps(dispatch){
    return {
      loadPost : (data) => dispatch(loadPost(data))
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostForm));
