import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class LuKStudentTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      courses: []
    }
    console.log('state coming');
    console.log(this.state);
  }
   render() {
      const lukStudentColumns = [{
      columns: [{
        header: 'Sukunimi',
        id: 'lastName',
        accessor: d => d.lastName
      }, {
        header: 'Etunimi',
        accessor: 'firstName'
        }]
      }]

      const curriculum = this.props.curriculum;
      try {
        _.forEach(curriculum.courses, function(course) {
          course.header = course.name;
          course.id = course.code
          course.accessor = course.name;
          lukStudentColumns[0].columns.push(course)
        })
        console.log('got columns');
        console.log(lukStudentColumns);
      }
      catch (error) {
        //console.log(error);
      }
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
