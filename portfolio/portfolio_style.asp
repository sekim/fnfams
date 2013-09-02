<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 정보</span><span> > </span><strong>채권 유형별 현황</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">스타일 현황</h1>
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
		<section class="section_box" style="overflow:hidden;clear:both;">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="sbwrap_l virt_clr f-l">
				<div class="head_box virt_clr">
					<h2>채권 스타일 분석</h2>
				</div>
				<div id="bondStyleChart" style="width: 100%; height: 350px;"></div>
			</div>
			<div class="sbwrap_r virt_clr f-r">
				<div class="head_box virt_clr">
					<h2>주식 스타일 분석</h2>
				</div>
				<div id="stockStyleChart" style="width: 100%; height: 350px;"></div>
			</div>
		</section>
	</section>
</div>