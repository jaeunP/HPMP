package com.HPMP.domain.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.HPMP.domain.employee.EmployeeDto;


@Mapper
public interface EmployeeMapper {
	
	public List<EmployeeDto> getEmployeeList();
	
	public List<EmployeeDto> searchEmployee(EmployeeDto employeeDto); 
	
	public void insertEmployee(EmployeeDto employeeDto);
	
	public int deleteEmployeeAtView(List<EmployeeDto> employeeNo);
	
}
