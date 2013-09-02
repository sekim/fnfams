<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>설정관리</span><span> > </span><span>등록관리</span><span> > </span><strong>기금 등록</strong></p>
		<a href="javascript:;" class="btn_print">인쇄</a>
	</div>
	<section class="section_pg">
		<h1 class="pg_title">기금 등록</h1>
		<!-- 상단 -->
		<section class="section_box">
			<!-- 조회,삭제 그룹 옵션박스가 없을 때 사용 -->
			<p class="btn_group btn_group_top virt_clr">
				<a id="btn_delete" href="javascript:;" class="btn_del">삭제</a>
			</p>
			<div class="gridgroup10">
          <div id="custGrid"></div>
      </div>
			<!-- 설명 -->
			<ul class="tip_box">
				<li>현재 등록되어 있는 기금이 조회되며, 구분자를 선택 후 삭제 버튼을 클릭하시면 해당 기금의 정보가 삭제됩니다.</li>
			</ul>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>고객 정보</h2>
				<p class="btn_group virt_clr"><a id="btn_clearForNew" href="javascript:;" class="btn_new">신규</a><a id="btn_save" href="javascript:;" class="btn_save">저장</a></p>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="option_b_box virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">*고객번호</label>
					<div class="ipt_ty1">
						<input id="cust_cd" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*고객명(전체)</label>
					<div class="ipt_ty1">
						<input id="cust_nm" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">고객명(약어)</label>
					<div class="ipt_ty1">
						<input id="cust_snm" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*고객구분</label>
					<div class="ipt_ty1">
						<input id="cust_gb" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">법인코드</label>
					<div class="ipt_ty1">
						<input id="co_cd" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">비고</label>
					<div class="ipt_ty2">
						<input id="rmrk" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">사용여부</label>
					<div class="sel_ty1" id="use_yn">
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
	//캘린더사용을 위한 jquery ui 로드
	fng.util.loadScript("/scripts/setting_01-01.js", function(){});
});
</script>