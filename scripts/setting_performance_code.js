$(function(){
    var peerData,
        selectPeerCdOpt,
        $selectPeerCd,
        selectCustCdOpt = {
            selector : '#selectCustCd',
            url : fng.fams.path + '/setting_customer_enroll_read.asp',
            data : {
                CUST_NM : 'CUST_CD'
            },
            callback: function(){
                $('select', '#selectCustCd').change(function(){
                    $('#inputCustNm').val($(this).val());
                    $('select', '#selectPeerCd').unbind('change');
                    $('#selectPeerCd').html('');
                    var cust_cd = $(this).val(); 
                    selectPeerCdOpt = {
                        selector : '#selectPeerCd',
                        url : fng.fams.path + '/setting_performance_code_peer_read.asp?cust_cd=' + cust_cd,
                        data : {
                            PEER_NM : 'PEER_CD'
                        },
                        callback: function(){
                            $('select', '#selectPeerCd').change(function(){
                                var param = {
                                    cust_cd:cust_cd,
                                    peer_cd:$(this).val()
                                }
                                read(param);
                            }).change();
                        }
                    };
                    $selectPeerCd = fng.selectbox(selectPeerCdOpt);
                }).change();
            }
        },
        $selectCustCd,
        selectUseYnOpt = {
            selector : '#selectUseYn',
            data : {
                'Y':'Y',
                'N':'N'
            }
        },
        $selectUseYn,
        selectPeerUnitYnOpt = {
            selector : '#selectPeerUnitYn',
            data : {
                'Y':'Y',
                'N':'N'
            }
        },
        $selectPeerUnitYn;
    
    $selectPeerUnitYn = fng.selectbox(selectPeerUnitYnOpt);    
    $selectUseYn = fng.selectbox(selectUseYnOpt)   
    $selectCustCd = fng.selectbox(selectCustCdOpt);
    
    $('a', 'article').on('click', function(){
        return false;
    })

    //신규버튼 클릭, 인풋요소 클리어.
    $('#btn_clearForNew').click(function() {
        clear();
        //첫번째 인풋박스 포커싱.
        $('.ac2').removeClass('ac2');
        $('#peer_cd').removeAttr('disabled').focus();
        $('#peer_cd').focus();
    });

    //저장버튼 클릭,
    $('#btn_save').click(function(e){
        var param = {
            cust_cd:$selectCustCd.val(),
            peer_cd:$('#peer_cd').val(),
            peer_nm:$('#peer_nm').val(),
            peer_nm_eng:$('#peer_nm_eng').val(),
            parent_peer_cd:$('#parent_peer_cd').val(),
            peer_depth:$('#peer_depth').val(),
            peer_unit_yn:$selectPeerUnitYn.val(),
            bm_cd:$('#bm_cd').val(),
            invst_std_rt:$('#invst_std_rt').val(),
            invst_min_rt:$('#invst_min_rt').val(),
            invst_max_rt:$('#invst_max_rt').val(),
            expt_rtn:$('#expt_rtn').val(),
            tgt_rtn:$('#tgt_rtn').val(),
            rmrk:$('#rmrk').val(),
            use_yn:$selectUseYn.val(),
            work_id:$('#user_id').val()
        }
        //유효성 검사 항목 지정
        fng.validator.config = {
            peer_cd: 'isNonEmpty', //필수
            peer_nm: 'isNonEmpty', //필수
            peer_depth: 'isNonEmpty' //필수
        };

        //유효성 검사
        fng.validator.validate(param);
        if (fng.validator.hasErrors()) {
            alert('* 가 표시되어있는 항목은 필수 항목입니다.');
            //fng.debug.log(fng.validator.messages.join('\n'));
            return;
        };

        if (confirm("저장하시겠습니까?") == true){    //확인
            if ($('.ac2').length == 1) {
                update(param);
            } else {
                create(param);
            }
        }else{   //취소
            return;
        }   
    });

    //삭제버튼 클릭,
    $('#btn_delete').click(function(){
        var deletelist=[],
            param;
        
        $('input:checked', 'table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(1).text());
        });

        param = {cust_cd:$selectCustCd.val(), peer_cd:deletelist.join("','")};
        if (confirm("삭제하시겠습니까?") == true){    //확인
            remove(param);            
        }else{   //취소
            return;
        } 
    });

    //clear
    function clear(){
        $('input.int_ty1').each(function(){
            $(this).val('');
        });
    }

    //조회
    function read(param){
        var grdOpt,
            ajaxSettings;

        function readSuccess(d){
            peerData = d;

            grdOpt = {
                selector:'#peerGrid',
                tableClass:'percd-1',
                selectable: true,
                header:[
                    [
                        {title:'유형명'},
                        {title:'유형코드'},
                        {title:'상위코드'},
                        {title:'유형단계'},
                        {title:'단위유형'},
                        {title:'BM코드'},
                        {title:'최소투자비중'},
                        {title:'최대투자비중'},
                        {title:'기대수익률'},
                        {title:'목표수익률'},
                        {title:'사용여부'}
                    ]
                ],
                body:[
                    {field:'PEER_NM', align:'left'},
                    {field:'PEER_CD'},
                    {field:'PARENT_PEER_CD'},
                    {field:'PEER_DEPTH'},
                    {field:'PEER_UNIT_YN'},
                    {field:'BM_CD',},
                    {field:'INVST_MIN_RT', align:'right'},
                    {field:'INVST_MAX_RT', align:'right'},
                    {field:'EXPT_RTN', align:'right'},
                    {field:'TGT_RTN', align:'right'},
                    {field:'USE_YN'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
                    target:'#peerGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //그리드에서 기금 클릭, 고객정보 데이터 삽입
                    $('#peerGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {
                            //$('input',this).prop('checked',!$('input',this).prop('checked'));
                            $('table>tbody>tr','#peerGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');

                            var len = peerData.length,
                                idx;
                            for(var i = 0; i < len; i++){
                                if (peerData[i].PEER_CD == $('td', this).eq(2).text()){
                                    idx = i;
                                    break;
                                }
                            }

                            if (i==len){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                            }

                            $('#peer_cd').val(peerData[i].PEER_CD);
                            $('#peer_nm').val(peerData[i].PEER_NM);
                            $('#peer_nm_eng').val(peerData[i].PEER_NM_ENG);
                            $('#parent_peer_cd').val(peerData[i].PARENT_PEER_CD);
                            $('#peer_depth').val(peerData[i].PEER_DEPTH);
                            $selectPeerUnitYn.val(peerData[i].PEER_UNIT_YN);
                            $('#bm_cd').val(peerData[i].BM_CD);
                            $('#invst_std_rt').val(peerData[i].INVST_STD_RT);
                            $('#invst_min_rt').val(peerData[i].INVST_MIN_RT);
                            $('#invst_max_rt').val(peerData[i].INVST_MAX_RT);
                            $('#expt_rtn').val(peerData[i].EXPT_RTN);
                            $('#tgt_rtn').val(peerData[i].TGT_RTN);
                            $('#rmrk').val(peerData[i].RMRK);
                            $selectUseYn.val(peerData[i].USE_YN);

                            //유형코드는는 수정불가
                            $('#peer_cd').attr('disabled', 'disabled');   //PK 고객번호는 수정불가
                            $('#peer_nm').focus();  //두번째 고객명에 포커싱
                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                    //그리드에서 체크박스 클릭
                    $('#peerGrid').off('click', 'table>tbody>tr>td>input').on('click', 'table>tbody>tr>td>input', function(e){
                        e.stopPropagation();    //기금 클릭 버블링 차단
                        //$('#btn_clearForNew').click();  //신규버튼 클릭, 클리어
                    });
                }
            }

            fng.grid(grdOpt);
        }

        function readError(data, status, err){
            fng.debug.log('readError:' + data.status + ',' + err);
        }

        function readDone(){
            $('#btn_clearForNew').click();
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_performance_code_read.asp',
            param: param,
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
            var param2 = {
                cust_cd:$selectCustCd.val(),
                peer_cd:$selectPeerCd.val()
            }
            read(param2);
            if (param.peer_depth == 0) $selectCustCd.change();
        }

        function createError(data, status, err){
        }

        function createDone(){
        }

        $('tbody', '#peerGrid').find('tr').each(function(){
            if(param.peer_cd === $(this).find('td').eq(2).text())
                isAlready = true;
        })

        $('option', '#selectPeerCd').each(function(){
            if(param.peer_cd === $(this).val())
                isAlready = true;  
        });

        if(isAlready) {
            alert('이미 등록된 유형분류입니다.');
            return;
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_performance_code_create.asp',
            param:param,
            success: createSuccess,
            error: createError,
            done: createDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    }

    //수정
    function update(param){
        var ajaxSettings;

        function updateSuccess(d){
            fng.debug.log(d);
            alert('저장되었습니다.');
            var param = {
                cust_cd:$selectCustCd.val(),
                peer_cd:$selectPeerCd.val()
            }
            read(param);
        }

        function updateError(data, status, err){
        }

        function updateDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_performance_code_update.asp',
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
            var param = {
                cust_cd:$selectCustCd.val(),
                peer_cd:$selectPeerCd.val()
            }
            read(param);
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_performance_code_delete.asp',
            param:param,
            success: removeSuccess,
            error: removeError,
            done: removeDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    }
});
