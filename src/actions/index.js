import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'
export const FETCH_POST = 'fetch_post'
export const DELETE_POST = 'delete_post'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=123'


export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  // This is the action that we are returning
  // Redux promise middleware automatically resolves
  // request for us (remember that it is a promise b/c
  // it is a network request)
  return {
    type: FETCH_POSTS,
    payload: request
  };
}


export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  // Once promise has been resolved, execute the callback that was passed in
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback())

  return {
    type: DELETE_POST,
    payload: id
  }
}
