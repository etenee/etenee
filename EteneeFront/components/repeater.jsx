import React, { Component, PropTypes } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import StudentTable from './studentTable.jsx';

class Repeater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //not used but good to have
    }
  }

    render() {

        //this function returns an array of Student table components.
        //in react you can put functions that return JSX directly into render return
        //this is a very good way
        const table = (group, students) => (
            <div>{group.map((row) => 
                <div key={row.curriculumName}>
                    <StudentTable students = {this.props.students} curriculum = {row.courses} curriculumName = {row.curriculumName}/>
                </div>)
            }</div>
        );

        console.log('repeater props');
        console.log(this.props);

        return (
            <div>
                <div>
                    {table(this.props.group, this.props.students)}
                </div>
            </div>
        )

    }
}

//defaut props to prevent errors from undefined props
Repeater.defaultProps = {
    group: [
        {curriculumName: 'lataa...',
        courses: []
        }
    ],
    students: [{
        firstName: 'lataa'
    }]
}

export default Repeater;