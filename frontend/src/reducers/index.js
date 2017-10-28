import {
    LOAD_CATEGORIES, 
    LOAD_POSTS, 
    LOAD_POST, 
    LOAD_COMMENTS,
    SET_CATEGORY, 
    SET_CURRENT_POST
} from '../actions';

var initialState  = {
    categories : [] , 
    posts : [], 
    comments : [],
    currentCategory : 'all', 
    currentPost : ''
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
        
        case LOAD_COMMENTS :
            let updatedComments = state.comments.filter( (comment) => comment.parentId !== action.postId);    
            return {
                ...state, 
                'comments':updatedComments.concat(action.comments)
            }

        case SET_CURRENT_POST:
            return {
                ...state, 
                'currentPost' : action.postId
            }
        default:
            return state;

    }
}

export default categoriesReducer;