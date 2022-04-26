import React, { StrictMode } from 'react';
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client"
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, BrowserRouter, Routes} from 'react-router-dom';
// import { browserHistory } from 'react-router';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';
import { firebaseApp } from './firebase';


import Log from './components/Log';
import Profile from './components/Profile';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import reducer from './reducers';
import { updateUser } from './actions';

const history = createBrowserHistory();

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {
    const { email } = user;
    store.dispatch(updateUser(email))
    console.log('logged in');
    history.push('/log');
  }
  else {
    console.log('no user found');
    history.replace('/register')
  }
})


const store = createStore(reducer); // Create reducers

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//   {/* <Provider store={store}> */}
//     <BrowserRouter >
//     <Routes>
//       <Route exact path="/" component={<Welcome/>} />
//       <Route exact path="/log" element={<LogIn/>} />
//       <Route exact path="/profile" component={<Profile/>} />
//       <Route exact path="/signin" component={<SignIn/>} />
//       <Route exact path="/register" component={<Register/>} />
//       </Routes>
//     </BrowserRouter>
//   {/* </Provider> */}
//   </React.StrictMode>
// )

ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter history={createBrowserHistory}>
    <Routes>
      <Route exact path="/" element={<Welcome/>} />
      <Route exact path="/log" element={<Log/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/signin" element={<SignIn/>} />
      <Route exact path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




