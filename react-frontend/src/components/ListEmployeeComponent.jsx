import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import {Link} from 'react-router-dom';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    deleteEmployee(id){
        console.log('Able to reach the employee delete code');
        EmployeeService.deleteEmployee(id).then((res)=>{
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees: res.data})
        });
    }
    addEmployee(){
        console.log('addEmployee function called');
        this.props.history.push('/add-employee/add');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Employees List</h2>
                <div className="row">
                    <button style={{width : "200px"}} className="btn btn-info" onClick={this.addEmployee}>Add Employee</button>
                    {/* <Link to="/add-employee/add" className="btn btn-primary">Add Employee</Link> */}

                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee EmilId</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft : "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft : "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                </div>

            </div>
        );
    }
}

export default ListEmployeeComponent;