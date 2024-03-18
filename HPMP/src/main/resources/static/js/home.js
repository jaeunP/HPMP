//신규 버튼 클릭시 열 생성
$(function() {
	$('#insert-btn').click(function(){
		$('#insert-row').show();

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
/*$(function(){
	$('#search-btn').click(function (){
		let entrDt = $('#search-entr-dt').val();
		let entrDtFormat = entrDt.replace(/\-/g,'');
		
		let employee = {
			employeeNo: $('#search-employee-no').val(),
			employeeNm: $('#search-employee-nm').val(),
			hpNo: $('#"search-hp-no"').val(),
			entrDt: entrDtFormat,
			wrkTypCd: $('#search-wrk-typ-cd').val(),
			delYn: $('search-del-yn').val()
			};
			$.ajax({
				type: "POST",
				url: "/api/searchResult",
				data: JSON.stringify(employee),
				contentType: "application/json",
				success: function (){
					alert("검색완료");
				location.href="/";
			}
		})
	})
})*/



//직원 등록
$(function(){
	$('#save-btn').click(function (){
		let entrDt = $('#entr-dt').val();
		let entrDtFormat = entrDt.replace(/\-/g,'');
		
		let retrDt = $('#retr-dt').val();
		let retrDtFormat = retrDt.replace(/\-/g,'');
		
		let birthDt = $('#birth-dt').val();
		let birthDtFormat = birthDt.replace(/\-/g,'');
		
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
			birthDt: birthDtFormat,
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

//삭제 버튼 클릭 이벤트
$(function() {
	$('#delete-btn').click(function(){
		$('#save-btn').hide();
		$('#patch-save-btn').show();
		
		const employeeNoSet = new Set();
		
		$('#data-table tr').unbind("click").bind("click",function() {
			$(this).css("background-color", "#FF9090");
			
			var clickTdAll = $(this).text().split(" ");
			var clickEmployeeNo = clickTdAll[0];
			
			employeeNoSet.add(clickEmployeeNo);	
		})

		$('#patch-save-btn').click(function () {
			var employeeNoArr = Array.from(employeeNoSet);
			var employee = new Array();
			
			for(var i = 0; i<employeeNoArr.length; i++){
				var employeeObj = new Object();
				employeeObj.employeeNo = employeeNoArr[i];
				
				employee.push(employeeObj)
			}
			
			$.ajax({
				type: "PATCH",
				url: "/api/employees",
				data: JSON.stringify(employee),
				contentType: "application/json",
				success: function (){
					alert("사원이 삭제되었습니다.");
				location.href="/";
				}
			})
		})			
	})
})

$(document).on('keyup', '#employee-nm', function() {
    $(this).val($(this).val().replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ''));
});

$(document).on('keyup', '#hp-no', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});
$(document).on('keyup', '#rank-nm', function() {
    $(this).val($(this).val().replace(/[^ㄱ-ㅎ가-힣]/g, ''));
});
$(document).on('keyup', '#zip-no', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});


