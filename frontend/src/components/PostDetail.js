import React, { Component } from 'react';
import { Grid, Row, Col,  Jumbotron} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment/moment';

class PostDetail extends Component{

    render() {
        
        let postId = this.props.match.params.id;
        let post = this.props.posts.find(function(post){ return post.id === postId});
        if (post){
            console.log('post ' , post);
            var date =  moment.unix(post.timestamp/1000).format("MM-DD-YYYY HH:mm");
        }
        return (
        <div>
            {post? (
            <Jumbotron>
                   <Grid>
                        <Row className="show-grid">
                        <Col xs={12} md={10}>
                            <h1>{post.title}</h1>
                        </Col>     
                        </Row>
                        <Row className="show-grid">
                        <Col xs={12} md={10}>
                            <h4>Submitted by {post.author} on {date}. {post.voteScore} votes</h4>
                        </Col>     
                        </Row>
                        <Row className="show-grid">
                        <Col xs={12} md={10}>
                            <h2>{post.body}</h2>
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
      posts : state.posts  
    };
  }
  
export default withRouter(connect(mapStateToProps)(PostDetail));