import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class LuKStudentTable extends React.Component {
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
      }, {
        columns: [{
          header: 'OPS',
          id: 'ops',
          accessor: d => d.curriculum.ops
        }]
      }, {
        columns: [{
          header: 'OP',
          accessor: 'totalCredits'
        }]
      }, {
        columns: [{
          header: 'Muut',
          accessor: 'otherCredits'
        }]
      }, {
        columns: [{
          header: 'K1',
          accessor: 'k1'
        }]
      }, {
        columns: [{
          header: 'K2',
          accessor: 'k2'
        }]
      }, {
        columns: [{
          header: 'K3',
          accessor: 'k3'
        }]
      }, {
        columns: [{
          header: 'K4',
          accessor: 'k4'
        }]
      }, {
        columns: [{
          header: 'K5',
          accessor: 'k5'
        }]
      }]

      const lukArray = _.filter(this.props.students.students, {"curriculum": {"ops": "LuK14"}})
      //const lukColumns = _.map(this.props.studentsList.students, )

      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukArray}
             columns={lukStudentColumns}
             defaultPageSize={5}
             showPagination={false}
           />
        </div>
      )
   }
}

export default LuKStudentTable;
