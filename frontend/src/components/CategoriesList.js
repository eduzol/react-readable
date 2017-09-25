import React, { Component } from 'react';
import {MenuItem, DropdownButton,Clearfix  } from 'react-bootstrap';

class CategoriesList extends Component{

    render() {
        let categories = this.props.categories;
        
        return (
            <div className="list-component categories">
                <Clearfix>
                <DropdownButton id="categories-menu" title="" open >
                    <MenuItem header>Categories</MenuItem>
                    <MenuItem key='all' selected> All</MenuItem>
                    {categories.map( (category) => 
                        ( <MenuItem key={category.name}> {category.name}</MenuItem> )   
                    )}
                 </DropdownButton>
                </Clearfix>
            </div>
        );
    }
}

export default CategoriesList;