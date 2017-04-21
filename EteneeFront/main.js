import React from 'react'

import { render } from 'react-dom';
//import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
var _ = require('lodash');
const tlite = require('tlite');
import config from './config/config.js';

import App from './App.jsx';
import { getStudentList } from './actions/actions.js';
import studentModule from './reducers/reducers.js';
//import {startServer} from './server.js';
//let store = createStore()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(studentModule, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

let rootElement = document.getElementById('app')

render(

   <Provider store = {store}>
      <App />
   </Provider>,

   rootElement
)
