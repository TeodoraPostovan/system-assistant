import React from 'react';
import ReactDOM from 'react-dom';
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route} from 'react-router';
import { createBrowserHistory } from 'history'
import { firebaseApp } from './firebase';

import LogIn from './components/LogIn';
import Profile from './components/Profile';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';

const store = createStore(reducer); // Create reducers

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={createBrowserHistory}>
      <Route path="/" component={Welcome} />
      <Route path="/log" component={LogIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </Router>
  </Provider>
)


