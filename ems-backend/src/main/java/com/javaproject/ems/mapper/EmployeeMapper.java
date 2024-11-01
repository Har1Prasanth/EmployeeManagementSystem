package com.javaproject.ems.mapper;

import com.javaproject.ems.dto.EmployeeDto;
import com.javaproject.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getRole(),
                employee.isActive()
        );
    }


    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getDepartment(),
                employeeDto.getRole(),
                employeeDto.isActive()
        );
    }
}
