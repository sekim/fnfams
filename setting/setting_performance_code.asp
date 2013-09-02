<div class="cont_wrap">
	<div class="guide_area virt_clr">
		<p class="gd f-r"><span>설정관리</span><span> > </span><span>설정정보관리</span><span> > </span><strong>성과단위 코드</strong></p>
		<a href="" class="btn_print">인쇄</a>
	</div>

	<section class="section_pg">
		<h1 class="pg_title">성과단위 코드</h1>
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
				<div class="fbox fbox_ty1">
					<label for="">성과단위</label>
					<div class="sel_ty1" id="selectPeerCd">
					</div>
				</div>
				<p class="btn_group virt_clr">
					<a id="btn_delete" href="javascript:;" class="btn_del">삭제</a>
				</p>
			</div>
			<div class="gridgroup10">
          <div id="peerGrid"></div>
      </div>
			<!-- 설명 -->
			<ul class="tip_box">
				<li> 해당 고객번호에 등록되어있는 성과단위가 조회됩니다.</li>
				<li>해당 성과단위 분류의 구분자를 선택 후 삭제를 클릭하면 해당 성과단위 정보가 삭제됩니다.</li>
			</ul>
		</section>
		<section class="section_box">
			<!-- 옵션박스 밖에 위치 버튼 박스 -->
			<div class="head_box virt_clr">
				<h2>유형분류 등록</h2>
				<p class="btn_group virt_clr"><a href="javascript:;" id="btn_clearForNew" class="btn_new">신규</a><a href="javascript:;" id="btn_save" class="btn_save">저장</a></p>
			</div>
			<!-- 공용 옵션박스 -->
			<div class="option_b_box virt_clr">
				<div class="fbox fbox_ty1">
					<label for="">*유형분류</label>
					<div class="ipt_ty1">
						<input id="peer_cd" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*유형명</label>
					<div class="ipt_ty1">
						<input id="peer_nm" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">유형영문명</label>
					<div class="ipt_ty1">
						<input id="peer_nm_eng" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">상위유형코드</label>
					<div class="ipt_ty1">
						<input id="parent_peer_cd" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">*유형단계</label>
					<div class="ipt_ty1">
						<input id="peer_depth" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">단위유형여부</label>
					<div class="sel_ty1" id="selectPeerUnitYn">
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">BM코드</label>
					<div class="ipt_ty1">
						<input id="bm_cd" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">기준투자비중</label>
					<div class="ipt_ty1">
						<input id="invst_std_rt" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">최소투자비중</label>
					<div class="ipt_ty1">
						<input id="invst_min_rt" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">최대투자비중</label>
					<div class="ipt_ty1">
						<input id="invst_max_rt" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">기대수익률</label>
					<div class="ipt_ty1">
						<input id="expt_rtn" name="" type="text" class="int_ty1" />
					</div>
				</div>
				<div class="fbox fbox_ty1">
					<label for="">목표수익률</label>
					<div class="ipt_ty1">
						<input id="tgt_rtn" name="" type="text" class="int_ty1" />
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
					<div class="sel_ty1" id="selectUseYn">
					</div>
				</div>
			</div>
		</section>
	</section>
</div>