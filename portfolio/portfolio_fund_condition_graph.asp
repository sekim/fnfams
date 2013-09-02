<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 종합</span><span> > </span><strong>펀드현황 그래프</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">펀드현황 그래프</h1>
		<!-- 상단 -->
		<section class="section_box virt_clr">
			<div class="p_b6">
				<!-- 공용 옵션박스 -->
				<div class="option_t3_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">기준일자</label>
						<div class="cad_ty1">
							<input id="fr_dt" data-term="-1,Y" name="" type="text" maxlength="10" class="int_ty1 calendar" />
							<a href="" data-id="fr_dt" class="btn_calopen">달력</a>
						</div>
						<span class="f_etc1">~</span>
						<div class="cad_ty1">
							<input id="to_dt" name="" type="text" maxlength="10" class="int_ty1 calendar" />
							<a href="" data-id="to_dt" class="btn_calopen">달력</a>
						</div>
					</div>
					<div class="fbox fbox_ty1">
						<label for="">단위</label>
						<div class="txt_ty1">( %, 원, &nbsp;</div>
						<div class="sel_ty2" id="selectUnit">
						</div>
						<div class="txt_ty1">&nbsp;)</div>
					</div>
					<p class="btn_group virt_clr">
						<a id="btn_read" href="" class="btn_view">조회</a>
					</p>
				</div>
			</div>
			<div class="table_wrap fcondg-1 f-l">
				<div class="gridgroup10">
		        	<div id="pFundGrid"></div>
		    	</div>
			</div>
			<div class="gf_box fcondg-2 f-r">
				<div id="chartPfund" style="width: 457px; height: 330px;"></div>
			</div>
		</section>
		<section class="section_box virt_clr">
			<div class="head_box virt_clr">
				<h2>FoFs 현황</h2>
			</div>
			<div class="table_wrap fcondg-3 f-lc f-l">
				<div class="gridgroup10">
		        	<div id="cFundGrid"></div>
		    	</div>
			</div>
			<div class="gf_box fcondg-4 f-r">
				<div id="chartCfund" style="width: 457px; height: 330px;"></div>
			</div>
		</section>
	</section>
</div>