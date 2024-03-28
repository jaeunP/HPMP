//직원 목록 전체 조회
/*$(function() {
	let employeeList = new Vue({
		el : "#employee-list",
		data : {
			employee : {}
		}
	})
	
	let pageNo = 0;
	$.ajax({
		type : "GET",
		url : "api/employeeList?page=" + pageNo,
		success : function(response) {
			console.log(response.totalElements)
			console.log(response.totalPages);			
			employeeList.employee = response.content;
		}
	})
})
*/
	
	let dataList;
	
$(function() {
	let employeeList = new Vue({
		el : "#employee-list",
		data : {
		employee : {}
		}
	});
	
	let totalData;
	let dataPerPages;
	let globalCurrentPage;
	let pageCount = 10;
	
	console.log(JSON.stringify(employeeList.employee));
	
	$('#pagingul').click(function(){
		setTimeout(function(){
			console.log("클릭 이벤트 실행")
		employeeList.employee = dataList;
		}, 80)
		
	})
	
	
	if(dataList == undefined){		
		$.ajax({
			type : "GET",
			url : "api/employeeList?page=0",
			success : function(response) {
				totalData = response.totalElements;
				totalpages = response.totalPages;
				dataPerPages = response.size;
				dataList = response.content;
				console.log(totalData);
				console.log(totalpages);	
				console.log(dataPerPages);	
				console.log("dataList***:" + JSON.stringify(dataList));
				employeeList.employee = dataList;
				
				
				paging(totalData, 1, pageCount, 1, employeeList.employee);
			}
		})
	}	
})

function getList(selectedPage, employeeList) {
	let page =selectedPage-1
	vue = employeeList.employee;
	$.ajax({
		type : "GET",
		url : "api/employeeList?page=" + page,
		success : function(response) {
			totalData = response.totalElements;
			totalpages = response.totalPages;
			dataPerPages = response.size;
			dataList = response.content;
			vue = dataList;
			console.log("getList - dataList:" + JSON.stringify(dataList));
			
		}
	})
}



/*function paging(totalData, dataPerPage, pageCount, currentPage) {
	
  console.log("currentPage : " + currentPage);

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
    pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
  }

 //페이징 번호 표시 
  for (var i = first; i <= last; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
    } else {
      pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
    }
  }

  if (last < totalPage) {
    pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
  }
  $("#pagingul").html(pageHtml);

  //페이징 번호 클릭 이벤트 
  $("#pagingul li a").click(function () {
    let $id = $(this).attr("id");
    selectedPage = $(this).text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    
    //전역변수에 선택한 페이지 번호를 담는다...
    globalCurrentPage = selectedPage-1;
    //페이징 표시 재호출
    paging(totalData, dataPerPage, pageCount, selectedPage);
    //글 목록 표시 재호출
    displayData(selectedPage, dataPerPage);
    getList(globalCurrentPage);
  });
}*/
function paging(totalData, dataPerPage, pageCount, currentPage, employeeList) {
	
  console.log("currentPage : " + currentPage);

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
    pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
  }

 //페이징 번호 표시 
  for (var i = first; i <= last; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' class='page' id='" + i + "'>" + i + "</a></li>";
    } else {
      pageHtml += "<li><a href='#' class='page' id='" + i + "'>" + i + "</a></li>";
    }
  }

  if (last < totalPage) {
    pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
  }
  $("#pagingul").html(pageHtml);

  //페이징 번호 클릭 이벤트 
  $("#pagingul li a").click(function () {
    let $id = $(this).attr("id");
    selectedPage = $(this).text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    
    
	
    //페이징 표시 재호출
    paging(totalData, dataPerPage, pageCount, selectedPage, employeeList);
    
    getList(selectedPage, employeeList);
  });
}

//직원 검색
$(function(){
	let searchEmployeeLists = new Vue({
		el : "#SearchEmployees",
		data : {
			SearchEmployeeList : {}
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
		
		let Searchemployee = {
			employeeNo: $('#search-employee-no').val(),
			employeeNm: $('#search-employee-nm').val(),
			hpNo: hpNo,
			entrDt: entrDt,
			wrkTypCd: wrkTypCd,
			delYn: $('#search-del-yn').val()
			};	
			$.ajax({
				type: "POST",
				url: "api/searchResult",
				data: JSON.stringify(Searchemployee),
				contentType: "application/json",
				success : function(response) {
					$('#data-table').hide();
					$('#search-table').show();
					searchEmployeeLists.SearchEmployeeList = response;
					alert("검색되었습니다.");
			}
		})
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
			
			if($.validationData(employee) == false){
				console.log
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
		
		$('#data-table tr').unbind("click").bind("click",function() {
			$(this).addClass("delete-click");
			
			var clickTdAll = $(this).text().split(" ");
			var clickEmployeeNo = clickTdAll[0];
			
			if(employeeNoSet.has(clickEmployeeNo)){
				employeeNoSet.delete(clickEmployeeNo);
				$(this).removeClass("delete-click");
			} else{
				employeeNoSet.add(clickEmployeeNo);	
			}			
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

$.validationData =(function(employee) {
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
})

//신규 버튼 클릭시 열 생성
$(function() {
	$('#insert-btn').click(function(){
		$('.insert-row').show();
	})	
})

//input 문자열 입력 제한
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

$(document).on('keyup', '#search-hp-no', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});