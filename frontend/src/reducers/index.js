import {
    LOAD_CATEGORIES, 
    LOAD_POSTS, 
    LOAD_POST
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

        case LOAD_POST :
            
            return {
                ...state, 
                'posts' : state.posts.concat(action.post)
            }
        default:
            return state;

    }
}

export default categoriesReducer;