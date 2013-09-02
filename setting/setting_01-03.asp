<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>설정관리</span><span> > </span><span>등록관리</span><span> > </span><strong>자펀드 등록</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">자펀드 등록</h1>
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
			<div class="gridgroup5" class="scwrap h_ty2">
			  	<div id="PfundGrid"></div>
			</div>
			<div class="gridgroup5" class="scwrap h_ty2">
				<div id="CfundGridEmpty">
					<table class="table_ty1 s1-3-2">
						<colgroup>
							<col class="col1">
							<col class="col2">
							<col class="col3">
							<col class="col4">
							<col class="col5">
							<col class="col6">
							<col class="col7">
						</colgroup>
						<thead>
							<tr>
								<th class="clf anc">선택</a></th>
								<th class="anc">펀드코드</a></th>
								<th><a href="#aa" class="sorticon icon-chevron-de">펀드명</a></th>
								<th><a href="#aa" class="sorticon icon-chevron-de">펀드유형</a></th>
								<th><a href="#aa" class="sorticon icon-chevron-de">펀드설정일</a></th>
								<th><a href="#aa" class="sorticon icon-chevron-de">최초투자일</a></th>
								<th class="cle anc">운용사</a></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="clf anc"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="anl"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="cle anl"></td>
							</tr>
							<tr>
								<td class="clf anc"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="anl"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="cle anl"></td>
							</tr>
							<tr>
								<td class="clf anc"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="anl"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="cle anl"></td>
							</tr>
							<tr>
								<td class="clf anc"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="anl"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="cle anl"></td>
							</tr>
							<tr class="oddbg rwe">
								<td class="clf anc"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="anl"></td>
								<td class="anc"></td>
								<td class="anl"></td>
								<td class="cle anl"></td>
							</tr>
						</tbody>
					</table>
					<!-- 페이징 테이플 마크업 바로 밑에 위치 -->
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
                <div id="CfundGrid"></div>
            </div>
			<ul class="tip_box">
				<li>조회버튼을 클릭하면 해당 고객번호에 등록되어 있는 통합펀드가 조회됩니다.</li>
				<li>통합펀드의 구분자를 선택 후 삭제버튼을 클릭하면 해당 통합펀드의 정보가 삭제됩니다.</li>
			</ul>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>펀드 정보</h2>
				<p class="btn_group virt_clr"><a id="btn_clearForNew" href="javascript:;" class="btn_new">신규</a><a id="btn_save" href="javascript:;" class="btn_save">저장</a></p>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="p_b6">
				<div class="option_b_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">*펀드코드</label>
						<div class="ipt_ty1">
							<input id="fund_cd" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*펀드명(전체)</label>
						<div class="ipt_ty2">
							<input id="fund_nm" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">펀드명(약어)</label>
						<div class="ipt_ty1">
							<input id="fund_snm" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*설정기준가</label>
						<div class="ipt_ty1">
							<input id="qty_unit" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*설정좌수</label>
						<div class="ipt_ty1">
							<input id="fst_set_qty" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*설정금액</label>
						<div class="ipt_ty1">
							<input id="fst_set_amt" type="text" class="int_ty1" />
						</div>
					</div>				
					<div class="fbox fbox_ty1">
						<label for="">*투자풀구분</label>
						<div class="sel_ty1" id="invst_pool_gb">
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*최초투자일</label>
						<div class="cad_ty1">
							<input id="fst_trd_dt" name="" type="text" maxlength="10" class="int_ty1 calendar" />
							<a href="javascript:;" data-id="fst_trd_dt" class="btn_calopen">달력</a>
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">*펀드설정일</label>
						<div class="cad_ty1">
							<input id="set_dt" name="" type="text" maxlength="10" class="int_ty1 calendar" />
							<a href="javascript:;" data-id="set_dt" class="btn_calopen">달력</a>
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">판매사명</label>
						<div class="ipt_ty1">
							<input id="sell_co_nm" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1 f-lc">
						<label for="">기준투자비중</label>
						<div class="ipt_ty1">
							<input id="invst_std_rt" type="text" class="int_ty1" />
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">최소투자비중</label>
						<div class="ipt_ty1">
							<input id="invst_min_rt" type="text" class="int_ty1" />
						</div>
					</div>
					
					<div class="fbox fbox_ty1">
						<label for="">최대투자비중</label>
						<div class="ipt_ty1">
							<input id="invst_max_rt" type="text" class="int_ty1" />
						</div>
					</div>
				</div>
			</div>

			<div class="scwrap h_ty1">
				<table class="table_ty1 s1-3-3">
					<caption class='hidden'>펀드 히스토리</caption>
					<colgroup>
						<col class="col1">
						<col class="col2">
						<col class="col3">
						<col class="col4">
						<col class="col5">
						<col class="col6">
						<col class="col7">
					</colgroup>
					<thead>
						<tr>
							<th class="clf">순번</th>
							<th>최초일자</th>
							<th>최종일자</th>
							<th>운용사코드</th>
							<th>운용사명</th>
							<th>펀드유형코드</th>
							<th class="cle">BM코드</th>
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
							<td class="anc"><input id="co_cd" type="text" class="int_ty2" /></td>
							<td class="anc"><input id="co_nm" type="text" class="int_ty2" /></td>
							<td class="anc"><input id="peer_cd" type="text" class="int_ty2" /></td>
							<td class="cle anc"></td>
						</tr>
					</tbody>
				</table>
				<div class="gridgroup5">
					<div id="fundHistEmptyGrid">
						<table class="table_ty1 s1-2-3">
							<caption class='hidden'>펀드 히스토리</caption>
							<colgroup>
								<col class="col1">
								<col class="col2">
								<col class="col3">
								<col class="col4">
								<col class="col5">
								<col class="col6">
								<col class="col7">
							</colgroup>
							<tbody>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anl"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anl"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anl"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anl"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
								<tr>
									<td class="clf anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anc"></td>
									<td class="anl"></td>
									<td class="anc"></td>
									<td class="cle anc"></td>
								</tr>
							</tbody>
						</table>
						<div class="fmspage"><a href="javascript:;" class="btn_exdown2">엑셀다운로드</a><div class="fmspage_wrap"><a href="javascript:;" class="btn_pgprev2">처음페이지</a> <a href="javascript:;" class="btn_pgprev">이전페이지</a> <a href="javascript:;" class="btn_pgtxt txt_active">1</a> <a href="javascript:;" class="btn_pgnext">다음페이지</a> <a href="javascript:;" class="btn_pgnext2">마지막페이지</a></div><div class="pggd"><strong>1</strong>/<span>1</span></div></div>
					</div>
					<div id="fundHistGrid">
					</div>
	            </div>
			</div>

			<ul id="cmt" class="tip_box">
				<li>(*)가 표시되어있는 항목은 필수 항목입니다.</li>
			</ul>
		</section>
	</section>
</div>
<script>
$(function(){
	fng.util.loadScript('/scripts/setting_01-03.js');
});
</script>