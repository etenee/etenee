import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
const tlite = require('tlite');
tlite(el => el.classList.contains('foo'));

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
          headerClassName: 'omaOpet',
          header: () => (
            <span title="Omaopettaja">
              Omaopettaja
            </span>
          ),
          accessor: 'instructorId',
          minWidth: 55
          // show: false
        }]
      }]

      let lukArray = _.filter(this.props.students.students, {"curriculum": "Luk14"});
      const passedCourses = _.map(this.props.students.students, "passedCourses");
      console.log('passedCourses:', passedCourses);
      console.log('lukArray1:', lukArray);


      const curriculum = this.props.curriculum;

      try {
        _.forEach(curriculum.courses, function(course) {
          course.header = () => (
            <span title={course.name}>
              {course.name}
           </span>
          )
          course.accessor = course.code;
          course.minWidth = 40;
          course.headerClassName = 'courseH';
          course.render = (row) => (
            <div
              style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#dadada',
              borderRadius: '2px'
              }}
            >
            <div
              style={{
                height: '100%',
                backgroundColor: diffToThisDay(row.value) >= 30 ? '#CCFFCC'
                : diffToThisDay(row.value) > 0 && diffToThisDay(row.value) < 30 ? '#00FF00'
                : '#dadada',
                borderRadius: '2px',
                transition: 'all .2s ease-out'
              }}
              title={row.row.lastName + ' ' + row.row.firstName + '\n' + course.name + ' (' + course.code + ')\nSuorituspäivä: ' + row.value}
            />
          </div>
        )
        lukStudentColumns[0].columns.push(course);
        })
        console.log('got columns');
        console.log(lukStudentColumns);
      }
      catch (error) {}

      return (
        <div className="scrolling">
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
              pageSize={lukArray.length}
              SubComponent={(row) => {
                return (
                  <div className="subClass">
                      <ul>
                        <li> Opiskelijanumero: {row.row.studentId} </li>
                        <li> Sähköposti: {row.row.email} </li>
                      </ul>
                  </div>
                )
              }}
            />
          </div>
        </div>
      )
   }
}

function diffToThisDay (date) {
  var now = moment()
  var then = moment(date, 'YYYY-MM-DD').subtract(1, 'day')
  var difference = now.diff(then, 'days')
  return difference
}

export default LuKStudentTable;
