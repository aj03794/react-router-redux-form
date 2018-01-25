import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserHistory is what decides exactly what to do when URL changes
// look at entire URL when deciding what components to show on the screen
// Route object is to provide configuration for saying if URL
// looks like this display this component and so on
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers/index';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//***NOTE***
// Having the two <Route /> tags there make them render together
// This is because "/" path is contained within
// "/posts/new" so they get rendered together when you go to that route
// Having SWITCH tag in there fixes the above issue
// take note of how the order of the routes, it is important
// /new would technically fit the :id wildcard so it needs to come above it
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));






// **NOTE**: EXAMPLE OF USING REACT ROUTER
// class Hello extends React.Component {
//   render() {return <div>Hello!</div>}
// }
//
// class Goodbye extends React.Component {
//   render() {return <div>Goodbye!</div>}
// }

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//       <div>
//         <Route path="/hello" component={Hello} />
//         <Route path="/goodbye" component={Goodbye}  />
//       </div>
//     </BrowserRouter>
//   </Provider>
//   , document.querySelector('.container'));
