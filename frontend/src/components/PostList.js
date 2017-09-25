import React, { Component } from 'react';
import {ListGroup, ListGroupItem  } from 'react-bootstrap';

class PostList extends Component{

    render() {
        let posts = this.props.posts;
        
        return (
            <div className="list-component posts">
                <div> Posts </div>
                <ListGroup > 
                    {posts.map( (post) => 
                       ( <ListGroupItem key={post.id}> {post.title}</ListGroupItem> )   
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default PostList;