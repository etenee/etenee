import React, { Component } from 'react'
import { connect } from 'react-redux'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Test from './components/test.jsx'
import Table from './components/table.jsx'

class App extends Component {
   render() {

      return (
         <div>

            <Test />
            <Table />

         </div>
      )
   }
}

/*function select(state) {
  console.log('state active');
   return {
      //
   }
}*/

export default App;
