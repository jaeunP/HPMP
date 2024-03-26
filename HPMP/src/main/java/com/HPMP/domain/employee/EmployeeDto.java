package com.HPMP.domain.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
	
	/** 직원번호 */
	private String employeeNo;
	
	/** 직원이름 */
	@NotBlank(message = "직원이름이 존재하지 않습니다.")
	@Pattern(regexp = "^[ㄱ-ㅎ가-힣a-zA-Z]*$", message = "한글, 영문만 입력 가능합니다.")
	private String employeeNm;
	
	/** 직원휴대폰번호 */
	@Pattern(regexp = "^[\\d]*$", message = "숫자(0~9)만 입력 가능합니다.")
	private String hpNo;
	
	/** 이메일 */
	private String email;
	
	/** 입사일자 */
	@NotBlank(message = "입사일자가 존재하지 않습니다.")
	private String entrDt;
	
	/** 퇴사일자 */
	private String retrDt;
	
	/** 근무형태코드 */
	private String wrkTypCd;
	
	/** 삭제여부*/
	private String delYn;
	
	/** 기본주소 */
	private String baseAdr;
	
	/** 상세주소 */
	private String dtlAdr;
	
	/** 우편번호 */
	@Pattern(regexp = "^[\\d]*$", message = "숫자(0~9)만 입력 가능합니다.")
	private String zipNo;
	
	/** 생년월일 */
	private String birthDt;
	
	/** 직급이름 */
	@NotBlank(message = "직급이름이 존재하지 않습니다.")
	private String rankNm;
	
	/** 직책이름 */
	private String pstnNm;
	
	/** 등록자 */
	@NotBlank(message = "등록자가 존재하지 않습니다.")
	private String regId;
	
	/** 등록일시*/
	private String regDtm;
	
	/** 수정자 */
	@NotBlank(message = "수정자가 존재하지 않습니다.")
	private String modId;
	
	/** 수정일시 */
	private String modDtm;
}
