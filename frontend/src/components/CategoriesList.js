import React, { Component } from 'react';

class CategoriesList extends Component{

    render() {
        let categories = this.props.categories;
        
        return (
            <div className="list-component categories">
                <div> Categories </div>
                <ul> 
                    {categories.map( (category) => 
                       ( <li key={category.name}> {category.name}</li> )   
                    )}
                </ul>
            </div>
        );
    }
}

export default CategoriesList;