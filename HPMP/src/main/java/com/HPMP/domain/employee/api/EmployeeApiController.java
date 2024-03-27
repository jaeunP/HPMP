package com.HPMP.domain.employee.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

//	@GetMapping("/employeeList")
//	public ResponseEntity<List<EmployeeDto>> employeeList() {
//		List<EmployeeDto> employeeList = employeeService.getEmployeeList();
//		
//		return ResponseEntity.ok(employeeList);
//	}
	
	@GetMapping("/employeeList")
	public ResponseEntity<?> employeeList(@PageableDefault(size = 10) Pageable pageable) {
		
		return ResponseEntity.ok(employeeService.getEmployeeList(pageable));
	}
	
	@PostMapping("/searchResult")
	public ResponseEntity<List<EmployeeDto>>  searchEmployee(@RequestBody EmployeeDto employeeDto) {
		List<EmployeeDto> searchEmployeeList = employeeService.searchEmployee(employeeDto);
		
		if (searchEmployeeList.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			return ResponseEntity.ok(searchEmployeeList);
	}

	@PostMapping("/employee")
	public ResponseEntity<String> insertEmployee(@RequestBody @Valid EmployeeDto employeeDto) {
		employeeService.insertEmployee(employeeDto);

		return ResponseEntity.ok("데이터 생성 성공");
	}
	
	@PatchMapping("/employees")
	public ResponseEntity<String> deleteEmployeeAtView(@RequestBody List<EmployeeDto> employeeNo){
		int delCnt = employeeService.deleteEmployeeAtView(employeeNo);
		
		if(delCnt != 0) return ResponseEntity.status(HttpStatus.OK).body(delCnt +"개의 데이터를 삭제했습니다.");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제된 데이터가 없습니다");
	}
	
	@GetMapping("/count")
	public int countList() {
		return employeeService.countList();
	}
}
