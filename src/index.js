import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import { Router, Route} from 'react-router';
import { createBrowserHistory } from 'history'
import { firebaseApp } from './firebase';

const myStore = createStore(reducer);

ReactDOM.render(
  <Provider myStore={myStore}>
    <Router path="/" history={createBrowserHistory}>
      <Route path="/log" component={Log} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </Router>
  </Provider>
)


