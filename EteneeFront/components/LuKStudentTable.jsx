import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

import StudentInfo from './studentInfo.jsx'

class LuKStudentTable extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
      const lukStudentColumns = [{
        columns: [{
          className: 'lastN',
          header: 'Sukunimi',
          id: 'lastName',
          accessor: d => d.lastName
        },
        {
          className: 'firstN',
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
          accessor: 'totalCredits',
          minWidth: 55
        },
        {
          header: 'Muut',
          accessor: 'otherCredits',
          minWidth: 55
        }]
      }]

      const curriculum = this.props.curriculum;
      try {
        _.forEach(curriculum.courses, function(course) {
          course.header = course.name;
          course.id = course.code;
          course.accessor = course.name;
          course.minWidth = 35;
          course.headerClassName = 'courseH';
          lukStudentColumns[0].columns.push(course);
        })
        console.log('got columns');
        console.log(lukStudentColumns);
      }
      catch (error) {}

      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LuK14"}});
      const passedCourses = _.map(this.props.students.students, "passedCourses");
      console.log('passedCourses:', passedCourses);
      console.log('lukArray1:', lukArray);

      let passedCoursesNames = [];
      for (let student of lukArray) {
        for (let course of student.passedCourses) {
          passedCoursesNames.push(course.name);
        }
      }
      console.log(passedCoursesNames)
      try {
        _.forEach(passedCoursesNames, function(courseName) {
          courseName.header = courseName.name;
          courseName.accessor = courseName.name;
          courseName.id = courseName.name;
          lukArray.push(courseName);
        })
        console.log('lukArray2:',lukArray);
      }
      catch(error){}

      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukArray}
             columns={lukStudentColumns}
             showPagination={false}
             hasHeaderGroups={false}
             defaultSorting={[{
               id: 'lastName',
               asc: true
             }]}
             minRows={lukArray.length}
             SubComponent={(row) => {
               return (
                 <div>
                   <p data-tip="hoi">Hei</p>
                 </div>
               )
             }}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
