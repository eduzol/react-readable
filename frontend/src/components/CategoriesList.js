import React, { Component } from 'react';
import {Clearfix, Panel, ListGroup , ListGroupItem } from 'react-bootstrap';

class CategoriesList extends Component{

    render() {
        let categories = this.props.categories;
        return (
            <div className="list-component categories">
                <Clearfix>
                    <Panel header="Categories">
                    <ListGroup fill>    
                    <ListGroupItem key='all' href="all" active> All</ListGroupItem>
                    {categories.map( (category) => 
                        ( <ListGroupItem key={category.name} href={category.name}> {category.name}</ListGroupItem> )   
                    )}
                    </ListGroup>
                   </Panel>
                </Clearfix>
            </div>
        );
    }
}

export default CategoriesList;