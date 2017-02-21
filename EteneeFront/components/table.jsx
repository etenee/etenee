import React, { Component } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'

class Table extends React.Component {
   render() {
     const columns = [{
      header: 'Name',
      columns: [{
        header: 'First Name',
        accessor: 'firstName'
      }, {
        header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName
      }]
    }, {
      header: 'Info',
      columns: [{
        header: 'Age',
        accessor: 'age'
      }]
    }]

    const data = [{Name: 'shit'}, {Name: 'Shit'}]
      return (
        <ReactTable
           data={data}
           columns={columns}
           defaultPageSize={10}
         />
      )
   }
}

export default Table;