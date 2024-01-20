package com.javaproject.ems.service.impl;

import com.javaproject.ems.dto.EmployeeDto;
import com.javaproject.ems.entity.Employee;
import com.javaproject.ems.exception.ResourceNotFoundException;
import com.javaproject.ems.mapper.EmployeeMapper;
import com.javaproject.ems.repository.EmployeeRepository;
import com.javaproject.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = employeeRepository.save(EmployeeMapper.mapToEmployee(employeeDto));
        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public EmployeeDto getEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with Id " + employeeId + " doesn't exist"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employee -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());

    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with Id " + employeeId + " doesn't exist"));

        employee.setFirstName(updatedEmployeeDto.getFirstName());
        employee.setLastName(updatedEmployeeDto.getLastName());
        employee.setEmail(updatedEmployeeDto.getEmail());
        employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Optional<Employee> employee = Optional.ofNullable(employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with Id " + employeeId + " doesn't exist")));

        if (employee.isPresent()) {
            employeeRepository.deleteById(employeeId);
            return;
        }

        return;
    }
}
