export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_POST = "LOAD_POST";
export const SET_CATEGORY = "SET_CATEGORY";
export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const LOAD_COMMENT = "LOAD_COMMENT";
export const SET_CURRENT_POST = "SET_CURRENT_POST";

export function loadCategories ( categories ){

    return {
        type : LOAD_CATEGORIES, 
        categories
    };
}

export function loadPosts ( posts ){
    
    return {
        type : LOAD_POSTS, 
        posts
    };
}

export function loadPost(post){
    return {
        type: LOAD_POST, 
        post
    }
}

export function setCategory(category){
    return {
        type: SET_CATEGORY, 
        category
    }
}

export function loadComments(comments, postId){
    return {
        type: LOAD_COMMENTS , 
        comments, 
        postId
    }
}

export function loadComment(comment){
    return{
        type: LOAD_COMMENT, 
        comment
    }
}

export function setCurrentPost( postId ){
    return {
        type : SET_CURRENT_POST, 
        postId
    }
}