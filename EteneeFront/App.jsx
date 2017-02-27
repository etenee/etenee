import React, { Component } from 'react'
import { connect } from 'react-redux'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Test from './components/test.jsx'
import LuKStudentTable from './components/LuKStudentTable.jsx'
import FMStudentTable from './components/FMStudentTable.jsx'

//import 'react-table/react-table.css' <-- VOI TEHDÄ MYÖS NÄIN

class App extends Component {
   render() {

      return (
         <div>
          <Test className="headline"/>
          <div className="center-container">
            <LuKStudentTable />
            <FMStudentTable />
          </div>

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
