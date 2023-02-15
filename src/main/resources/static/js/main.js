const excelDownload = document.querySelector('#excelDownload');

const modal = new bootstrap.Modal(document.getElementById('modal'));

let cnt = 1;

document.addEventListener('DOMContentLoaded', () => {
	excelDownload.addEventListener('click', exportExcel);
});

$("#file").on('change', function() {
	var fileName = $("#file").val();
	$(".upload-name").val(fileName);
});

function go() {
	var _promise = function() {
		return new Promise(function() {
			spinnerStart();

			window.setTimeout(function() {
				readExcel();
			}, 500);
		});
	}
	_promise();
}

function readExcel() {
	let input = document.getElementById("file")
	let reader = new FileReader();
	reader.onload = function() {
		let data = reader.result;
		let workBook = XLSX.read(data, { type: 'binary' });

		workBook.SheetNames.forEach(function(sheetName) {
			let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);

			let http_check;
			let http_code;
			let https_check;
			let https_code;

			for (let i = 0; i < rows.length; i++) {
				$.ajax({
					type: "GET",
					dataType: "json",
					contentType: "application/json; charset=UTF-8;",
					data: { domain: rows[i].HTTP },
					async: false,
					url: `/domain/check_domain`,
					success: function(result) {
						http_code = result;
						if (result != 0) {
							http_check = "O";
						} else {
							http_check = "X";
						}
					}
				});

				$.ajax({
					type: "GET",
					dataType: "json",
					contentType: "application/json; charset=UTF-8;",
					data: { domain: rows[i].HTTPS },
					async: false,
					url: `/domain/check_domain`,
					success: function(result) {
						https_code = result;
						if (result != 0) {
							https_check = "O";
						} else {
							https_check = "X";
						}
					}
				});
				let item = `<tr>
							<td class="noBorder">${cnt}</td>
							<td class="noBorder"><a href="${rows[i].HTTP}">${rows[i].HTTP}</a></td>
							<td class="noBorder">${http_check}</td>
							<td class="noBorder">${http_code}</td>
							<td class="noBorder"><a href="${rows[i].HTTPS}">${rows[i].HTTPS}</a></td>
							<td class="noBorder">${https_check}</td>
							<td class="noBorder">${https_code}</td>
						</tr>`;
				$("#tbody").append(item);
				cnt++;
			}
			spinnerStop();
			mod_close();
		})
	};
	reader.readAsBinaryString(input.files[0]);
}

function mod_open() {
	modal.show();
}

function mod_close() {
	//$(".upload-name").val('');
	//$("#file_input").val('');
	modal.hide();
}

function clear() {
	cnt = 1;
	$("#tbody").html('');
}

function exportExcel() {
	// step 1. workbook 생성
	var wb = XLSX.utils.book_new();

	// step 2. 시트 만들기 
	var newWorksheet = excelHandler.getWorksheet();

	// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
	XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

	// step 4. 엑셀 파일 만들기 
	var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	// step 5. 엑셀 파일 내보내기 
	saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());
}

var excelHandler = {
	getExcelFileName: function() {
		return "도메인 현행화.xlsx";	//파일명
	},
	getSheetName: function() {
		return 'Sheet1';	//시트명
	},
	getExcelData: function() {
		return document.getElementById('main_table'); 	//TABLE id
	},
	getWorksheet: function() {
		return XLSX.utils.table_to_sheet(this.getExcelData());
	}
}

function s2ab(s) {
	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	var view = new Uint8Array(buf);  //create uint8array as viewer
	for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	return buf;
}