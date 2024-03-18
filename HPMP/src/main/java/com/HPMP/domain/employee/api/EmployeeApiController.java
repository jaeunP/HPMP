package com.HPMP.domain.employee.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HPMP.domain.employee.EmployeeDto;
import com.HPMP.domain.employee.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmployeeApiController {

	private final EmployeeService employeeService;

	@GetMapping("/employeeList")
	public List<EmployeeDto> employeeList() {
		return employeeService.getEmployeeList();
	}
	
	@GetMapping("/searchResult")
	public List<EmployeeDto> searchEmployee(@RequestBody EmployeeDto employeeDto) {
		return employeeService.searchEmployee(employeeDto);
	}

	@PostMapping("/employee")
	public ResponseEntity<String> insertEmployee(@RequestBody @Valid EmployeeDto employeeDto) {
		employeeService.insertEmployee(employeeDto);

		return ResponseEntity.status(HttpStatus.OK).body("데이터 생성 성공");
	}
	
	@PatchMapping("/employees")
	public ResponseEntity<String> deleteEmployeeAtView(@RequestBody List<EmployeeDto> employeeNo){
		
		int delCnt = employeeService.deleteEmployeeAtView(employeeNo);
		
		if(delCnt != 0) return ResponseEntity.status(HttpStatus.OK).body(delCnt +"개의 데이터를 삭제했습니다.");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제된 데이터가 없습니다");
	}
}
