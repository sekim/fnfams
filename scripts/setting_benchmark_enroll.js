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
        selectUseYnOpt = {
            selector : '#use_yn',
            data : {
                'Y':'Y',
                'N':'N'
            }
        },
        $selectUseYn;
    
    $selectCustCd = fng.selectbox(selectCustCdOpt);
    $selectUseYn = fng.selectbox(selectUseYnOpt);
	
	
    $('a', 'article').on('click', function(){
        return false;
    })
    
	//신규버튼 클릭, 인풋요소 클리어.
    $('#btn_clearForNew').click(function() {
        clear();
        //첫번째 인풋박스 포커싱.
        $('.ac2').removeClass('ac2');
        $('#bm_cd').removeAttr('disabled').focus();
        $('#BMHistGrid').hide();
        $('#BMHistGridpagearea').remove();
        $('#BMHistEmptyGrid').show();
        return false;
    });

    //저장버튼 클릭,
    $('#btn_save').click(function(e){
        var param = {
            cust_cd:$selectCustCd.val(),
            bm_cd:$('#bm_cd').val(),
            std_dt:'33330303',
            fr_dt:$('#fr_dt').val(),
            bm_nm:$('#bm_nm').val(),
            mkt_idx_cd:$('#mkt_idx_cd').val(),
            use_yn:$selectUseYn.val(),
            work_id:$('#user_id').val()
        }

        if (confirm("저장하시겠습니까?") == true){    //확인
            if ($('#bm_cd').attr('disabled')) {
            	//유효성 검사 항목 지정
		        fng.validator.config = {
		            bm_cd: 'isNonEmpty', //필수
		            bm_nm: 'isNonEmpty' //필수
		        };

		        //유효성 검사
		        fng.validator.validate(param);
		        if (fng.validator.hasErrors()) {
		            alert('* 가 표시되어있는 항목은 필수 항목입니다.');
		            //fng.debug.log(fng.validator.messages.join('\n'));
		            return false;
		        };

                if(param.fr_dt && param.mkt_idx_cd) {
                    if(!getFrDtOK()) {
                        return false;
                    }
                    fng.debug.log('update with insert');
                	updateWithHist(param);
                    return false;
                } else {
                    fng.debug.log('update');
                	update(param);
                    return false;
                }

            } else {
                //if(!getFrDtOK()) return false;
            	//유효성 검사 항목 지정
		        fng.validator.config = {
                    bm_cd: 'isNonEmpty', //필수
                    bm_nm: 'isNonEmpty', //필수
                    fr_dt: 'isNonEmpty', //필수
                    mkt_idx_cd: 'isNonEmpty' //필수
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
    		alert('삭제할 벤치마크를 체크해 주세요.');
    		return false;
    	}

        var deletelist=[],
            param;
        
        $('input:checked', 'table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(0).text());
        });

        param = {
        	cust_cd:$selectCustCd.val(),
        	bm_cd:deletelist.join("','"),
            std_dt:'33330303',
            work_id:$('#user_id').val()
        };

        if (confirm("삭제하시겠습니까?") == true){    //확인       	
            remove(param);
            return false;         
        }else{   //취소
            return false;
        } 
    });

    function getFrDtOK(){
        if($('td', '#BMHistGrid').eq(1).text().length === 8 && $('#fr_dt').val().length === 8 && $('td', '#BMHistGrid').eq(1).text() >= $('#fr_dt').val()){
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
        $('#BMGrid').html('');
        $('#BMGridpagearea').remove();
        function readSuccess(d){
            custData = d;
            grdOpt = {
                selector:'#BMGrid',
                tableClass:'bmerl-1',
                selectable: true,
                header:[
                    [
                        {title:'벤치마크코드'},
                        {title:'벤치마크명'},
                        {title:'최초일자'},
                        {title:'최종일자'},
                        {title:'시장지수코드'},
                        {title:'사용여부'}
                    ]
                ],
                body:[
                    {field:'BM_CD'},
                    {field:'BM_NM', align:'left'},
                    {field:'FR_DT', type:'date'},
                    {field:'STD_DT', type:'date'},
                    {field:'MKT_IDX_CD'},
                    {field:'USE_YN'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#BMGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //그리드에서 기금 클릭, 고객정보 데이터 삽입
                    $('#BMGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {	//빈줄을 클릭한것이 아니라면.
                            clear();
                            $('table>tbody>tr','#BMGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');        				

                            var len = custData.length,
                                idx;
                            for(var i = 0; i < len; i++){
                                if (custData[i].BM_CD == $('td', this).eq(1).text()){
                                    idx = i;
                                    break;
                                }
                            }

                            if (i==len){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                            }

                            function readSuccess(d){  	
                            	histGrdOpt = {
					                selector:'#BMHistGrid',
					                tableClass:'bmerl-3',
					                headerVisible: false,
					                header:[
					                    [
					                        {title:'순번'},
					                        {title:'최초일자'},
					                        {title:'최종일자'},
					                        {title:'사용자지수코드'}
					                    ]
					                ],
					                body:[
					                    {field:'RN'},
					                    {field:'FR_DT', type:'date'},
					                    {field:'STD_DT', type:'date'},
					                    {field:'MKT_IDX_CD'}
					                ],
					                data:d,
					                page:{
					                    curPage:1,
					                    line:5,
					                    target:'#BMHistGridpagearea'
					                },
					                callback: function(){
                            			$('#BMHistGrid').show();
					                	$('#BMHistEmptyGrid').hide(); //빈 펀드 히스토리 그리드 숨김
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
					            url: fng.fams.path + '/setting_benchmark_enroll_hist_read.asp?cust_cd=' + cust_cd + '&bm_cd=' + custData[i].BM_CD,
					            success: readSuccess,
					            error: readError,
					            done: readDone
					        }

					        fng.ajax.getJson(ajaxSettingsHist);


                            $('#bm_cd').val(custData[i].BM_CD);	//BM코드
                            $('#bm_nm').val(custData[i].BM_NM); //BM명
                            $selectUseYn.val(custData[i].USE_YN);

                            $('#bm_cd').attr('disabled', 'disabled');
                            $('#bm_nm').focus();  //두번째 고객명에 포커싱
                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                    //그리드에서 체크박스 클릭
                    $('#BMGrid').off('click', 'table>tbody>tr>td>input').on('click', 'table>tbody>tr>td>input', function(e){
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
            url: fng.fams.path + '/setting_benchmark_enroll_read.asp?cust_cd=' + cust_cd,
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

        $('tbody', '#BMGrid').find('tr').each(function(){
            if(param.bm_cd === $(this).find('td').eq(1).text())
                isAlready = true;
        })

        if(isAlready) {
            alert('이미 등록된 펀드번호입니다.');
            return;
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_benchmark_enroll_create.asp',
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
        	// fng.debug.log(d)
            alert('저장되었습니다.');
            read($selectCustCd.val());
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_benchmark_enroll_updateWithHist.asp',
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
        	// fng.debug.log(d)
            alert('저장되었습니다.');
            read($selectCustCd.val());
        }

        function updateError(data, status, err){
        	fng.debug.log(data.status).log(err);
        }

        function updateDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/setting_benchmark_enroll_update.asp',
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
            fng.debug.log(d);
            alert('삭제되었습니다.');
            read($selectCustCd.val());
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_benchmark_enroll_delete.asp',
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
})