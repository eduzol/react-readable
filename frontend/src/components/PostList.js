import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Glyphicon} from 'react-bootstrap';
import * as moment from 'moment/moment';
import { connect } from 'react-redux';
import {  loadPost, setCurrentPost, loadComments } from '../actions';
import * as  ReadableAPI from '../utils/api.js'; 
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class PostList extends Component{

    dateFormatter = (cell, row) => {
        let formattedDate = moment.unix(cell/1000).format("MM-DD-YYYY HH:mm");
        return formattedDate;
    }

    editPost = (element) => {

        element.preventDefault();
        let postId =  element.currentTarget.getAttribute('name');
        this.props.setCurrentPost(postId);
        this.props.history.push("/edit");

    }

    deletePost = (element) => {
        
        element.preventDefault();
        let postId =  element.currentTarget.getAttribute('name');
        ReadableAPI.deletePost(postId).then((response) => {
            this.props.loadPost(response);
            this.props.history.push("/");
        });

    }

    upVote  = (element) => {
        element.preventDefault();
        let postId =  element.currentTarget.getAttribute('name');
        
        ReadableAPI.votePost(postId, 'upVote').then((response) => {
            this.props.loadPost(response);
        });
        
    }

    downVote = (element) => {
        element.preventDefault();
        let postId =  element.currentTarget.getAttribute('name');
        
        ReadableAPI.votePost(postId, 'downVote').then((response) => {
            this.props.loadPost(response);
        });
      
    }

    scoreFormatter = (cell, row) => {
        
        let postId = row.id ;
        return (
            <span>
                {cell} &nbsp;  &nbsp;
                <a  name={postId} role="button" onClick={this.upVote}><Glyphicon glyph="arrow-up" /></a>
                &nbsp;
                <a  name={postId} role="button" onClick={this.downVote}><Glyphicon glyph="arrow-down" /></a>
            </span>
        );        
       
    }

    linkFormatter  = (cell, row) =>  {
        
        let postId = row.id ;
        let numberOfComments = 0;
        
        numberOfComments = this.props.comments.filter(comment => comment.parentId === postId).length;
        
        return (
            <span>
            <Link to={'/post/'+postId}> 
                {cell} &nbsp;  &nbsp;
            </Link>
           
            <span className="pull-right">
            <span className="badge badge-pill badge-primary"> {numberOfComments} comments</span>  
                &nbsp;  &nbsp;
                <a  name={postId} role="button"  onClick={this.editPost}>
                    Edit
                </a>
                    &nbsp;|&nbsp;
                <a name={postId} role="button" onClick={this.deletePost}>
                Delete     
                </a>
             </span>
            </span>
        );
    }

    render() {
        
        let posts = [];
        let sortedPosts = this.props.posts.filter( post => post.deleted === false).sort(function(postA, postB){
                return postB.voteScore - postA.voteScore;
        });
      
        let activeCategory =  this.props.currentCategory;

        if (activeCategory !== 'all'){
            posts = sortedPosts.filter( post => post.category === activeCategory);
        }else{
            posts = sortedPosts;
        }

        return (
            <div className="list-component posts">
                <BootstrapTable data={posts} hover keyField='id' trClassName='tr-background'>
                  <TableHeaderColumn dataField='title' width='60%' dataFormat={this.linkFormatter}>Posts</TableHeaderColumn>
                  <TableHeaderColumn dataField='author' width='10%' dataSort={ true } >Author</TableHeaderColumn>
                  <TableHeaderColumn dataField='timestamp' width="18%" dataSort={ true } dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='voteScore' width="12%" dataSort={ true } dataFormat={this.scoreFormatter} >Score</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


function  mapStateToProps (state ){
    return {
     currentCategory : state.currentCategory, 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
