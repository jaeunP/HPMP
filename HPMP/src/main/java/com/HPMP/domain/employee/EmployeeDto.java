package com.HPMP.domain.employee;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {
	/** 직원번호 */
	private String employeeNo;
	
	/** 직원이름 */
	private String employeeNm;
	
	/** 직원휴대폰번호 */
	private String hpNo;
	
	/** 이메일 */
	private String email;
	
	/** 입사일자 */
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
	private String zipNo;
	
	/** 생년월일 */
	private String birthDt;
	
	/** 직급이름 */
	private String rankNm;
	
	/** 직책이름 */
	private String pstnNm;
	
	/** 등록자 */
	private String regId;
	
	/** 등록일시*/
	private String regDtm;
	
	/** 수정자 */
	private String modId;
	
	/** 수정일시 */
	private String modDtm;

	
}
