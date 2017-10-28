import React, { Component } from 'react';
import { Grid, Row, Col,  Jumbotron} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment/moment';
import * as  ReadableAPI from '../utils/api.js'; 
import { loadComments } from '../actions';

class PostDetail extends Component{

    componentDidMount(){
        /* get comments when loading */
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
                                     <span style={{fontWeight: 'bold'}}> {post.voteScore} votes </span> </h5>
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
                        <Col xs={6} md={4} style={{backgroundColor: '#FFFFFF'}}>
                            <Grid >
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <h4>Comments</h4>
                                    </Col>       
                                </Row>
                                {comments.map( (comment) => (
                                <Row key={comment.id} className="show-grid">
                                    <Col xs={12} md={12}>
                                      <span style={{fontWeight: 'bold'}}>{comment.author?comment.author:'anon' }.</span> {comment.body}
                                      <br />
                                      <br />

                                    </Col>    
                                </Row>
                                ))}
                            </Grid>
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
      loadComments : (data, id) => dispatch(loadComments(data, id))
    }
  }
  
  
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(PostDetail));