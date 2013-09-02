<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>설정관리</span><span> > </span><span>설정정보관리</span><span> > </span><strong>성과단위 상품</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">성과단위 상품</h1>
		<section class="section_box">
			<!-- 공용 옵션박스 -->
			<div class="option_t_box option_t_box_b virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">고객명</label>
					<div class="sel_ty3" id="selectCustCd">
					</div>
					<div class="ipt_ty1 ml_2">
						<input id="inputCustNm" name="" type="text" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">유형분류</label>
					<div class="sel_ty1" id="selectPeerCd">
					</div>
					<div class="ipt_ty1 ml_2">
						<input id="inputPeerNm" name="" type="text" />
					</div>
				</div>
				<p class="btn_group virt_clr">
					<a id="btn_read" href="javascript:;" class="btn_view">조회</a>
					<a id="btn_delete" href="javascript:;" class="btn_del">삭제</a>
				</p>
			</div>
			<div class="head_box virt_clr">
				<h2>유형내 펀드 목록</h2>
			</div>
			<div class="gridgroup5">
	        	<div id="fundInPeerGrid"></div>
	    	</div>
		</section>
		<section class="section_box">
			<div class="head_box virt_clr">
				<h2>유형외 펀드 목록</h2>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="option_t_box option_t_box_b virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">최초설정일</label>
					<div class="cad_ty1">
						<input id="fst_std_dt" name="" type="text" maxlength="10" class="int_ty1 fncalendar" />
						<a href="" data-id="fst_std_dt" class="btn_calopen">달력</a>
					</div>
				</div>
				<p class="btn_group virt_clr">
					<a id="btn_save" href="javascript:;" class="btn_join">등록</a>
				</p>
			</div>
			<div class="gridgroup5">
	        	<div id="fundOutPeerGrid"></div>
	    	</div>
		</section>
	</section>
</div>