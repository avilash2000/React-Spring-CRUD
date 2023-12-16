import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            // Step 2 to use same compo for create and update
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
        this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
        this.changEmailHandler = this.changEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    //Step 3 to use same component
    componentDidMount(){

        //Step 4:
        if(this.state.id === 'add'){
            return;
        }
        else{
            EmployeeService.getEmployeeByID(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({firstName: employee.firstName, 
                    lastName: employee.lastName, 
                    emailId: employee.emailId
                });
            });
        }
    }

    saveOrUpdateEmployee = (e)=>{
        e.preventDefault();

        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => '+ JSON.stringify(employee));

        //Step 5
        if(this.state.id === 'add'){
            EmployeeService.createEmployee(employee).then(res=>{
                this.props.history.push('/employees');
            });
        }
        else{
            EmployeeService.updateEmployee(employee, this.state.id).then((res)=>{
                this.props.history.push('/employees');
            });
        }
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
    
    getHeading(){
        if(this.state.id === 'add'){
            return <h3 className="text-center">Add Employee</h3>
        }
        else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getHeading()
                            }
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

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent;