import {
    LOAD_CATEGORIES, 
    LOAD_POSTS, 
    LOAD_POST, 
    SET_CATEGORY
} from '../actions';

var initialState  = {
    categories : [] , 
    posts : [], 
    currentCategory : 'all'
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
            };

        case SET_CATEGORY :

            return {
                ...state, 
                'currentCategory' : action.category
            };
            
        default:
            return state;

    }
}

export default categoriesReducer;