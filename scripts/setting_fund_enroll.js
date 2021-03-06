$(function(){
    var custData,
		selectCustCdOpt = {
			selector : '#selectCustCd',
			url : fng.fams.path + '/setting_customer_enroll_read.asp',
			data : {
				CUST_NM : 'CUST_CD'
			},
			callback: function(){
				$('select', '#selectCustCd').change(function(){
					$('#inputCustNm').val($(this).val());
					read($(this).val());
				}).change();
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
        clear();
        //첫번째 인풋박스 포커싱.
        $('.ac2').removeClass('ac2');
        $('#fund_cd').removeAttr('disabled').focus();
        $('#fundHistGrid').hide();
        $('#fundHistGridpagearea').remove();
        $('#fundHistEmptyGrid').show();
        return false;
    });

    //저장버튼 클릭,
    $('#btn_save').click(function(e){
        var param = {
            cust_cd:$selectCustCd.val(),
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
                    if(!getFrDtOK()) {
                        return false;
                    }
                	updateWithHist(param);
                    return false;
                } else {
                	update(param);
                    return false;
                }

            } else {
                //if(!getFrDtOK()) return false;
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
                return false;
            }
        }else{   //취소
            return false;
        }
    });

	//삭제버튼 클릭,
    $('#btn_delete').click(function(){
    	if($('input:checked', 'table').length == 0) {
    		alert('삭제할 펀드를 체크해 주세요.');
    		return false;
    	}

        var deletelist=[],
            param;
        
        $('input:checked', 'table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(1).text());
        });

        param = {
        	cust_cd:$selectCustCd.val(),
        	fund_cd:deletelist.join("','")
        };

        if (confirm("삭제하시겠습니까?") == true){    //확인       	
            remove(param);
            return false;         
        }else{   //취소
            return false;
        } 
    });

    function getFrDtOK(){ 
fng.debug.log($('td', '#fundHistGrid').eq(1).text().length);        
fng.debug.log($('#fr_dt').val().length);
fng.debug.log($('td', '#fundHistGrid').eq(1).text());
fng.debug.log($('#fr_dt').val());
        if($('td', '#fundHistGrid').eq(1).text().length === 8 && $('#fr_dt').val().length === 8 && $('td', '#fundHistGrid').eq(1).text() >= $('#fr_dt').val()){
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

    //조회
	function read(cust_cd){
        var grdOpt,
            ajaxSettings;
        $('#PfundGrid').html('');
        $('#PfundGridpagearea').remove();
        function readSuccess(d){
            custData = d;
            grdOpt = {
                url:this.url,
                selector:'#PfundGrid',
                tableClass:'ferl-1',
                selectable: true,
                header:[
                    [
                        {title:'고객번호'},
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
                    {field:'CUST_CD'},
                    {field:'FUND_CD'},
                    {field:'FUND_NM', align:'left'},
                    {field:'PEER_CD', align:'left'},
                    {field:'FST_TRD_DT', type:'date'},
                    {field:'INVST_POOL_GB', align:'left'},
                    {field:'CO_NM', align:'left'},
                    {field:'SELL_CO_NM', align:'left'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
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
                    $('#PfundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {	//빈줄을 클릭한것이 아니라면.
                            clear();
                            $('table>tbody>tr','#PfundGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');        				

                            var len = custData.length,
                                idx;
                            for(var i = 0; i < len; i++){
                                if (custData[i].FUND_CD == $('td', this).eq(2).text()){
                                    idx = i;
                                    break;
                                }
                            }

                            if (i==len){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                            }

                            function readSuccess(d){  	
                            	histGrdOpt = {
                                    url:this.url,
					                selector:'#fundHistGrid',
					                tableClass:'ferl-3',
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
					                    line:10,
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
					            url: fng.fams.path + '/setting_fund_enroll_hist_read.asp?cust_cd=' + cust_cd + '&fund_cd=' + custData[i].FUND_CD,
					            success: readSuccess,
					            error: readError,
					            done: readDone
					        }

					        fng.ajax.getJson(ajaxSettingsHist);


                            $('#fund_cd').val(custData[i].FUND_CD);	//펀드코드
                            $('#fund_nm').val(custData[i].FUND_NM); //펀드명
                            $('#fund_snm').val(custData[i].FUND_SNM);	//펀드약명
                            $('#qty_unit').val(custData[i].QTY_UNIT);	//설정기준가
                            $('#fst_set_qty').val(custData[i].FST_SET_QTY);	//설정좌수
                            $('#fst_set_amt').val(custData[i].FST_SET_AMT);	//설정금액
                            $selectInvstPoolGb.val(custData[i].INVST_POOL_GB);	//투자풀구분
                            $('#fst_trd_dt').val(custData[i].FST_TRD_DT);	//최초투자일
                            $('#set_dt').val(custData[i].SET_DT);	//펀드설정일
                            $('#sell_co_nm').val(custData[i].SELL_CO_NM);	//판매사명
                            $('#invst_std_rt').val(custData[i].INVST_STD_RT);	//기준투자비중
                            $('#invst_min_rt').val(custData[i].INVST_MIN_RT);	//최소투자비중
                            $('#invst_max_rt').val(custData[i].INVST_MAX_RT);	//최대투자비중
                            //$('#peer_cd').val(custData[i].PEER_CD);
                            //$('#co_cd').val(custData[i].CO_CD);
                            //$('#co_nm').val(custData[i].CO_NM);

                            //$('#cust_cd').prop('disabled', true);   //PK 고객번호는 수정불가
                            $('#fund_cd').attr('disabled', 'disabled');   //PK 고객번호는 수정불가
                            $('#fund_nm').focus();  //두번째 고객명에 포커싱
                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                    //그리드에서 체크박스 클릭
                    $('#PfundGrid').off('click', 'table>tbody>tr>td>input').on('click', 'table>tbody>tr>td>input', function(e){
                       e.stopPropagation();    //기금 클릭 버블링 차단
                    });
                }
            }

            fng.grid(grdOpt);
        }

        function readError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function readDone(){
            $('#btn_clearForNew').click();
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_fund_enroll_read.asp?cust_cd=' + cust_cd,
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
            alert('저장되었습니다.');
            read($selectCustCd.val());      
        }

        function createError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function createDone(){
        }

        $('tbody', '#PfundGrid').find('tr').each(function(){
            if(param.fund_cd === $(this).find('td').eq(2).text())
                isAlready = true;
        })

        if(isAlready) {
            alert('이미 등록된 펀드번호입니다.');
            return;
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_fund_enroll_create.asp',
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
        	fng.debug.log(d)
            alert('저장되었습니다.');
            read($selectCustCd.val());
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_fund_enroll_updateWithHist.asp',
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
        	fng.debug.log(d)
            alert('저장되었습니다.');
            read($selectCustCd.val());
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/setting_fund_enroll_update.asp',
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
            alert('삭제되었습니다.');
            read($selectCustCd.val());
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_fund_enroll_delete.asp',
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