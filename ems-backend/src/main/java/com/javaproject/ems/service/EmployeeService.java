package com.javaproject.ems.service;

import com.javaproject.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployee(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto);

    EmployeeDto patchEmployee(Long employeeId, EmployeeDto employeeDto);

    EmployeeDto deleteEmployee(Long employeeId);
}
