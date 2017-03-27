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
            accessor: 'studyPlan'
          },
          {
            header: 'OP',
            accessor: 'creditsAmount'
        }, {
            header: 'Muut',
            accessor: 'otherCredits'
        }, {
            header: 'F1',
            accessor: 'f1'
        }, {
            header: 'F2',
            accessor: 'f2'
        }, {
            header: 'F3',
            accessor: 'f3'
        }, {
            header: 'F4',
            accessor: 'f4'
        }, {
            header: 'F5',
            accessor: 'f5'
          }]
        }]

        const fmStudentData = [
          {lastName: 'Pietikäinen', firstName: 'Pentti', studyPlan: 'FM 2015', creditsAmount: 265, otherCredits: 40,
          f1: '', f2: 'X', f3: 'X', f4: 'X', f5: ''},
          {lastName: 'Virtanen', firstName: 'Matti', studyPlan: 'FM 2015', creditsAmount: 252, otherCredits: 45,
          f1: 'X', f2: '', f3: 'X', f4: 'X', f5: 'X'},
          {lastName: 'Virtanen', firstName: 'Liisa', studyPlan: 'FM 2016', creditsAmount: 225, otherCredits: 32,
          f1: 'X', f2: 'X', f3: 'X', f4: 'X', f5: ''},
          {lastName: 'Virtanen', firstName: 'Pertti', studyPlan: 'FM 2016', creditsAmount: 218, otherCredits: 30,
          f1: 'X', f2: 'X', f3: 'X', f4: '', f5: ''},
          {lastName: 'Kurri', firstName: 'Jari', studyPlan: 'FM 2014', creditsAmount: 302, otherCredits: 42,
          f1: 'X', f2: 'X', f3: 'X', f4: 'X', f5: 'X'},
          {lastName: 'Laurila', firstName: 'Juho', studyPlan: 'FM 2014', creditsAmount: 323, otherCredits: 40,
          f1: 'X', f2: 'X', f3: 'X', f4: 'X', f5: 'X'},
          {lastName: 'Keränen', firstName: 'Henri', studyPlan: 'FM 2014', creditsAmount: 319, otherCredits: 40,
          f1: 'X', f2: 'X', f3: 'X', f4: '', f5: 'X'},
        ]
        // _. alkuinen tarkoittaa aina lodash metodia
        //propseja pitäisi vielä korjata. Tulevat nyt pöljästi students
        //listana students objektin sisässä
        const fmArray = _.filter(this.props.students.students, { "curriculum": {"ops": "FM"} });
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
                    //showPagination pitäs saaha jotenki falseksi, se on tällä hetkellä true
                />

            </div>
        )

    }
}

export default FMStudentTable;
