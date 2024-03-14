//신규 버튼 클릭 시 테이블 노출
$(function() {
	$('#insert-btn').click(function(){
		$('#insert-row').show();

	})	
})

$(function() {
	$('#data-table tr').click(function() {
		var clickTdAll = $(this).text().split(" ");
		const clickEmployeeNo = clickTdAll[0]
			
		console.log("클릭한 Row의 td 값 배열:" + clickTdAll);
			
		console.log("클릭한 Row의 EmployyeNo :" + clickEmployeeNo);
		})
})

//삭제 버튼 클릭 시 열 추가
$(function() {
	$('#delete-btn').click(function(){
		$('#data-table tr').click(function() {
			var clickTdAll = $(this).text().split(" ");
			const clickEmployeeNo = clickTdAll[0]
			
			console.log("클릭한 Row의 td 값 배열:" + clickTdAll);
			
			console.log("클릭한 Row의 EmployyeNo :" + clickEmployeeNo);
		})
	})
})

//직원 목록 전체 조회
$(function() {
	let employeeLists = new Vue({
		el : "#employees",
		data : {
			employeeList : {}
		}
	})
	$.ajax({
		type : "GET",
		url : "api/employeeList",
		success : function(response) {
			console.dir(response);
			employeeLists.employeeList = response;
		}
	})
})

//직원 등록
$(function(){
	$('#save-btn').click(function (){
		let entrDt = $('#entr-dt').val();
		console.log('entrDt: ', entrDt);
		let entrDtFormat = entrDt.replace(/\-/g,'');
		console.log('entrDtFormat :', entrDtFormat);
		
		let retrDt = $('#retr-dt').val();
		let retrDtFormat = retrDt.replace(/\-/g,'');
		
		let employee = {
			employeeNm: $('#employee-nm').val(),
			hpNo: $('#hp-no').val(),
			email: $('#email').val(),
			entrDt: entrDtFormat,
			retrDt: retrDtFormat,
			wrkTypCd: $('#wrk-typ-cd').val(),
			baseAdr: $('#base-adr').val(),
			dtlAdr: $('#dtl-adr').val(),
			zipNo: $('#zip-no').val(),
			birthDt: $('#birth-dt').val(),
			rankNm: $('#rank-nm').val(),
			pstnNm: $('#pstn-nm').val(),
			regId: $('#reg-id').val(),
			modId: $('#mod-id').val()
			};
			$.ajax({
				type: "POST",
				url: "/api/employee",
				data: JSON.stringify(employee),
				contentType: "application/json",
				success: function (){
					alert("사원이 추가되었습니다.");
				location.href="/";
			}
		})
	})
})