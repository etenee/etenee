import React, { Component } from 'react'
import { connect } from 'react-redux'
require('es6-promise').polyfill();
require('isomorphic-fetch');

import Test from './components/test.jsx'

class App extends Component {
   render() {

      return (
         <div>

            <Test />

         </div>
      )
   }
}

function select(state) {
  console.log('state active');
   return {
      //
   }
}

export default App;
