import React from 'react'

import { render } from 'react-dom';
//import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
var _ = require('lodash');

import App from './App.jsx';
import { getStudentList } from './actions/actions.js';
import studentModule from './reducers/reducers.js';
//import {startServer} from './server.js';
//let store = createStore()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(studentModule, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
//export default compose(applyMiddleware(thunk))(createStore)(studentModule);
/*const store = createStore(studentModule,
    compose(applyMiddleware(thunk)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//let store = applyMiddleware(thunk)(createStore)(studentModule, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())*/
//let store = createStore(studentModule, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let rootElement = document.getElementById('app')

render(

   <Provider store = {store}>
      <App />
   </Provider>,

   rootElement
)
