import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'

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
    }]

    const lukStudentData = [
    {lastName: 'Repomies', firstName: 'Rauno', studyPlan: 'LuK 2014', creditsAmount: 132, otherCredits: 22,
    k1: 'X'}, 
    {lastName: 'Jarla', firstName: 'Pertti', studyPlan: 'LuK 2014', creditsAmount: 145, otherCredits: 27,
    k1: 'X'}, 
    {lastName: 'Hedberg', firstName: 'Henrik', studyPlan: 'LuK 2014', creditsAmount: 140, otherCredits: 25,
    k1: 'X'}, 
    {lastName: 'Pelkonen', firstName: 'Niko', studyPlan: 'LuK 2015', creditsAmount: 81, otherCredits: 12,
    k1: 'X'}, 
    {lastName: 'Niiranen', firstName: 'Pekka', studyPlan: 'LuK 2015', creditsAmount: 92, otherCredits: 11,
    k1: 'X'},
    {lastName: 'Kivijakola', firstName: 'Päivi', studyPlan: 'LuK 2015', creditsAmount: 82, otherCredits: 15,
    k1: 'X'},
    {lastName: 'Niinistö', firstName: 'Sauli', studyPlan: 'LuK 2016', creditsAmount: 32, otherCredits: 0,
    k1: 'X'},
    {lastName: 'Meikäläinen', firstName: 'Matti', studyPlan: 'LuK 2016', creditsAmount: 30, otherCredits: 5,
    k1: 'X'},
    ]
    
      return (
        <ReactTable
           data={lukStudentData}
           columns={lukStudentColumns}
           defaultPageSize={5}
         />
      )
   }
}

export default LuKStudentTable;
