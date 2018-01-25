import {FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST} from '../actions';
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form'

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      // action.payload is the id in this case because that is what we passed
      // in the payload in the action
      return _.omit(state, action.payload)
    case FETCH_POST:
      console.log('fetch post')
      const post = action.payload.data
      // Take all the existing posts and take them out of the state object
      // and put them in this new object
        // const newState = {...state }
        // newState[post.id] = post;
        // return newState

      // This is equivalent to lines 11 - 13
      // Square brackets here is key interpolation
      // whatever the variable is in there, make a new keyload on the object
      // with whatever that value is and set it equal to action.payload.data
      return { ...state, [action.payload.data.id]: action.payload.data }
    case FETCH_POSTS:
      console.log('fetching posts')
      // Will get an array here
      // Want an object with other objects in it
      // can do this with lodash or just the reduce method
      const posts = _.mapKeys(action.payload.data, 'id')
      return posts;
    // case CREATE_POST:
    //
    default:
      return state;
  }
}
