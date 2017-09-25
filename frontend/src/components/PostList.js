import React, { Component } from 'react';

class PostList extends Component{

    render() {
        let posts = this.props.posts;
        
        return (
            <div className="list-component posts">
                <div> Posts </div>
                <ul> 
                    {posts.map( (post) => 
                       ( <li key={post.id}> {post.title}</li> )   
                    )}
                </ul>
            </div>
        );
    }
}

export default PostList;