const api =  process.env.REACT_READABLE_API || 'http://localhost:3001';

let token = localStorage.token;
console.log('token ' , token);
if (!token) {
    localStorage.token = Math.random().toString(36).substr(-8);
    token = localStorage.token;
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res =>  res.json())
        .then( data => data.categories )

export const getPosts = (category) => {
    category = category.trim();
    return fetch(`${api}/${category}/posts`,  {headers})
        .then( res => res.json())
        .then( data => data);
}

    