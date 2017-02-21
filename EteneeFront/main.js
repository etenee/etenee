import React from 'react'

import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'

//let store = createStore()
//let store = createStore(itemApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let rootElement = document.getElementById('app')

render(

   //<Provider /*store = {store}*/>
      <App />
   /*</Provider>*/,

   rootElement
)
