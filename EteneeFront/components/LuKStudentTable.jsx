import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import ReactTooltip from 'react-tooltip'

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
        },
        {
          header: 'Omaopettaja',
          accessor: 'instructorId',
          minWidth: 55
        }]
      }]

      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LuK14"}});
      const passedCourses = _.map(this.props.students.students, "passedCourses");
      console.log('passedCourses:', passedCourses);
      console.log('lukArray1:', lukArray);

      const curriculum = this.props.curriculum;
      try {
        _.forEach(curriculum.courses, function(course) {
          course.header = (kurs) => (
            <span data-tip={course.name}>
              {course.name}
              <ReactTooltip />
           </span>
          )
          course.id = course.code;
          if (passedCourses.find(x => x.code == curriculum.courses.code).code) {
            course.accessor = 'passedCourses[0].code'; 
          }
          else {
            course.accessor = 'passedCourses[0].date';
          }
          
          course.minWidth = 105;
          course.headerClassName = 'courseH';
          lukStudentColumns[0].columns.push(course);
        })
        console.log('got columns');
        console.log(lukStudentColumns);
      }
      catch (error) {}
      

      // const test = _.zipWith(lukArray, passedCourses, (lukArray, passedCourses)=> ({ lukArray, passedCourses }));
      // console.log('test:',test);

      try {
        _.forEach(passedCourses[0], function(course) {
          course.header = course.name;
          course.accessor = course.name;
          course.id = course.code;
          console.log(course);
          lukArray[0].curriculum.ops.push(course);
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
                     <ul>
                       <li>
                         Opiskelijanumero: {row.row.id}
                        </li>
                        <li>
                         Sähköposti: {row.row.email}
                        </li>
                      </ul>
                 </div>
               )
             }}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
