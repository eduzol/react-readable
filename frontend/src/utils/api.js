const api =  process.env.REACT_READABLE_API || 'http://localhost:3001';

let token = localStorage.token;
if (!token) {
    localStorage.token = Math.random().toString(36).substr(-8);
    token = localStorage.token;
}

console.log('token ' , token);
const headers = {
    'Accept': 'application/json',
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
        .then( data => data )
}

export const getPostById = () => {


}

    