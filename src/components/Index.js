import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {persons: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4444/persons')
            .then(res => {
                console.log(res.data);
                this.setState({persons: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    tabRow() {
        return this.state.persons.map(function(object, index) {
            return <TableRow obj={object} key={index} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Person List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Age</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}