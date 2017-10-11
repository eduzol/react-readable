import React, { Component } from 'react';
import {ListGroup, ListGroupItem  } from 'react-bootstrap';

class PostList extends Component{

    render() {
        //sort by votescore
        let posts = this.props.posts.sort(function(postA, postB){
                return postB.voteScore - postA.voteScore;
        });

        return (
            <div className="list-component posts">
                <div> Posts </div>
                <ListGroup > 
                    {posts.map( (post) => 
                       ( <ListGroupItem key={post.id} href="{post.id}"  > {post.title}
                                    <span className="badge badge-default badge-pill">{post.voteScore}</span>
                       </ListGroupItem> )   
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default PostList;