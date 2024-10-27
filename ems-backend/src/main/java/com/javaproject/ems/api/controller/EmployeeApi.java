package com.javaproject.ems.api.controller;

import com.javaproject.ems.dto.EmployeeDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/employees")
public interface EmployeeApi {

    @PostMapping
    ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto);

    @GetMapping(value = "{id}")
    ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long employeeId);

    @GetMapping
    ResponseEntity<List<EmployeeDto>> getAllEmployees();

    @PutMapping(value = "{id}")
    ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, EmployeeDto employeeDto);

    @PatchMapping()
    ResponseEntity<EmployeeDto> patchEmployee(@RequestParam("id") Long employeeId, @RequestBody EmployeeDto employeeDto);

    @DeleteMapping(value = "{id}")
    ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable("id") Long employeeId);
}
