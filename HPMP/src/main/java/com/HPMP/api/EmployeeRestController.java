package com.HPMP.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HPMP.domain.employee.EmployeeDto;
import com.HPMP.domain.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class EmployeeRestController {

	private final EmployeeService employeeService;

	@GetMapping("/employeeList")
	public List<EmployeeDto> employeeList() {
		return employeeService.getEmployeeList();
	}

	@PostMapping("/employee")
	public ResponseEntity<String> insertEmployee(@RequestBody EmployeeDto employeeDto) {
		employeeService.insertEmployee(employeeDto);

		return new ResponseEntity<String>("INSERT SUCCESS", HttpStatus.OK);
	}
}
