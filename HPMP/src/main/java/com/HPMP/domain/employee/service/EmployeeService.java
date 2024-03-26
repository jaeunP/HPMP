package com.HPMP.domain.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	public List<EmployeeDto> searchEmployee(EmployeeDto employeeDto) {
		return employeeMapper.searchEmployee(employeeDto);
	}
	
	@Transactional
	public void insertEmployee(EmployeeDto employeeDto) {
		employeeMapper.insertEmployee(employeeDto);
	}
	
	
	@Transactional
	public int deleteEmployeeAtView(List<EmployeeDto> employeeNo) {
		int deleteCnt = employeeMapper.deleteEmployeeAtView(employeeNo);
		
		return deleteCnt;
	}
	
}
