package com.employee.management.employeemanagementapplication.service;

import com.employee.management.employeemanagementapplication.exception.ResourceNotFoundException;
import com.employee.management.employeemanagementapplication.model.Employee;
import com.employee.management.employeemanagementapplication.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee getEmployeeByID(Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee with id : "+id+" does not exist!"));

        return employee;
    }

    public Employee updateEmployeeByID(Long id, Employee employee){
        Employee updatedEmployee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee with id : "+id+" does not exist!"));

        updatedEmployee.setFirstName(employee.getFirstName());
        updatedEmployee.setLastName(employee.getLastName());
        updatedEmployee.setEmailId(employee.getEmailId());

        return employeeRepository.save(updatedEmployee);
    }

    public Boolean deleteEmployeeId(Long id){
        Employee employeeToBeDeleted = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee with id : "+id+" does not exist!"));

        employeeRepository.delete(employeeToBeDeleted);
        return Boolean.TRUE;
    }
}
