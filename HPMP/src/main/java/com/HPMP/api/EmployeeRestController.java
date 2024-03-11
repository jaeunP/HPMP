package com.HPMP.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HPMP.domain.employee.EmployeeDto;
import com.HPMP.domain.employee.mapper.EmployeeMapper;
import com.HPMP.domain.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmployeeRestController {
	
	private final EmployeeService employeeService;
	
	@GetMapping("/employeeList")
	public List<EmployeeDto> employeeList(){
		return employeeService.getEmployeeList();
	}
	
}

