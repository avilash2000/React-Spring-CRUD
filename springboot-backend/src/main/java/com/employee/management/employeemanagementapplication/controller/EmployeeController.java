package com.employee.management.employeemanagementapplication.controller;

import com.employee.management.employeemanagementapplication.model.Employee;
import com.employee.management.employeemanagementapplication.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    //List all employees
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> allEmployees = employeeService.getAllEmployees();

        return ResponseEntity.ok(allEmployees);
    }

    //Create a new employee
    @PostMapping("/employee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee employee1 = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(employee1);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeByID(@PathVariable Long id){
        Employee employee = employeeService.getEmployeeByID(id);

        return ResponseEntity.ok(employee);
    }

    @PutMapping ("/employee/{id}")
    public ResponseEntity<Employee> updateEmployeeByID(@PathVariable Long id, @RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployeeByID(id,employee);

        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping ("/employee/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Boolean isDeleted = employeeService.deleteEmployeeId(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",isDeleted);
        return ResponseEntity.ok(response);
    }
}
