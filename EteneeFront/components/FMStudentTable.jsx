import React, { Component, PropTypes } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class FMStudentTable extends React.Component {
    render() {
        const fmStudentColumns = [{
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
            header: 'F1',
            accessor: 'f1'
          }]
        }, {
          columns: [{
            header: 'F2',
            accessor: 'f2'
          }]
        }, {
          columns: [{
            header: 'F3',
            accessor: 'f3'
          }]
        }, {
          columns: [{
            header: 'F4',
            accessor: 'f4'
          }]
        }, {
          columns: [{
            header: 'F5',
            accessor: 'f5'
          }]
        }]

        // _. alkuinen tarkoittaa aina lodash metodia
        //propseja pitäisi vielä korjata. Tulevat nyt pöljästi students
        //listana students objektin sisässä
        const fmArray = _.filter(this.props.students.students, { "curriculum": {"ops": "FM14"} });
        //const fmColumnsArray = _.filter(this.props.students.students, { ""})
        console.log('filtered FM students from student list');
        console.log(fmArray);

        return (
            <div>
              <h3>FM-opiskelijat</h3>
                <ReactTable
                    data={fmArray}
                    columns={fmStudentColumns}
                    defaultPageSize={5}
                    showPagination={false}
                />

            </div>
        )

    }
}

export default FMStudentTable;
