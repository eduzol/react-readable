const api =  process.env.REACT_READABLE_API || 'http://localhost:3001';

let token = localStorage.token;
if (!token) {
    localStorage.token = Math.random().toString(36).substr(-8);
    token = localStorage.token;
}

const headers = {
    'Accept': 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': token
  }

export const getCategories = () =>{
    return fetch(`${api}/categories`, {headers})
        .then(res =>  res.json())
        .then( data => data.categories )
}
export const getPostsByCategory = (category) => {
    category = category.trim();
    return fetch(`${api}/${category}/posts`,  {headers})
        .then( res => res.json())
        .then( data => data);
}

export const getPosts = () =>{
    return fetch(`${api}/posts`, {headers})
        .then(res =>  res.json())
        .then( data => data );
}

export const getPostById = (id) => {
    id = id.trim();
    return fetch(`${api}/posts/${id}`, {headers})
    .then(res =>  res.json())
    .then( data => data );
}

export const getPostComments = (id) => {
    id = id.trim();
    return fetch(`${api}/posts/${id}/comments`, {headers})
    .then(res =>  res.json())
    .then( data => data );
}

export const addPost = (post) =>{
    return fetch(`${api}/posts`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(post)})
    .then(res => res.json());  
}

export const votePost = (id, vote) => {
    id = id.trim();
    vote = vote.trim();
    return fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({option:vote})})
    .then(res => res.json());
}

export const editPost = (id, post) => {
    id = id.trim();
    
    return fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(post)})
    .then(res => res.json());
}

export const deletePost = (id) => {
    id = id.trim();
    
    return fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: headers})
    .then(res => res.json());
}

export const commentPost = (post) => {
    
    return fetch(`${api}/comments`, {
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(post)})
    .then(res => res.json());
}

export const editComment = (id, comment) => {
    id = id.trim();
    comment = comment.trim();

    return fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(comment)})
    .then(res => res.json());
}

export const deleteComment = (id) => {
    id = id.trim();
    
    return fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: headers})
    .then(res => res.json());
}
 
