import React, { Component } from 'react';
import {Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/api';
import serializeForm from 'form-serialize';
import { loadComments, setCurrentPost } from '../actions';

class NewCommentForm extends Component {

    state = {
        body : '', 
        owner: '',
        timestamp : ''
    };

    closePostModal = () =>{
        let postId = this.props.postId;
        this.props.setCurrentPost(postId);
        this.props.history.push("/post/"+postId);
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
        else if (length >255) return 'error';
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const values =serializeForm(e.target, {hash:true});
        let postId = this.props.postId;
        var newComment = {
            id: Math.random().toString(36).substr(-8),
            timestamp: Date.now(),
            body:values.body,  
            author:  localStorage.token ? localStorage.token : 'anon' ,  
            parentId: postId
          };
          ReadableAPI.commentPost(newComment).then((comment) => {
            this.props.loadComments( [comment] , postId);
            this.props.setCurrentPost(postId);
            this.props.history.push("/post/"+postId);
          });
    }

    render() {
       
        return (
            <span>
                <Modal show={this.props.location.pathname === '/comments/add'} onHide={this.closePostModal}>
                <form  onSubmit={this.handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Add new comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <FormGroup controlId='form-comment'
                            validationState={this.getCommentValidationState()}>
                           
                            <FormControl
                                name = "body"
                                componentClass="textarea"
                                value={this.state.body}
                                placeholder="Enter your comment"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                       
                </Modal.Body>
                <Modal.Footer>
                     <span  className="pull-left"> 
                        <Button onClick={this.closePostModal}>Cancel</Button>
                    </span>
                    <span  className="pull-right"> 
                        <Button type="submit"  bsStyle="primary">Submit </Button> 
                    </span>
                </Modal.Footer>
                </form>
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

function mapDispatchToProps(dispatch){
    return {
      loadComments : (data, id) => dispatch(loadComments(data, id)), 
      setCurrentPost : (postId) => dispatch(setCurrentPost(postId))
    }
  }
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewCommentForm));