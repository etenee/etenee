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
    //hardcoded data for react table
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
      }]
    }]
    //this is the data we pass to the react table
    let tableData = _.filter(this.props.students, {"curriculum": this.props.curriculumName});
    const curriculum = this.props.curriculum;
    // push course data into columns. This is actually not a very good way
    //default props would probably be better
    try {
      _.forEach(curriculum, function(course) {
        course.header = () => (
          <span class="foo" title={course.name}>
            {course.name}
          </span>
        )
        course.accessor = course.courseId;
        course.minWidth = 45;
        course.render = (row) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '2px'
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: diffToThisDay(row.value) >= 30 ? '#99FF99'
                : diffToThisDay(row.value) > 0 && diffToThisDay(row.value) < 30 ? '#00FF00'
                : '#FFFFFF',
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
    }
    catch (error) {}

    // variable that is a react table
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
            //this is an attempt to make custom sorting for passed courses
            //react table author says this will have a patch in the future
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
           resizable={false}
      />
    </div>

    return (
      <div>{element}</div>
    )
  }
}

// this function compares the date of the row to this day
function diffToThisDay (date) {
  var now = moment()
  var then = moment(date, 'YYYY-MM-DD').subtract(1, 'day')
  var difference = now.diff(then, 'days')
  return difference
}

export default StudentTable;
