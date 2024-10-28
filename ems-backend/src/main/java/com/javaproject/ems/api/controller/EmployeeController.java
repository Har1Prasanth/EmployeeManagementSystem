package com.javaproject.ems.api.controller;

import com.javaproject.ems.api.EmployeeApi;
import com.javaproject.ems.dto.EmployeeDto;
import com.javaproject.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class EmployeeController implements EmployeeApi {

    private EmployeeService employeeService;


    @Override
    public ResponseEntity<EmployeeDto> createEmployee(EmployeeDto employeeDto) {
            EmployeeDto createdEmployee = employeeService.createEmployee(employeeDto);
            return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
        }

    @Override
    public ResponseEntity<EmployeeDto> getEmployee(Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployee(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    @Override
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employeeDtos = employeeService.getAllEmployees();
        return ResponseEntity.ok(employeeDtos);
    }

    @Override
    public ResponseEntity<EmployeeDto> updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, employeeDto);
        return ResponseEntity.ok(updatedEmployee);

    }

    @Override
    public ResponseEntity<EmployeeDto> patchEmployee(Long employeeId, EmployeeDto employeeDto) {
        EmployeeDto patchedEmployee = employeeService.patchEmployee(employeeId, employeeDto);
        return ResponseEntity.ok(patchedEmployee);
    }

    @Override
    public ResponseEntity<EmployeeDto> deleteEmployee(Long employeeId) {
        EmployeeDto deletedEmployee = employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok(deletedEmployee);
    }
}
