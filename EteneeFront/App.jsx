import React, { Component } from 'react'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {bindActionCreators} from 'redux';

import Test from './components/test.jsx'
import LuKStudentTable from './components/LuKStudentTable.jsx'
import FMStudentTable from './components/FMStudentTable.jsx'
import { dataToRedux } from './actions/actions.js';
import { getDataSuccess } from './actions/actions.js';

import { getStudents } from './actions/actions.js';

//import 'react-table/react-table.css' <-- VOI TEHDÄ MYÖS NÄIN

class App extends Component {
  componentDidMount() {
    const { dispatch, students } = this.props
    //const mapDispatchToProps = dispatch => ({dataToRedux: () => dispatch(dataToRedux())})
    this.props = dataToRedux(dispatch)
    //this.props.dispatch(dataToRedux())
  };
   render() {
     const { studentsList } = this.props

      return (
         <div>
          <Test className="headline"/>
          <div className="center-container">
            <LuKStudentTable students = {studentsList}/>
            <FMStudentTable students = {studentsList}/>
          </div>

         </div>
      )
   }
}


function select(state) {
  console.log(state);
  return {
    studentsList: state.students
  }
}

export default connect(select)(App)
