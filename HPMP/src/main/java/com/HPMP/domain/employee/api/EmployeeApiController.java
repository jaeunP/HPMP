package com.HPMP.domain.employee.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
public class EmployeeApiController {

	private final EmployeeService employeeService;

	@GetMapping("/employeeList")
	public List<EmployeeDto> employeeList() {
		return employeeService.getEmployeeList();
	}

	@PostMapping("/employee")
	public ResponseEntity<String> insertEmployee(@RequestBody EmployeeDto employeeDto) {
		employeeService.insertEmployee(employeeDto);

		return ResponseEntity.status(HttpStatus.OK).body("데이터 생성 성공");
	}
	
	@PatchMapping("/employee/{employeeNo}")
	public ResponseEntity<String> deleteEmployeeAtView(@PathVariable("employeeNo") String employeeNo){
		
		int delCnt = employeeService.deleteEmployeeAtView(employeeNo);
		
		if(delCnt != 0) return ResponseEntity.status(HttpStatus.OK).body(delCnt +"개의 데이터를 삭제했습니다.");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제된 데이터가 없습니다");
		
		
		
		
	}
}
