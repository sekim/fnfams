<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 정보</span><span> > </span><strong>채권 유형별 현황</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">채권 유형별 현황</h1>
		<!-- 상단 -->
		<section class="section_box">
			<!-- 공용 옵션박스 -->
			<div class="p_b6">
				<div class="option_t3_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">기준일자</label>
						<div class="cad_ty1">
							<input id="trd_dt" name="" type="text" maxlength="10" class="int_ty1 fncalendar" />
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
				<h2>채권 유형별 현황</h2>
			</div>
			<!-- 탭 -->
			<div class="ctab_box2">
				<p class="ctabbox_wrap2">
					<a href="" data-id="110" class="tab f-l m_r1 active">국채</a>
					<a href="" data-id="120" class="tab f-l">지방채</a>
					<a href="" data-id="130" class="tab f-l">특수채</a>
					<a href="" data-id="210" class="tab f-l">통안채</a>
					<a href="" data-id="220" class="tab f-l">금융채</a>
					<a href="" data-id="310" class="tab f-l">회사채</a>
				</p>
			</div>
			<div id="110Div" class="gridgroup5 tabdiv" style="display:block;">
	        	<div id="110Grid"></div>
	    	</div>
			<div id="120Div" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="120Grid"></div>
	    	</div>
			<div id="130Div" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="130Grid"></div>
	    	</div>
			<div id="210Div" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="210Grid"></div>
	    	</div>
			<div id="220Div" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="220Grid"></div>
	    	</div>
			<div id="310Div" class="gridgroup5 tabdiv" style="display:none;">
	        	<div id="310Grid"></div>
	    	</div>
		</section>
	</section>
</div>