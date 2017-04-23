import React, { Component, PropTypes } from 'react'
//import {connect} from 'react-redux'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import StudentTable from './studentTable.jsx';

class Repeater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

    render() {

        let properties = this.props;

        const array = [2, 3, , 5, 6];

        const table = (group, students) => (
            <div>{group.map((row) => 
                <div key={row.curriculumName}>
                    <StudentTable students = {this.props.students} curriculum = {row.courses} curriculumName = {row.curriculumName}/>
                </div>)
            }</div>
        );

        function getProps () {
            const prop = properties.students;
            return prop;
        }
        console.log('repeater props');
        console.log(this.props);
        var rows = properties.group.map(function(row) {
            //Add props to your LiComponent just as you would normally. 
            //return <studentTable />
            
            return <studentTable key={row.curriculumName}/>
        });

        return (
            <div>
                <h2>
                    {table(this.props.group, this.props.students)}
                </h2>
            </div>
        )

    }
}

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