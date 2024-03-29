let dataList;			//데이터 리스트
let totalData;			//총 데이터의 갯수
let dataPerPage;		//한 페이지에 나타낼 데이터 수

let searchDataList;		//검색데이터 리스트
let totalSearchData;	//총 검색데이터의 갯수
let searchDataPerPage;	//한 페이지에 나타낼 검색데이터 수

let selectedPage;		//현재 페이지 넘버

//전체 직원 조회	
$(function() {
	let employeeList = new Vue({
		el : "#employee-list",
		data : {
		employee : {}
			}
		});
		
	$('#pagingul').click(function(){
		getList(selectedPage);
		employeeList.employee = dataList;
	})
	
	selectedPage = 1;
	getList(selectedPage);
	if(dataList != null){
		employeeList.employee = dataList;		
		paging(totalData, dataPerPage, 10, 1);
	}
})

//직원 검색
$(function(){
	let searchEmployeeList = new Vue({
		el : "#searchEmployee",
		data : {
			searchEmployee : {}
			}
		})	
		
	$('#search-btn').click(function (){	
		let entrDt = $('#search-entr-dt').val().replace(/\-/g,'');
		
		let hpNo = $('#search-hp-no').val();
		let wrkTypCd = $('#search-wrk-typ-cd').val();
		
		if(hpNo == ''){
			hpNo = null;
		}		
		if(wrkTypCd == ''){
			wrkTypCd = null;
		}
		
		let searchemployee = {
			employeeNo: $('#search-employee-no').val(),
			employeeNm: $('#search-employee-nm').val(),
			hpNo: hpNo,
			entrDt: entrDt,
			wrkTypCd: wrkTypCd,
			delYn: $('#search-del-yn').val()
			};
			
		$('#pagingul').click(function(){
			getSearchList(selectedPage, searchemployee);
			searchEmployeeList.searchEmployee = searchDataList;
		})
		
		selectedPage = 1;
		getSearchList(selectedPage, searchemployee);
		
		if(searchDataList == null){
			alert("검색결과가 없습니다.");
			return 0;
		}
			
		searchEmployeeList.searchEmployee = searchDataList;
		paging(totalSearchData, searchDataPerPage, 10, 1);
		alert("검색되었습니다.");					
	})
})

//직원 등록
$(function(){
	$('#save-btn').click(function (){
		let entrDt = $('#entr-dt').val().replace(/\-/g,'');		
		let retrDt = $('#retr-dt').val().replace(/\-/g,'');
		let birthDt = $('#birth-dt').val().replace(/\-/g,'');
			
		let employee = {
			employeeNm: $('#employee-nm').val(),
			hpNo: $('#hp-no').val(),
			email: $('#email').val(),
			entrDt: entrDt,
			rankNm: $('#rank-nm').val(),
			pstnNm: $('#pstn-nm').val(),
			wrkTypCd: $('#wrk-typ-cd').val(),
			retrDt: retrDt,
			baseAdr: $('#base-adr').val(),
			dtlAdr: $('#dtl-adr').val(),
			zipNo: $('#zip-no').val(),
			birthDt: birthDt,
			regId: $('#reg-id').val(),
			modId: $('#mod-id').val()
			};
			
		if(validationData(employee) == false){
			return 0;
		}
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

//직원 삭제
$(function() {
	$('#delete-btn').click(function(){
		$('#save-btn').hide();
		$('#patch-save-btn').show();
		$('.dynamic-table td').css("cursor","pointer");
		
		const employeeNoSet = new Set();
		
		$('.dynamic-table tr').unbind("click").bind("click",function() {
			$(this).addClass("delete-click");
			
			let clickTdAll = $(this).text().split(" ");
			let clickEmployeeNo = clickTdAll[0];
			
			if(employeeNoSet.has(clickEmployeeNo)){
				employeeNoSet.delete(clickEmployeeNo);
				$(this).removeClass("delete-click");
			} else {
				employeeNoSet.add(clickEmployeeNo);	
			}			
		})
		
		$('#patch-save-btn').click(function () {
			let employeeNoArr = Array.from(employeeNoSet);
			let employee = new Array();
			
			for(var i = 0; i<employeeNoArr.length; i++){
				let employeeObj = new Object();
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

//전체 리스트 반환
function getList(selectedPage) {
	let page = selectedPage-1
	
	$.ajax({
		type : "GET",
		url : "api/employeeList?page=" + page,
		async: false,
		success : function(response) {
			if(response == null){
				dataList = null;
			} else {
				totalData = response.totalElements;
				dataPerPage = response.size;
				dataList = response.content;
			}	
		}
	})		
}

//검색 결과 반환
function getSearchList(selectedPage, searchEmployee) {
	let page = selectedPage-1
	
	$.ajax({
		type: "POST",
		url: "api/searchResult?page=" + page,
		data: JSON.stringify(searchEmployee),
		async: false,
		contentType: "application/json",
		success : function(response) {
			
			if(response == null){
				searchDataList = null;
			} else {
				$('#data-table').hide();
				$('#search-table').show();
				totalSearchData = response.totalElements;
				searchDataPerPage = response.size;
				searchDataList = response.content;
			}
		}
	});
}

//데이터 등록 시 검증
function validationData(employee) {
	let values = Object.values(employee);
	let valid = false;
	
	switch("") {
		case values[0]:
			alert("이름은 필수 값이 입니다.");
			break;
		case values[2]:
			alert("이메일은 필수 값이 입니다.");
			break;
		case values[3]:
			alert("입사일자는 필수 값이 입니다.");
			break;
		case values[4]:
			alert("직급은 필수 값이 입니다.");
			break;
		case values[12]:
			alert("등록자는 필수 값이 입니다.");
			break;
		case values[13]:
			alert("수정자는 필수 값이 입니다.");
			break;	
		default:
			valid = true;
	}
	return valid;
}

function paging(totalData, dataPerPage, pageCount, currentPage) {
	totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 수
  
	if(totalPage<pageCount){
		pageCount=totalPage;
	}
 
	let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
	let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
  
	if (last > totalPage) {
		last = totalPage;
	}

	let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
	let next = last + 1;
	let prev = first - 1;

	let pageHtml = "";

	if (prev > 0) {
		pageHtml += "<li><a href='javascript:;' id='prev'> 이전 </a></li>";
	}

//페이징 번호 표시 
	for (var i = first; i <= last; i++) {
		if (currentPage == i) {
			pageHtml += "<li class='on'><a href='javascript:;' id='" + i + "'>" + i + "</a></li>";
		} else {
			pageHtml += "<li><a href='javascript:;' id='" + i + "'>" + i + "</a></li>";
		}
	}

	if (last < totalPage) {
		pageHtml += "<li><a href='javascript:;' id='next'> 다음 </a></li>";
	
	}
	$("#pagingul").html(pageHtml);

//페이징 번호 클릭 이벤트 
	$("#pagingul li a").click(function () {
		let $id = $(this).attr("id");
		selectedPage = $(this).text();

	if ($id == "next") selectedPage = next;
	if ($id == "prev") selectedPage = prev;
 
//페이징 표시 재호출
	paging(totalData, dataPerPage, pageCount, selectedPage);
	});
}

//상시적용 함수
$(function() {
	$('#insert-btn').click(function(){
		$('.insert-row').show();
	})
	$('#employee-nm, #rank-nm, #search-employee-nm').keyup(function(){
		$(this).val($(this).val().replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ''));
	})
	$('#hp-no, #zip-no,#search-hp-no').keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
	})	
})