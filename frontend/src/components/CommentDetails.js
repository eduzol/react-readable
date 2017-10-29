import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as  ReadableAPI from '../utils/api.js'; 
import { loadComment, setCurrentComment } from '../actions';

class CommentDetails extends Component{

    deleteComment = (element) =>{
        let commentId = element.target.name ;
        ReadableAPI.deleteComment(commentId).then((response) => {
            this.props.loadComment(response );
            this.props.history.push('/post/'+this.props.currentPost);
        });

    }

    editComment = (element) => {
        let commentId = element.target.name ;
        this.props.setCurrentComment(commentId);
        this.props.history.push('/comments/edit');
    }

    render() {

        let postId =  this.props.currentPost;
        var comments = this.props.comments.filter((comment) => comment.parentId === postId && comment.deleted === false).sort(function(c1, c2){
            return  c2.voteScore - c1.voteScore;
        });
        let currentUser  = localStorage.token;
        
        return (
            <span>
                <Grid style={{backgroundColor: '#FFFFFF'}}>
                    <Row className="show-grid">
                        <Col xs={8} md={4}> 
                            <h4>Comments</h4>
                        </Col>       
                        <Col xs={4} md={8}> 
                            <span className="pull-right"> 
                             <Link to={{ pathname: "/comments/add", state: { modal: true }}}><h4>Add</h4></Link> 
                            </span>
                        </Col>       
                    </Row>
                    {comments.map( (comment) => (
                    <Row key={comment.id} className="show-grid">
                        <Col xs={12} md={12}>
                            <h5><span style={{fontWeight: 'bold'}}>{comment.author?comment.author:'anon' }. {comment.voteScore} votes</span>
                            { currentUser === comment.author?
                                <span className="pull-right">
                                    <a  name={comment.id} role="button" onClick={this.editComment}>Edit </a> |
                                    <a  name={comment.id} role="button" onClick={this.deleteComment}> Delete</a>
                                </span>
                            : <span></span>}
                            </h5>
                            <h5> {comment.body}</h5>
                        </Col>    
                    </Row>
                    ))}
                </Grid>
            </span>
        );
    }
}

function  mapStateToProps (state ){
    return {
      comments: state.comments, 
      currentPost : state.currentPost
    };
}

function mapDispatchToProps(dispatch){
    return {
      loadComment : (data) => dispatch(loadComment(data)),
      setCurrentComment : (data)=> dispatch(setCurrentComment(data))
    }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(CommentDetails));