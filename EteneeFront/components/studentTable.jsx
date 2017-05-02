import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
const tlite = require('tlite');
tlite(el => el.classList.contains('foo'));

class StudentTable extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
      const studentColumns = [{
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
            <span class="foo" title="Omaopettaja">
              Omaopettaja
            </span>
          ),
          accessor: 'instructorNameBrev',
          minWidth: 55
          // show: false
        }, {
          header: 'passedCourses',
          accessor: 'passedCourses[courseId]'
        }]
      }]

      let tableData = _.filter(this.props.students, {"curriculum": this.props.curriculumName});
      //console.log('tabledata' + JSON.stringify(tableData));
      /*const tableData = (props) => {
        let value = _.filter(props.students, {"curriculum": this.props.curriculumName});
        console.log('value is ' + JSON.stringify(value));
        return value;
      }*/
      const passedCourses = _.map(this.props.students, "passedCourses");
      //console.log('passedCourses:', passedCourses);
      //console.log('tableData1:', tableData);


      const curriculum = this.props.curriculum;
      //console.log('curricuum');
      //console.log(this.props.curriculum);

      try {
        _.forEach(curriculum, function(course) {
          //console.log('debug course');
          //console.log(course);
          course.header = () => (
            <span class="foo" title={course.name}>
              {course.name}
           </span>
          )
          course.accessor = course.courseId;
          course.minWidth = 45;
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
              class="foo"
              title={row.row.lastName + ' ' + row.row.firstName + '\n' + course.name + ' (' + course.courseId + ')\nSuorituspäivä: ' + row.value}
            />
          </div>
          )
        studentColumns[0].columns.push(course);
        })
        //console.log('got columns');
        //console.log(studentColumns);
      }
      catch (error) {}

      let element = <div className="lukTable">
          <h3 className="lukHeader">{this.props.curriculumName}</h3>
          <ReactTable
             data={tableData}
             columns={studentColumns}
             showPagination={false}
             hasHeaderGroups={false}
             defaultSorting={[{
               id: 'lastName',
               asc: true
             }]}
             Sorting={[{
               
             }]}
             pageSize={tableData.length}
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
             /*getTheadThProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: e => {
                    //console.log('A Td Element was clicked!')
                    //console.log('it produced this event:', e)
                    console.log('It was in this column:', column)
                    console.log('It was in this row:', rowInfo)
                    //console.log('It was in this table instance:', instance)
                  }
                }
              }}*/
              /*onSortingChange={(column) => {
                console.log(column);
                if (column.id === 'firstName') {
                  let value = _.sortBy(tableData, ['firstName']);
                  console.log(value);
                  tableData = value;
                } else if (column.id === 'lastName') {
                  let value = _.sortBy(tableData, ['lastName']);
                  console.log(value);
                  tableData = value;
                }
                return undefined;
              }}*/
           />
        </div>

        //console.log(element);
        console.log('2016-02-05' > '2017-02-05');

      return (
        <div>{element}</div>
      )
   }
}

function diffToThisDay (date) {
  var now = moment()
  var then = moment(date, 'YYYY-MM-DD').subtract(1, 'day')
  var difference = now.diff(then, 'days')
  return difference
}

export default StudentTable;
