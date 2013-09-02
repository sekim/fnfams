<div class="wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 종합</span><span> > </span><strong>펀드별 거래내역</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">펀드별 보유내역</h1>
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
						<div class="txt_ty1">( %, 원, &nbsp;</div>
						<div class="sel_ty2" id="selectUnitFund">
						</div>
						<div class="txt_ty1">&nbsp;)</div>
					</div>
					<p class="btn_group virt_clr">
						<a id="btn_read" href="" class="btn_view">조회</a>
					</p>
				</div>
			</div>
			<div class="gridgroup10">
	        	<div id="fundGrid"></div>
	    	</div>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>보유 내역</h2>
			</div>
			<div class="ctab_box">
				<p class="ctabbox_wrap">
					<a href="" data-id="st" class="f-l m_r1 tab active">주식보유</a>
					<a href="" data-id="bd" class="f-l m_r1 tab">채권보유</a>
					<a href="" data-id="ch" class="f-l m_r1 tab">현금성보유</a>
					<a href="" data-id="fo" class="f-l m_r1 tab">파생상품보유</a>
					<a href="" data-id="fd" class="f-l tab">수익증권보유</a>
				</p>
			</div>
			<div id="stDiv" class="gridgroup5 tabdiv" style="display:block;">
	        	<div id="stGrid"></div>
	    	</div>						
			<div id="bdDiv" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="bdGrid"></div>
	    	</div>
			<div id="chDiv" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="chGrid"></div>
	    	</div>
			<div id="foDiv" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="foGrid"></div>
	    	</div>
			<div id="fdDiv" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="fdGrid"></div>
	    	</div>
		</section>
	</section>
</div>