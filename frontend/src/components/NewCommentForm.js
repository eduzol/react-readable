import React, { Component } from 'react';
import {Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/api';
import serializeForm from 'form-serialize';

class NewCommentForm extends Component {

    state = {
        body : '', 
        owner: '',
        timestamp : ''
    };

    closePostModal = () =>{
        console.log('close comment form');
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    getCommentValidationState = ( ) => {
        const length = this.state.body.length;
        if (length > 1) return 'success';
        else if (length > 5) return 'error';
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const values =serializeForm(e.target, {hash:true});
        
        var newComment = {
            id: Math.random().toString(36).substr(-8),
            timestamp: Date.now(),
            body:values.body,  
            owner:  localStorage.token ? localStorage.token : 'anon' ,  
            parentId: this.props.postId
          };
          ReadableAPI.commentPost(newComment).then((response) => {
            console.log('new post **** ' , response );
            
          });
    }

    render() {
       
        return (
            <span>
                <Modal show={this.props.location.pathname === '/comments/add'} onHide={this.closePostModal}>
                <Modal.Header>
                    <Modal.Title>Add new comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form  onSubmit={this.handleSubmit}>
                        <FormGroup controlId='form-comment'
                            validationState={this.getCommentValidationState()}>
                            <ControlLabel>Comment</ControlLabel>
                            <FormControl
                                name = "body"
                                type="text"
                                value={this.state.body}
                                placeholder="Enter your comment"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button type="submit"> Submit </Button>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            </span>
        );
    }
}

function  mapStateToProps (state ){
    return {
      postId : state.currentPost
    };
}

export default withRouter(connect(mapStateToProps)(NewCommentForm));