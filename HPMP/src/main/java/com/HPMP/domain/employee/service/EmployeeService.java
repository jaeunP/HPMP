package com.HPMP.domain.employee.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HPMP.common.RequestList;
import com.HPMP.domain.employee.EmployeeDto;
import com.HPMP.domain.employee.mapper.EmployeeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	
	private final EmployeeMapper employeeMapper;
	
//	public List<EmployeeDto> getEmployeeList(){
//		return employeeMapper.getEmployeeList();
//	}
	
	public Page<EmployeeDto> getEmployeeList(Pageable pageable){		
				
		RequestList<?> requestList = RequestList.builder()
				.pageable(pageable)
				.build();
		
		List<EmployeeDto> employeeList = employeeMapper.getEmployeeList(requestList);
		int total = employeeMapper.countList();
		
		return new PageImpl<EmployeeDto>(employeeList, pageable, total);
		
	}
	
	
//	public List<EmployeeDto> searchEmployee(EmployeeDto employeeDto) {
//		return employeeMapper.searchEmployee(employeeDto);
//	}
	
	public Page<EmployeeDto> searchEmployee(EmployeeDto employeeDto, Pageable pageable) {
		RequestList<?> requestList = RequestList.builder()
				.data(employeeDto)
				.pageable(pageable)
				.build();
		
		List<EmployeeDto> searchEmployeeList = employeeMapper.searchEmployee(requestList);
		int total = employeeMapper.countSearchList(employeeDto);
			
		return new PageImpl<EmployeeDto>(searchEmployeeList, pageable, total);
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
