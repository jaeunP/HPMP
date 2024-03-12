package com.HPMP.domain.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.HPMP.domain.employee.EmployeeDto;

@Mapper
public interface EmployeeMapper {
	
	public List<EmployeeDto> getEmployeeList();
	
	public void insertEmployee(EmployeeDto employeeDto);
	
}
