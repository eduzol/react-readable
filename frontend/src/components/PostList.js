import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as moment from 'moment/moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class PostList extends Component{

    dateFormatter (cell, row){
        let formattedDate = moment.unix(cell/1000).format("MM-DD-YYYY HH:mm");
        return formattedDate;
    }

    linkFormatter (cell, row) {
        
        return (
            <Link to={'/post/'+row.id}>
                {cell}
             </Link>
        );
    }

    render() {
        
        let posts = [];
        let sortedPosts = this.props.posts.sort(function(postA, postB){
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
                <BootstrapTable data={posts} hover keyField='id'>
                  <TableHeaderColumn dataField='title' width='70%' dataFormat={this.linkFormatter}>Posts</TableHeaderColumn>
                  <TableHeaderColumn dataField='timestamp' width="20%" dataSort={ true } dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='voteScore' width="10%" dataSort={ true }>Score</TableHeaderColumn>
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

export default withRouter(connect(mapStateToProps)(PostList));
