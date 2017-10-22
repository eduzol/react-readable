export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_POST = "LOAD_POST";

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