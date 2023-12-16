import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
        this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
        this.changEmailHandler = this.changEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeByID(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({firstName: employee.firstName, 
                lastName: employee.lastName, 
                emailId: employee.emailId
            });
        });
    }
    updateEmployee = (e)=>{
        e.preventDefault();

        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => '+ JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id).then((res)=>{
            this.props.history.push('/employees');
        });
    }


    changeFirstnameHandler = (event)=> {
        this.setState({firstName: event.target.value});
    }
    changeLastnameHandler= (event)=> {
        this.setState({lastName: event.target.value});
    }
    changEmailHandler= (event)=> {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name : </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstnameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name : </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastnameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id : </label>
                                        <input placeholder="Email Id" name="emailId" className="form-control" value={this.state.emailId} onChange={this.changEmailHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;