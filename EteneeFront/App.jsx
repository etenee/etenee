import React, { Component } from 'react'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {bindActionCreators} from 'redux';

import LuKStudentTable from './components/LuKStudentTable.jsx'
import FMStudentTable from './components/FMStudentTable.jsx'
import { dataToRedux, curriculumToState } from './actions/actions.js';
import { getDataSuccess } from './actions/actions.js';

import { getStudents } from './actions/actions.js';

//import 'react-table/react-table.css' <-- VOI TEHDÄ MYÖS NÄIN

class App extends Component {
  componentDidMount() {
    const { dispatch, students } = this.props
    //const mapDispatchToProps = dispatch => ({dataToRedux: () => dispatch(dataToRedux())})
    this.props = dataToRedux(dispatch)
    this.props = curriculumToState(dispatch)
    //this.props.dispatch(dataToRedux())
  };
   render() {
     const { studentsList, lukCurriculum } = this.props

      return (
        <div>
          <h1 className="siteHeading">Opiskelijoiden etenemisen seurantatyökalu</h1>
          <div className="searchBar">
            Hae opiskelijaa...
          </div>
          <div>
            <div className="center-container">
              <LuKStudentTable students = {studentsList} curriculum = {lukCurriculum}/>
              <FMStudentTable students = {studentsList}/>
            </div>
          </div>
         </div>
      )
   }
}


function select(state) {
  console.log(state);
  return {
    studentsList: state.students,
    lukCurriculum: state.lukCurriculum
  }
}

export default connect(select)(App)
