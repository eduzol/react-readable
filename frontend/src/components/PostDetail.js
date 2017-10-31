import React, { Component } from 'react';
import { Grid, Row, Col,  Jumbotron, Alert , Button, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as moment from 'moment/moment';
import * as  ReadableAPI from '../utils/api.js'; 
import { loadComments, setCurrentPost, loadPost } from '../actions';
import CommentDetails from './CommentDetails';

class PostDetail extends Component{

    state = {
        showDeleteWarning :false
    };

    showWarning  = (e) => {
        e.preventDefault();
        this.setState({showDeleteWarning :true});
    }

    hideWarning  = (e) => {
        e.preventDefault();
        this.setState({showDeleteWarning :false});
    }

    deletePost  = (e) => {
        e.preventDefault();
        let postId = this.props.match.params.id;
        ReadableAPI.deletePost(postId).then((response) => {
            this.props.loadPost(response);
            this.props.history.push("/");
        });
    }

    upVote  = (e) => {
        e.preventDefault();
        let postId = this.props.match.params.id;
        ReadableAPI.votePost(postId, 'upVote').then((response) => {
            this.props.loadPost(response);
          });
    }

    downVote = (e) => {
        e.preventDefault();
        let postId = this.props.match.params.id;
        ReadableAPI.votePost(postId, 'downVote').then((response) => {
            this.props.loadPost(response);
          });
    }

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
            this.props.setCurrentPost(postId);
        }
      
        return (
        <div>
            {post? (
            <Jumbotron>
                <Grid >
                    <Row className="show-grid">
                    <Col md={4}><br/> </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={8}>
                            <Grid>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <h2>
                                        {post.title} 
                                     </h2>
                                    <h5>Submitted by <span style={{fontWeight: 'bold'}}> {post.author} </span> on {date}.
                                    <span style={{fontWeight: 'bold'}}> {post.voteScore} votes </span> &nbsp;  &nbsp; 
                                        <Button bsSize="xsmall" onClick={this.upVote}><Glyphicon glyph="arrow-up" /></Button>
                                        <Button bsSize="xsmall" onClick={this.downVote}><Glyphicon glyph="arrow-down" /></Button>
                                     
                                            <span>
                                                 &nbsp;  &nbsp;
                                                 <Link to="/edit">
                                                 Edit
                                                 </Link>
                                                 &nbsp;|&nbsp;
                                                 <a role="button" onClick={this.showWarning}>
                                                 Delete     
                                                 </a>
                                            </span>
                                     </h5>
                                </Col>    
                                </Row>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                        {this.state.showDeleteWarning === true ? 
                                            <Alert bsStyle="danger">This will delete this post, are you sure?&nbsp;  
                                            
                                             <Button bsStyle="link" onClick={this.deletePost}>
                                             Yes
                                             </Button> , 
                                             <Button bsStyle="link" onClick={this.hideWarning}>No
                                             </Button>
                                             </Alert>

                                            : <span></span> }
                                </Col>     
                                </Row>
                                <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <h4>{post.body}</h4>
                                </Col>     
                                </Row>
                            </Grid> 
                        </Col>
                        <Col xs={8} md={4} >
                          <CommentDetails />
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
      setCurrentPost : (postId) => dispatch(setCurrentPost(postId)), 
      loadPost : (data) => dispatch(loadPost(data))
    }
}
  
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(PostDetail));