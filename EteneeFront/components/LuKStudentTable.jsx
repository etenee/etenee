import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class LuKStudentTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      courses: props.curriculum
    }
    console.log('state coming');
    console.log(this.state);
  }
  componentDidMount() {
    const curriculum = this.props.curriculum
    console.log('curri');
    console.log(curriculum);
  }
  componentDidUpdate(courses) {
    console.log('r')
    console.log(courses);
  }
   render() {
     const courses = [];

     const curAr = this.props.curriculum;
     console.log('curar');
     console.log(curAr);
      const lukStudentColumns = [{
      columns: [{
        header: 'Sukunimi',
        id: 'lastName',
        accessor: d => d.lastName
      }, {
        header: 'Etunimi',
        accessor: 'firstName'
      }]
      }, {
        columns: [{
          render: row => (
            this.props.curriculum.courses.map(course => <div>{course.name}</div>)
          )
        }]
      }]

      const lukStudentData = [
      {lastName: 'Repomies', firstName: 'Rauno', studyPlan: 'LuK 2014', creditsAmount: 132, otherCredits: 22,
      k1: 'X', k2: 'X', k3: 'X', k4: 'X', k5: 'X'},
      {lastName: 'Jarla', firstName: 'Pertti', studyPlan: 'LuK 2014', creditsAmount: 145, otherCredits: 27,
      k1: 'X', k2: '', k3: 'X', k4: 'X', k5: 'X'},
      {lastName: 'Hedberg', firstName: 'Henrik', studyPlan: 'LuK 2014', creditsAmount: 140, otherCredits: 25,
      k1: 'X', k2: 'X', k3: 'X', k4: 'X', k5: ''},
      {lastName: 'Pelkonen', firstName: 'Niko', studyPlan: 'LuK 2015', creditsAmount: 81, otherCredits: 12,
      k1: '', k2: 'X', k3: 'X', k4: 'X', k5: ''},
      {lastName: 'Niiranen', firstName: 'Pekka', studyPlan: 'LuK 2015', creditsAmount: 92, otherCredits: 11,
      k1: 'X', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      {lastName: 'Kivijakola', firstName: 'Päivi', studyPlan: 'LuK 2015', creditsAmount: 82, otherCredits: 15,
      k1: 'X', k2: 'X', k3: '', k4: 'X', k5: ''},
      {lastName: 'Niinistö', firstName: 'Sauli', studyPlan: 'LuK 2016', creditsAmount: 32, otherCredits: 0,
      k1: 'X', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      {lastName: 'Meikäläinen', firstName: 'Matti', studyPlan: 'LuK 2016', creditsAmount: 30, otherCredits: 5,
      k1: 'X', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      ]

      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LUK"}})
      console.log('lukArray coming');
      console.log(this.props);
      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukArray}
             columns={lukStudentColumns}
             defaultPageSize={5}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
