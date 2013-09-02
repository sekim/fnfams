<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>설정관리</span><span> > </span><span>설정정보관리</span><span> > </span><strong>벤치마크 등록</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>

	<section class="section_pg">
		<h1 class="pg_title">벤치마크 등록</h1>
		<!-- 상단 -->
		<section class="section_box">
			<!-- 공용 옵션박스 -->
			<div class="option_t_box virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">고객명</label>
					<div class="sel_ty3" id="selectCustCd">
					</div>
					<div class="ipt_ty1 ml_2">
						<input id="inputCustNm" name="" type="text" />
					</div>
				</div>
				<p class="btn_group virt_clr">
					<a id="btn_delete" href="javascript:;" class="btn_del">삭제</a>
				</p>
			</div>
			<div class="gridgroup5">
				<div id="BMGrid"></div>
			</div>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>벤치마크 등록</h2>
				<p class="btn_group virt_clr">
					<a id="btn_clearForNew" href="javascript:;" class="btn_new">신규</a>
					<a id="btn_save" href="javascript:;" class="btn_save">저장</a>
				</p>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="p_b6">
				<div class="option_b_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">*벤치마크코드</label>
						<div class="ipt_ty1">
							<input id="bm_cd" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*벤치마크명</label>
						<div class="ipt_ty2">
							<input id="bm_nm" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">사용여부</label>
						<div class="sel_ty1" id="use_yn">
						</div>
					</div>
				</div>
			</div>
			<div class="scwrap h_ty1">
				<table class="table_ty1 s2-5-5">
					<caption class='hidden'>벤치마크 등록</caption>
					<colgroup>
						<col class="col1">
						<col class="col2">
						<col class="col3">
						<col class="col4">
					</colgroup>
					<thead>
						<tr>
							<th class="clf">순번</th>
							<th>최초일자</th>
							<th>최종일자</th>
							<th class="cle">시장지수코드</th>
						</tr>
					</thead>
					<tbody>
						<tr class="rwf rwe">
							<td class="clf anc"></td>
							<td class="anc">
								<div class="cad_ty2">
									<div class="input_wrap">
										<input id="fr_dt" type="text" maxlength="10" class="int_ty3 calendar" />
									</div>
									<a href="javascript:;" data-id="fr_dt" class="btn_calopen">달력</a>
								</div>
							</td>
							<td class="anc"></td>
							<td class="cle anc"><input id="mkt_idx_cd" type="text" class="int_ty2" /></td>
						</tr>
					</tbody>
				</table>
				<div class="gridgroup5">
					<div id="BMHistEmptyGrid">
						<table class="table_ty1 s2-5-6">
							<caption class='hidden'>벤치마크 등록</caption>
							<colgroup>
								<col class="col1">
								<col class="col2">
								<col class="col3">
								<col class="col4">
							</colgroup>
							<tbody>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr class="rwe">
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
							</tbody>
						</table>
						<div class="fmspage">
						<a href="" class="btn_exdown2">엑셀다운로드</a>
						<div class="fmspage_wrap">
							<a href="" class="btn_pgprev2">처음페이지</a>
							<a href="" class="btn_pgprev">이전페이지</a>
							<a href="" class="btn_pgtxt txt_active">1</a>
							<a href="" class="btn_pgnext">다음페이지</a>
							<a href="" class="btn_pgnext2">마지막페이지</a>
						</div>
						<div class="pggd">
							<strong>1</strong>/<span>1</span>
						</div>
					</div>
					</div>
					<div id="BMHistGrid">
					</div>
	            </div>
			</div>
		</section>
	</section>
</div>
<script>
$(function(){
	fng.util.loadScript('/scripts/setting_02-03.js');
});
</script>