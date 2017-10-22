import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
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
            this.props.onNewPost();
          });
    }

    render(){
        let categories = this.props.categories;
        
        return (
            <form  onSubmit={this.handleSubmit}>
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
                 <Button type="submit"> Submit </Button>
            </form>
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
