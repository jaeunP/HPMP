package com.HPMP.domain.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.HPMP.domain.employee.EmployeeDao;

@Mapper
public interface EmployeeMapper {
	
	public List<EmployeeDao> getEmployeeList();
	
	public void insertEmployee(EmployeeDao employeeDto);
	
}
