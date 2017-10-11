import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as moment from 'moment/moment';


class PostList extends Component{

    dateFormatter (cell, row){
        let formattedDate = moment.unix(cell/1000).format("MM-DD-YYYY HH:mm");
        return formattedDate;
    }

    render() {
        //sort by votescore
        let posts = this.props.posts.sort(function(postA, postB){
                return postB.voteScore - postA.voteScore;
        });
       
        return (
            <div className="list-component posts">
                <BootstrapTable data={posts} hover keyField='id'>
                  <TableHeaderColumn dataField='title' width='70%'>Posts</TableHeaderColumn>
                  <TableHeaderColumn dataField='timestamp' width="20%" dataSort={ true } dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='voteScore' width="10%" dataSort={ true }>Score</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default PostList;