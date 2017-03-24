import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'

import moment from 'moment'

class LuKStudentTable extends React.Component {
   render() {
      const lukStudentColumns = [{
        columns: [{
          className: 'lastN',
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
        }]
      }, {
        columns: [{
          header: 'OP',
          accessor: 'creditsAmount'
        }]
      }, {
        columns: [{
          header: 'Muut',
          accessor: 'otherCredits'
        }]
      }, {
        columns: [{
          header: 'K1',
          accessor: 'k1',
          render: row => (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '5px'
              }}
            >
            <div
              style={{
                height: '100%',
                backgroundColor: diffToThisDay(row.value) < 30 ? '#00FF00'
                  : diffToThisDay(row.value) > 30 && diffToThisDay(row.value) < 180 ? '#99FF99'
                  : diffToThisDay(row.value) > 180 ? '#CCFFCC'
                  : row.value === 'FAIL' ? '#202020'
                  : null,
              }}
            />
          </div>
        )
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

      const lukStudentData = [
      {lastName: 'Repomies', firstName: 'Rauno', studyPlan: 'LuK 2014', creditsAmount: 132, otherCredits: 22,
      k1: '', k2: 'X', k3: 'X', k4: 'X', k5: 'X'},
      {lastName: 'Jarla', firstName: 'Pertti', studyPlan: 'LuK 2014', creditsAmount: 145, otherCredits: 27,
      k1: '2016-11-28', k2: '', k3: 'X', k4: 'X', k5: 'X'},
      {lastName: 'Hedberg', firstName: 'Henrik', studyPlan: 'LuK 2014', creditsAmount: 140, otherCredits: 25,
      k1: '2017-03-01', k2: 'X', k3: 'X', k4: 'X', k5: ''},
      {lastName: 'Pelkonen', firstName: 'Niko', studyPlan: 'LuK 2015', creditsAmount: 81, otherCredits: 12,
      k1: '', k2: 'X', k3: 'X', k4: 'X', k5: ''},
      {lastName: 'Niiranen', firstName: 'Pekka', studyPlan: 'LuK 2015', creditsAmount: 92, otherCredits: 11,
      k1: '', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      {lastName: 'Kivijakola', firstName: 'Päivi', studyPlan: 'LuK 2015', creditsAmount: 82, otherCredits: 15,
      k1: '2014-08-19', k2: 'X', k3: '', k4: 'X', k5: ''},
      {lastName: 'Niinistö', firstName: 'Sauli', studyPlan: 'LuK 2016', creditsAmount: 32, otherCredits: 0,
      k1: '', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      {lastName: 'Meikäläinen', firstName: 'Matti', studyPlan: 'LuK 2016', creditsAmount: 30, otherCredits: 5,
      k1: '', k2: 'X', k3: 'X', k4: '', k5: 'X'},
      ]

      return (
        <div className="lukTable">
          <h3 className="lukHeader">LuK-opiskelijat</h3>
          <ReactTable
             data={lukStudentData}
             columns={lukStudentColumns}
             pageSizeOptions= {[15, 25, 50, 100]}
             defaultPageSize={15}
           />
        </div>
      )
   }
}

function diffToThisDay(date) {
  var now = moment();
  var then = moment(date);
  var difference = now.diff(then, 'days');
  return difference;
}

export default LuKStudentTable;
