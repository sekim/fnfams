<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>포트폴리오분석</span><span> > </span><span>포트폴리오 종합</span><span> > </span><strong>펀드현황 추이</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">펀드현황 추이</h1>
		<!-- 상단 -->
		<section class="section_box virt_clr">
			<!-- 공용 옵션박스 -->
			<div class="p_b6">
				<div class="option_t3_box virt_clr">
					<div class="fbox fbox_ty1">
						<label for="">기준일자</label>
						<div class="cad_ty1">
							<input id="fr_dt" name="" type="text" maxlength="10" class="int_ty1 calendar" />
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
			<div class="table_wrap f-l">
				<div class="gridgroup5">
		        	<div id="pFundGrid"></div>
		    	</div>
		    </div>
		    <div class="table_wrap f-r">
				<div class="gridgroup5">
		        	<div id="pFundHistGrid"></div>
		    	</div>
		    </div>			
			<!-- 2단형태에 설명문을 넣을 때는 f-l클래스를 부여한다 -->
			<ul class="tip_box f-l">
				<li>펀드를 클릭하면 하단에 보유펀드가 조회됩니다.</li>
			</ul>
		</section>
		<section class="section_box virt_clr">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>FoFs 현황</h2>
			</div>
			<div class="table_wrap f-l f-lc">
				<div class="gridgroup5">
		        	<div id="cFundGrid"></div>
		    	</div>
		    </div>
		    <div class="table_wrap f-r">
				<div class="gridgroup5">
		        	<div id="cFundHistGrid"></div>
		    	</div>
		    </div>		
		</section>
	</section>
</div>