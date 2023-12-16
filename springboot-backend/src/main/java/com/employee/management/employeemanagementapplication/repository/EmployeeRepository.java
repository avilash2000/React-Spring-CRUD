package com.employee.management.employeemanagementapplication.repository;

import com.employee.management.employeemanagementapplication.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}