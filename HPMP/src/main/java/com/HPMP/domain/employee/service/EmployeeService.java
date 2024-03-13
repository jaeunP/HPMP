package com.HPMP.domain.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.HPMP.domain.employee.EmployeeDao;
import com.HPMP.domain.employee.mapper.EmployeeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	
	private final EmployeeMapper employeeMapper;
	
	public List<EmployeeDao> getEmployeeList(){
		return employeeMapper.getEmployeeList();
	}
	
	public void insertEmployee(EmployeeDao employeeDto) {
		employeeMapper.insertEmployee(employeeDto);
	}
	
}
