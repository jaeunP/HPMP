package com.HPMP.domain.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.HPMP.domain.employee.EmployeeDto;
import com.HPMP.domain.employee.mapper.EmployeeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	
	private final EmployeeMapper employeeMapper;
	
	public List<EmployeeDto> getEmployeeList(){
		return employeeMapper.getEmployeeList();
	}
	
}
