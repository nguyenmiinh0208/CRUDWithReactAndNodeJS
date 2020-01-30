import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            name: '',
            company: '',
            age:''
        }
    }
  
    componentDidMount() {
        axios.get('http://localhost:4444/persons/edit/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    company: res.data.company,
                    age: res.data.age });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }
  
    onChangeCompany(event) {
        this.setState({
            company: event.target.value
        });
    }
  
    onChangeAge(event) {
        this.setState({
            age: event.target.value
        });
    }
  
    onSubmit(event) {
        event.preventDefault();
        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age
        }
        axios.post('http://localhost:4444/persons/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/index');
    }
  
  
    render() {
      return(
        <div style={{marginTop: 10}}>
          <h3>Update Info</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Person Name:  </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}/>
              </div>
              <div className="form-group">
                <label>Company: </label>
                <input type="text" className="form-control" value={this.state.company} onChange={this.onChangeCompany}/>
              </div>
              <div className="form-group">
                <label>Age: </label>
                <input type="text" className="form-control" value={this.state.age} onChange={this.onChangeAge}/>
              </div>
              <div className="form-group">
                <input type="submit" value="Update Person Info" className="btn btn-primary"/>
              </div>
          </form>
      </div>
      )
    }
}