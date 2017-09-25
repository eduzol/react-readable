import {
    LOAD_CATEGORIES, 
    LOAD_POSTS
} from '../actions';

var initialState  = {

    categories : [] , 
    posts : []
};
function categoriesReducer( state = initialState , action ){

    switch ( action.type ) {

        case LOAD_CATEGORIES :
            return {
                ...state , 
                'categories': action.categories
            };

        case LOAD_POSTS :
            return {
                ...state, 
                'posts' : action.posts
            };

        default:
            return state;

    }
}

export default categoriesReducer;