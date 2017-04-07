import React, { Component, PropTypes } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

class FMStudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fetch('http://localhost:3001/curriculumGroup/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }).then((response) => response.json())
    }
  }
    render() {

      console.log(Promise.resolve(this.state.data));


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
        console.log('fmArray:', fmArray);

        return (
            <div>
              <h3>FM-opiskelijat</h3>
              <h3>{this.state.data[0]}</h3>
                <ReactTable
                    data={fmArray}
                    columns={fmStudentColumns}
                    defaultPageSize={5}
                    showPagination={false}
                    // minRows={lukArray.length}
                    hasHeaderGroups={false}
                />

            </div>
        )

    }
}

export default FMStudentTable;
