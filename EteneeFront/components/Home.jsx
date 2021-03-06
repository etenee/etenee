import React, { Component } from 'react'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';

import Repeater from './repeater.jsx'
import { dataToRedux, curriculumToState, curriculumGroupToState } from '../actions/actions.js';
import { getDataSuccess } from '../actions/actions.js';
import { getStudents } from '../actions/actions.js';

//import 'react-table/react-table.css' <-- VOI TEHDÄ MYÖS NÄIN

class App extends Component {
  componentDidMount() {
    const { dispatch, students } = this.props
    //const mapDispatchToProps = dispatch => ({dataToRedux: () => dispatch(dataToRedux())})
    this.props = dataToRedux(dispatch)
    this.props = curriculumToState(dispatch)
    this.props = curriculumGroupToState(dispatch)
    //this.props.dispatch(dataToRedux())
  };

render() {
  const { studentsList, lukCurriculum, curriculumGroup } = this.props
  /*const coursesArray = _.forEach(this.props.curriculum.lukCurriculum.courses, function(course){
  console.log(course);
  });*/

  return (
    <div>
      <h1 className="siteHeading">Opiskelijoiden etenemisen seurantatyökalu</h1>
      <IndexLink className="toLoginPage" to='/'>Kirjaudu ulos</IndexLink>
      <div>
        <div className="center-container">
          <Repeater group = {curriculumGroup.groupList} students = {studentsList.students}/>
        </div>
      </div>
      <footer className="homeFooter">
        <p>Kaikki sovelluksessa käytettävät nimet on haettu sattumanvaraisesti Suomen väestörekisterikeskuksen tiedoista</p>
      </footer>
    </div>
  )
}
}


function select(state) {
  console.log(state);
  return {
    studentsList: state.students,
    lukCurriculum: state.lukCurriculum,
    curriculumGroup: state.curriculumGroup
  }
}

export default connect(select)(App)
