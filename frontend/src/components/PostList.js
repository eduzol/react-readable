import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Glyphicon} from 'react-bootstrap';
import * as moment from 'moment/moment';
import { connect } from 'react-redux';
import {  loadPost } from '../actions';
import * as  ReadableAPI from '../utils/api.js'; 
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class PostList extends Component{

    dateFormatter = (cell, row) => {
        let formattedDate = moment.unix(cell/1000).format("MM-DD-YYYY HH:mm");
        return formattedDate;
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
        
        return (
            <span>
            <Link to={'/post/'+postId}>
                {cell}
             </Link>
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
                  <TableHeaderColumn dataField='title' width='58%' dataFormat={this.linkFormatter}>Posts</TableHeaderColumn>
                  <TableHeaderColumn dataField='author' width='10%' dataSort={ true } >Author</TableHeaderColumn>
                  <TableHeaderColumn dataField='timestamp' width="20%" dataSort={ true } dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='voteScore' width="12%" dataSort={ true } dataFormat={this.scoreFormatter} >Score</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


function  mapStateToProps (state ){
    return {
     currentCategory : state.currentCategory
    };
}


function mapDispatchToProps(dispatch){
    return {
      loadPost : (data) => dispatch(loadPost(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
