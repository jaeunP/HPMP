package com.HPMP.domain.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.HPMP.common.RequestList;
import com.HPMP.domain.employee.EmployeeDto;


@Mapper
public interface EmployeeMapper {
	
//	public List<EmployeeDto> getEmployeeList();
	public List<EmployeeDto> getEmployeeList(RequestList<?> requestList);
	
	
//	public List<EmployeeDto> searchEmployee(EmployeeDto employeeDto);
	public List<EmployeeDto> searchEmployee(RequestList<?> requestList);
	
	public void insertEmployee(EmployeeDto employeeDto);
	
	public int deleteEmployeeAtView(List<EmployeeDto> employeeNo);
	
	public int countList();
	
	public int countSearchList(EmployeeDto employeeDto);
	
}
