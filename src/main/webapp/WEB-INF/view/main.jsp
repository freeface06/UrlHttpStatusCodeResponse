<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도메인 현행화</title>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>

<link rel="stylesheet" type="text/css" href="./css/main.css" />
<link rel="stylesheet" type="text/css" href="./css/button.css" />

<!-- Sheet JS -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
<!--FileSaver savaAs 이용 -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.js"></script>

<link href="https://cdn.jsdelivr.net/npm/spin.js@latest/spin.css"
	rel="stylesheet">

</head>
<body>
	<section>
		<div class="btn_container">
			<div class="button-4">
				<div class="eff-4"></div>
				<a href="/domain/download/sample.xlsx"> 샘플다운 </a>
			</div>
			<div class="button-4">
				<div class="eff-4"></div>
				<a href="javascript:mod_open();"> 엑셀등록 </a>
			</div>
			<div class="button-4">
				<div class="eff-4"></div>
				<a href="#" id="excelDownload"> 내려받기 </a>
			</div>
			<div class="button-4">
				<div class="eff-4"></div>
				<a href="javascript:clear();"> 초기화 </a>
			</div>
		</div>

		<div class="table_container">
			<div class="table-responsive">
				<table class="table" id="main_table">
					<thead>
						<tr>
							<th scope="col" style="width: 10%;">번호</th>
							<th scope="col" style="width: 35%;">HTTP</th>
							<th scope="col" style="width: 5%;">확인</th>
							<th scope="col" style="width: 5%;">코드</th>
							<th scope="col" style="width: 35%;">HTTPS</th>
							<th scope="col" style="width: 5%;">확인</th>
							<th scope="col" style="width: 5%;">코드</th>
						</tr>
					</thead>
					<tbody id="tbody">
					</tbody>
				</table>
			</div>
		</div>

	</section>

	<!-- The Modal -->
	<div class="modal fade" id="modal" data-bs-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal body -->
				<div class="modal-body">
					<div class="filebox">
						<input class="upload-name" placeholder="첨부파일" disabled="disabled"
							id="file_input"> <label for="file">파일찾기</label> <input
							type="file" id="file">
					</div>

				</div>

				<div class="modal-footer">

					<div class="button-4">
						<div class="eff-4"></div>
						<a href="javascript:go();"> 등록 </a>
					</div>

					<div class="button-4">
						<div class="eff-4"></div>
						<a href="javascript:mod_close();"> 닫기 </a>
					</div>
				</div>

			</div>
		</div>
	</div>

	<script src="./js/main.js"></script>
	<script src="./js/spinner.js"></script>
</body>
</html>