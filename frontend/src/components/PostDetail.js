import React, { Component } from 'react';
import { Grid, Row, Col,  Jumbotron} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as moment from 'moment/moment';
import * as  ReadableAPI from '../utils/api.js'; 
import { loadComments, setCurrentPost } from '../actions';
import CommentDetails from './CommentDetails';

class PostDetail extends Component{

    componentDidMount(){
        
        let postId = this.props.match.params.id;
        if ( postId ){
            ReadableAPI.getPostComments(postId).then((comments) => {
                this.props.loadComments( comments, postId);
            });
        }
    }

    render() {
        
        let postId = this.props.match.params.id;
        let post = this.props.posts.find(function(post){ return post.id === postId});
        if (post){
            var date =  moment.unix(post.timestamp/1000).format("MM-DD-YYYY HH:mm");
            var comments = this.props.comments.filter((comment) => comment.parentId === postId ).sort(function(c1, c2){
               return  c2.voteScore - c1.voteScore;
            });
            this.props.setCurrentPost(postId);
            var currentUser = localStorage.token;
        }
      
        return (
        <div>
            {post? (
            <Jumbotron>
                <Grid >
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                            <Grid>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <h2>{post.title}</h2>
                                    <h5>Submitted by <span style={{fontWeight: 'bold'}}> {post.author} </span> on {date}.
                                    <span style={{fontWeight: 'bold'}}> {post.voteScore} votes </span> 
                                     {currentUser === post.author? 
                                            <span>
                                                 &nbsp;  &nbsp;
                                                 <Link to="/edit">
                                                 Edit
                                                 </Link>
                                                 &nbsp;
                                                 <Link to="#">
                                                 Delete
                                                 </Link>
                                            </span> : 
                                            <span></span> }
                                     </h5>
                                </Col>    
                                </Row>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                
                                </Col>     
                                </Row>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <h4>{post.body}</h4>
                                </Col>     
                                </Row>
                            </Grid> 
                        </Col>
                        <Col xs={6} md={4} >
                          <CommentDetails postId={postId} comments={comments} />
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
            ):(
            <Jumbotron>
                <h1>Post not found </h1>
            </Jumbotron>
            )}
        </div>
        );
    }
}

function  mapStateToProps (state ){
    return {
      posts : state.posts  , 
      comments: state.comments
    };
}

function mapDispatchToProps(dispatch){
    return {
      loadComments : (data, id) => dispatch(loadComments(data, id)), 
      setCurrentPost : (postId) => dispatch(setCurrentPost(postId))
    }
  }
  
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(PostDetail));