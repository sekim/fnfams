$(function(){
	var custData,
		custDataLen,
		cFundData,
		cFundDataLen,
		selectCustCdOpt = {
			selector : '#selectCustCd',
			url : fng.fams.path + '/setting_01-01_read.asp',
			data : {
				CUST_NM : 'CUST_CD'
			},
			callback: function(){
				//$('#inputCustNm').val($('select', '#selectCustCd').val());
				$('select', '#selectCustCd').change(function(){
					$('#inputCustNm').val($(this).val());
					readPfund($(this).val());
				}).change().focus(function(){
					$(this).click();
				}).click(function(){
				});

			}
		},
		$selectCustCd,
		selectInvstPoolGbOpt = {
			selector : '#invst_pool_gb',
			data : {
				'N/A':0,
				'삼성Pool':1,
				'한투Pool':2
			}
		},
		$selectInvstPoolGb;
	
	$selectCustCd = fng.selectbox(selectCustCdOpt);
	$selectInvstPoolGb = fng.selectbox(selectInvstPoolGbOpt);

    $('a', 'article').on('click', function(){
        return false;
    })
    
	//신규버튼 클릭, 인풋요소 클리어.
    $('#btn_clearForNew').click(function() {
    	if(!getPfundSelectYn()) return;
        clear();
        //첫번째 인풋박스 포커싱.
        $('#fund_cd').removeAttr('disabled').focus();
        $('#fundHistGrid').hide();
        $('#fundHistGridpagearea').remove();
        $('#fundHistEmptyGrid').show();
        return false;
    });

    //저장버튼 클릭,
    $('#btn_save').click(function(e){
    	if(!getPfundSelectYn()) return;
        if(!getFrDtOK()) return;
        var param = {
            cust_cd:$selectCustCd.val(),
            fund_cd_s:$('.ac2>td').eq(0).text(),
            fund_cd:$('#fund_cd').val(),
            fund_nm:$('#fund_nm').val(),
            fund_snm:$('#fund_snm').val(),
            qty_unit:$('#qty_unit').val(),
			fst_set_qty:$('#fst_set_qty').val(),
			fst_set_amt:$('#fst_set_amt').val(),
            invst_pool_gb:$selectInvstPoolGb.val(),
            fst_trd_dt:$('#fst_trd_dt').val().replace(/-/g,''),
            set_dt:$('#set_dt').val().replace(/-/g,''),
			sell_co_nm:$('#sell_co_nm').val(),
			invst_std_rt:$('#invst_std_rt').val(),
			invst_min_rt:$('#invst_min_rt').val(),			
			invst_max_rt:$('#invst_max_rt').val(),
			fr_dt:$('#fr_dt').val().replace(/-/g,''),
            co_cd:$('#co_cd').val(),
			co_nm:$('#co_nm').val(),
			peer_cd:$('#peer_cd').val(),
            work_id:$('#user_id').val()
        }

        if (confirm("저장하시겠습니까?") == true){    //확인
            if ($('#fund_cd').attr('disabled')) {
            	//유효성 검사 항목 지정
		        fng.validator.config = {
		            fund_cd: 'isNonEmpty', //필수
		            fund_nm: 'isNonEmpty', //필수
		            set_dt: 'isNonEmpty', //필수
		            fst_trd_dt: 'isNonEmpty', //필수
		            //peer_cd: 'isNonEmpty', //필수
		            invst_pool_gb: 'isNonEmpty', //필수
		            //fr_dt: 'isNonEmpty',
		            //co_cd: 'isNonEmpty', //필수
		            //co_nm: 'isNonEmpty', //필수
		            qty_unit: 'isNonEmpty', //필수
		            fst_set_qty: 'isNonEmpty', //필수
		            fst_set_amt: 'isNonEmpty', //필수
		        };

		        //유효성 검사
		        fng.validator.validate(param);
		        if (fng.validator.hasErrors()) {
		            alert('* 가 표시되어있는 항목은 필수 항목입니다.');
		            //fng.debug.log(fng.validator.messages.join('\n'));
		            return false;
		        };

                if(param.fr_dt && param.co_cd && param.co_nm && param.peer_cd) {
                	updateWithHist(param);
                } else {
                	update(param);
                }
            } else {
            	//유효성 검사 항목 지정
		        fng.validator.config = {
		            fund_cd: 'isNonEmpty', //필수
		            fund_nm: 'isNonEmpty', //필수
		            set_dt: 'isNonEmpty', //필수
		            fst_trd_dt: 'isNonEmpty', //필수
		            peer_cd: 'isNonEmpty', //필수
		            invst_pool_gb: 'isNonEmpty', //필수
		            fr_dt: 'isNonEmpty',
		            co_cd: 'isNonEmpty', //필수
		            co_nm: 'isNonEmpty', //필수
		            qty_unit: 'isNonEmpty', //필수
		            fst_set_qty: 'isNonEmpty', //필수
		            fst_set_amt: 'isNonEmpty', //필수
		        };

		        //유효성 검사
		        fng.validator.validate(param);
		        if (fng.validator.hasErrors()) {
		            alert('* 가 표시되어있는 항목은 필수 항목입니다.');
		            //fng.debug.log(fng.validator.messages.join('\n'));
		            return false;
		        };
                create(param);
            }
        }else{   //취소
            return false;
        }
        return false;
        $('#btn_clearForNew').click();      
    });

	//삭제버튼 클릭,
    $('#btn_delete').click(function(){
    	if($('input:checked', '#CfundGrid > table').length == 0) {
    		alert('삭제할 펀드를 선택해 주세요.');
    		return false;
    	}

        var deletelist=[],
            param;
        
        $('input:checked', '#CfundGrid > table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(0).text());
        });

        param = {
        	cust_cd:$selectCustCd.val(),
        	fund_cd_s:$('tr.ac2>td','#PfundGrid>table').eq(0).text(),
        	fund_cd:deletelist.join("','")
        };

        if (confirm("삭제하시겠습니까?") == true){    //확인       	
            remove(param);            
        }else{   //취소
            return false;
        }
        return false;
    });

    function getPfundSelectYn() {
    	if($('.ac2','#PfundGrid').length === 0){
    		alert('모펀드를 선택하세요.');
    		return false;
    	}
    	return true;
    }

    function getFrDtOK(){
        if($('td', '#fundHistGrid').eq(0).text().length === 8 && $('#fr_dt').text().length === 8 && $('td', '#fundHistGrid').eq(0).text() >= $('#fr_dt').text()){
            alert('최초일자가 너무 작습니다.');
            return false;
        }
        return true;
    }

    //clear
    function clear(){
        $('input.int_ty1, input.int_ty2, input.int_ty3').each(function(){
            $(this).val('');
        });
        $('.calendar').each(function(){
            $(this).val('');
        });
    }

    //조회 일반펀드 모펀드
    function readPfund(cust_cd){
        var grdOpt,
            ajaxSettings;
        $('#PfundGrid').html('');
        $('#PfundGridpagearea').remove();
        function readSuccess(d){
            custData = d;
            custDataLen = custData.length;
            grdOpt = {
                selector:'#PfundGrid',
                tableClass:'s1-3-1',
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'최초투자일'},
                        {title:'투자풀구분'},
                        {title:'운용사'},
                        {title:'판매사'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'PEER_CD'},
                    {field:'FST_TRD_DT'},
                    {field:'INVST_POOL_GB'},
                    {field:'CO_NM'},
                    {field:'SELL_CO_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#PfundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //그리드에서 기금 클릭, 고객정보 데이터 삽입
                    $('#PfundGrid').off('click', 'table>tbody>tr');
                    $('#PfundGrid').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {	//빈줄을 클릭한것이 아니라면.
                            //$('input',this).prop('checked',!$('input',this).prop('checked'));
                            $('table>tbody>tr','#PfundGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');        				

                            var idx,
                                param;

                            for(var i = 0; i < custDataLen; i++){
                            	if (custData[i].FUND_CD == $('td', this).eq(0).text()){
                                    idx = i;
                                    break;
                                }
                            }

                            if (i==custDataLen){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                                return;
                            }

                            param = {
                            	cust_cd:custData[i].CUST_CD,
                            	fund_cd_s:custData[i].FUND_CD
                            }
                            $('#btn_clearForNew').click();
                            readCfund(param);

                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                }
            }

            fng.grid(grdOpt);
            $('#CfundGridEmpty').show();
			$('#CfundGrid').hide();
        }

        function readError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-02_read.asp?cust_cd=' + cust_cd,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
        clear();
	}

	//조회 자펀드
	function readCfund(param){
        var grdOpt,
            ajaxSettings;
        $('#CfundGridpagearea').remove();
        function readSuccess(d){      	
            cFundData = d;
            cFundDataLen = cFundData.length;
            grdOpt = {
                selector:'#CfundGrid',
                tableClass:'s1-3-2',
                selectable: true,
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'펀드설정일'},
                        {title:'최초투자일'},
                        {title:'운용사'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'PEER_CD'},
                    {field:'SET_DT'},
                    {field:'FST_TRD_DT'},
                    {field:'CO_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#CfundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //그리드에서 기금 클릭, 고객정보 데이터 삽입
                    $('#CfundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {	//빈줄을 클릭한것이 아니라면.
                            clear();
                            $('table>tbody>tr','#CfundGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');        				

                            var idx;
                            for(var i = 0; i < cFundDataLen; i++){
                                if (cFundData[i].FUND_CD == $('td', this).eq(1).text()){
                                    idx = i;
                                    break;
                                }
                            }
                            if (i==cFundDataLen){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                            }

                            function readSuccess(d){  	
                            	histGrdOpt = {
					                selector:'#fundHistGrid',
					                tableClass:'s1-2-3',
					                headerVisible: false,
					                header:[
					                    [
					                        {title:'순번'},
					                        {title:'최초일자'},
					                        {title:'최종일자'},
					                        {title:'운용사코드'},
					                        {title:'운용사명'},
					                        {title:'펀드유형코드'},
					                        {title:'BM코드'}
					                    ]
					                ],
					                body:[
					                    {field:'RN'},
					                    {field:'FR_DT'},
					                    {field:'STD_DT'},
					                    {field:'CO_CD'},
					                    {field:'CO_NM'},
					                    {field:'PEER_CD'},
					                    {field:'BM_CD'}
					                ],
					                data:d,
					                page:{
					                    curPage:1,
					                    line:5,
					                    target:'#fundHistGridpagearea'
					                },
					                callback: function(){
                            			$('#fundHistGrid').show();
					                	$('#fundHistEmptyGrid').hide(); //빈 펀드 히스토리 그리드 숨김
					                }					                
					            }

					            fng.grid(histGrdOpt);
                            }

                            function readError(data, status, err){
                                fng.debug.log(data.status).log(err);
                            }

                            function readDone(){

                            }

                            var ajaxSettingsHist = {
					            url: fng.fams.path + '/setting_01-02_hist_read.asp?cust_cd=' + param.cust_cd + '&fund_cd=' + cFundData[i].FUND_CD,
					            success: readSuccess,
					            error: readError,
					            done: readDone
					        }

					        fng.ajax.getJson(ajaxSettingsHist);


                            $('#fund_cd').val(cFundData[i].FUND_CD);	//펀드코드
                            $('#fund_nm').val(cFundData[i].FUND_NM); //펀드명
                            $('#fund_snm').val(cFundData[i].FUND_SNM);	//펀드약명
                            $('#qty_unit').val(cFundData[i].QTY_UNIT);	//설정기준가
                            $('#fst_set_qty').val(cFundData[i].FST_SET_QTY);	//설정좌수
                            $('#fst_set_amt').val(cFundData[i].FST_SET_AMT);	//설정금액
                            $selectInvstPoolGb.val(cFundData[i].INVST_POOL_GB);	//투자풀구분
                            $('#fst_trd_dt').val(cFundData[i].FST_TRD_DT);	//최초투자일
                            $('#set_dt').val(cFundData[i].SET_DT);	//펀드설정일
                            $('#sell_co_nm').val(cFundData[i].SELL_CO_NM);	//판매사명
                            $('#invst_std_rt').val(cFundData[i].INVST_STD_RT);	//기준투자비중
                            $('#invst_min_rt').val(cFundData[i].INVST_MIN_RT);	//최소투자비중
                            $('#invst_max_rt').val(cFundData[i].INVST_MAX_RT);	//최대투자비중
                            //$('#peer_cd').val(cFundData[i].PEER_CD);
                            //$('#co_cd').val(cFundData[i].CO_CD);
                            //$('#co_nm').val(cFundData[i].CO_NM);

                            //$('#cust_cd').prop('disabled', true);   //PK 고객번호는 수정불가
                            $('#fund_cd').attr('disabled', 'disabled');   //PK 고객번호는 수정불가
                            $('#fund_nm').focus();  //두번째 고객명에 포커싱
                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                    //그리드에서 체크박스 클릭
                    $('#CfundGrid').off('click', 'table>tbody>tr>td>input').on('click', 'table>tbody>tr>td>input', function(e){
                       e.stopPropagation();    //기금 클릭 버블링 차단
                    });
                }
            }

            fng.grid(grdOpt);

			$('#CfundGridEmpty').hide();
			$('#CfundGrid').show();
        }

        function readError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-03_read.asp',
            param:param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
        clear();
	}

    //생성
	function create(param){
        var ajaxSettings,
            isAlready = false;

        function createSuccess(d){
            fng.debug.log(d);
            alert('저장되었습니다.');                      
            readCfund(param);      
        }

        function createError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function createDone(){
        }

        $('tbody', '#CfundGrid').find('tr').each(function(){
            if(param.fund_cd === $(this).find('td').eq(1).text())
                isAlready = true;
        })

        if(isAlready) {
            alert('이미 등록된 펀드번호입니다.');
            return;
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-03_create.asp',
            param:param,
            success: createSuccess,
            error: createError,
            done: createDone
        }

        fng.ajax.queryExecute(ajaxSettings);
	}

    //수정(+변경내역 생성)
	function updateWithHist(param){
        var ajaxSettings,
            isAlready = false;

        function updateSuccess(d){
        	//fng.debug.log(d)
            alert('저장되었습니다.');
            readCfund(param);
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-02_updateWithHist.asp',
            param:param,
            success: updateSuccess,
            error: updateError,
            done: updateDone
        }

        fng.ajax.queryExecute(ajaxSettings);
	}

    //수정
	function update(param){
        var ajaxSettings;

        function updateSuccess(d){
            alert('저장되었습니다.');
            readCfund(param);
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/setting_01-02_update.asp',
            param:param,
            success: updateSuccess,
            error: updateError,
            done: updateDone
        }

        fng.ajax.queryExecute(ajaxSettings);
	}

    //삭제
	function remove(param){
        var ajaxSettings;

        function removeSuccess(d){
        	//fng.debug.log(d);
            alert('삭제되었습니다.');
            readCfund(param);
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-03_delete.asp',
            param:param,
            success: removeSuccess,
            error: removeError,
            done: removeDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    }  

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    //문자열 길이 검사
    fng.fams.checkLength('#co_cd',3,'운용사코드는 3글자 입니다.');   //운용사코드 체크
})