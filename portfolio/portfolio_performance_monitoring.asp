<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 종합</span><span> > </span><strong>성과 모니터링</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">성과 모니터링</h1>
		<!-- 상단 -->
		<section class="section_box">
			<!-- 공용 옵션박스 -->
			<div class="p_b6">
				<div class="option_t3_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">기준일자</label>
						<div class="cad_ty1">
							<input id="trd_dt" name="" type="text" maxlength="10" class="int_ty1 calendar" />
							<a href="" data-id="trd_dt" class="btn_calopen">달력</a>
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">단위</label>
						<div class="txt_ty1">( %, 원)</div>
					</div>
					<p class="btn_group virt_clr">
						<a id="btn_read" href="" class="btn_view">조회</a>
					</p>
				</div>
			</div>
			<div class="gridgroup5">
	        	<div id="fundGrid"></div>
	    	</div>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>성과기준 조회</h2>
				<p class="btn_group virt_clr"><!--<a class="btn_save" href="##">저장</a>--><a class="btn_del" href="##">삭제</a></p>
			</div>

			<div class="gridgroup5">
	        	<div id="dataGrid"></div>
	    	</div>
<!--
			<div class="scwrap h_ty2">
				<table class="table_ty1 permo-2">
						<caption class='hidden'>기준조회 및 저장</caption>
						<colgroup>
							<col class="col1">
							<col class="col2">
							<col class="col3">
							<col class="col4">
							<col class="col5">
							<col class="col6">
						</colgroup>
						<thead>
							<tr>
								<th>선택</th>
								<th>펀드코드</th>
								<th>펀드유형</th>
								<th>일수익률(절대값)</th>
								<th>BM초과(절대값)</th>
								<th>유형초과(절대값)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="anc"></td>
								<td class="anc"></td>
								<td class="anc"></td>
								<td class="anc"><input type="text" id="d_rd_abs" class="ipt_tdty"></td>
								<td class="anc"><input type="text" id="bm_rd_abs" class="ipt_tdty"></td>
								<td class="anc"><input type="text" id="peer_rd_abs" class="ipt_tdty"></td>
							</tr>
						</tbody>
				</table>

				<div class="gridgroup5">
		        	<div id="dataGrid"></div>
		    	</div>
		    </div>
-->
		</section>


		<section class="section_box">
		    <!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>성과기준 관리</h2>
				<p class="btn_group virt_clr"><a id="btn_clearForNew" href="javascript:;" class="btn_new">신규</a><a id="btn_save" href="javascript:;" class="btn_save">저장</a></p>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="option_b_box virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">*펀드유형</label>
					<div class="sel_ty1" id="selectPeerCd">
						<!--<select name="selectPeerCdOpt" id="selectPeerCdOpt" class="sel_tdty"></select>-->
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*일수익률</label>
					<div class="ipt_ty1">
						<input id="d_rd_abs" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*BM초과</label>
					<div class="ipt_ty1">
						<input id="bm_rd_abs" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*유형초과</label>
					<div class="ipt_ty1">
						<input id="peer_rd_abs" name="" type="text" class="int_ty1" />
					</div>
				</div>
			</div>
			<ul id="cmt" class="tip_box">
				<li>모든 값은 절대값으로 입력하셔야 합니다.</li>
				<li>(*)가 표시되어있는 항목은 필수 항목입니다.</li>
			</ul>
		</section>

	</section>
</div>