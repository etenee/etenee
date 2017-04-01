import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class LuKStudentTable extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
      const lukStudentColumns = [{
        columns: [{
          header: 'Sukunimi',
          id: 'lastName',
          accessor: d => d.lastName
        },
        {
          header: 'Etunimi',
          accessor: 'firstName'
        },
        {
          header: 'OPS',
          id: 'ops',
          accessor: d => d.curriculum.ops
        },
        {
          header: 'OP',
          accessor: 'totalCredits'
        },
        {
          header: 'Muut',
          accessor: 'otherCredits'
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
      catch (error) {}

      const passedCourses = this.props.passedCourses;
      const passingDate = _.filter(this.props.passedCourses, "date")
      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LuK14"}})
      
      try {
        // passedcourses tulee consoleen
        // passingdate ei worki
        console.log('passed courses:', passedCourses)
        console.log('passing dates:', passingDate)
        _forEach(curriculum.passedCourses, function(passedCourse) {
          lukArray[0].data.push(passedCourse)
        })
        console.log('DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log('lukArray')
      }
      catch (error) {}

      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukArray}
             columns={lukStudentColumns}
             defaultPageSize={5}
             showPagination={false}
             minRows={lukArray.length}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
