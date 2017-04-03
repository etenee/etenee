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
          course.id = course.code;
          course.accessor = course.name;
          lukStudentColumns[0].columns.push(course);
        })
        console.log('got columns');
        console.log(lukStudentColumns);
      }
      catch (error) {}

      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LuK14"}});
      const passedCourses = _.map(this.props.students.students, "passedCourses");
      console.log('passedCourses:', passedCourses);
      console.log('lukArray:', lukArray);
      // try {
      //   _.forEach(passedCourses, function(passedCourse){
      //     passedCourse.header = passedCourse.name;
      //     passedCourse.id = passedCourse.code;
      //     passedCourse.accessor = passedCourse.name;
      //     lukArray.push({passedCourse});
      //   })
      //   console.log('got passed courses', lukArray);
      // }
      // catch (error) {}
      console.log(passedCourses.name)
      // for (let i of passedCourses) {
      //   passedCourses[i].header = passedCourses.name;
      //   passedCourses[i].id = passedCourses.code;
      //   passedCourses[i].accessor = passedCourses.name;
      //   lukArray.push(passedCourses[i]);
      // }

      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukArray}
             columns={lukStudentColumns}
             defaultPageSize={15}
             showPagination={false}
             hasHeaderGroups={false}
             defaultSorting={[{
               id: 'lastName',
               asc: true
             }]}
             minRows={lukArray.length}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
