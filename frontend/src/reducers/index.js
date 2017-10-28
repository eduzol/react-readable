import {
    LOAD_CATEGORIES, 
    LOAD_POSTS, 
    LOAD_POST, 
    LOAD_COMMENTS,
    SET_CATEGORY
} from '../actions';

var initialState  = {
    categories : [] , 
    posts : [], 
    comments : [],
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
        
        case LOAD_COMMENTS :
            console.log('comments ', action.comments);
            console.log('postId ', action.postId);
            let updatedComments = state.comments.filter( (comment) => comment.parentId !== action.postId);    
            /* .concat(action.comments); */

            console.log('updatedComments ' , updatedComments);
            console.log(' action.comments ' ,  action.comments);
            return {
                ...state, 
                'comments':updatedComments.concat(action.comments)
            }

        default:
            return state;

    }
}

export default categoriesReducer;