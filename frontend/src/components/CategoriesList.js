import React, { Component } from 'react';
import {Clearfix, Panel, ListGroup , ListGroupItem } from 'react-bootstrap';
import { setCategory } from '../actions';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CategoriesList extends Component{

    onSelected = ( category ) => {
       this.props.setCategory(category);
    }

    render() {
        let categories = this.props.categories;
        let activeCategory = this.props.currentCategory;
        return (
            <div className="list-component categories">
                <Clearfix>
                    <Panel header="Categories">
                    <ListGroup fill>    
                    <Link key = "all" to="/reader/categories/all">
                        <ListGroupItem key='all' 
                                       active={'all'===activeCategory}
                                       onClick={this.onSelected.bind(this, 'all')}> All</ListGroupItem>
                    </Link>
                    {categories.map( (category) => 
                        ( 
                          <Link  key={category.name} to={"/reader/categories/"+category.name}>
                            <ListGroupItem key={category.name} 
                                           active={category.name===activeCategory} 
                                           onClick={this.onSelected.bind(this, category.name)}> {category.name}</ListGroupItem> 
                          </Link>
                        )   
                    )}
                    </ListGroup>
                   </Panel>
                </Clearfix>
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
      setCategory : (data) => dispatch(setCategory(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesList));