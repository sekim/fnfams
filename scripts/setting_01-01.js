$(function(){
    var custData,
        selectUseYnOpt = {
            selector : '#use_yn',
            data : {
                'Y':'Y',
                'N':'N'
            }
        },
        $selectUseYn;
    
    $selectUseYn = fng.selectbox(selectUseYnOpt);

    //신규버튼 클릭, 인풋요소 클리어.
    $('#btn_clearForNew').click(function() {
        clear();
        //첫번째 인풋박스 포커싱.
        $('.ac2').removeClass('ac2');
        $('#cust_cd').removeAttr('disabled').focus();
        return false;
    });

    //저장버튼 클릭,
    $('#btn_save').click(function(e){
        var param = {
            cust_cd:$('#cust_cd').val(),
            cust_nm:$('#cust_nm').val(),
            cust_snm:$('#cust_snm').val(),
            cust_gb:$('#cust_gb').val(),
            co_cd:$('#co_cd').val(),
            rmrk:$('#rmrk').val(),
            use_yn:$selectUseYn.val(),
            work_id:$('#user_id').val()
        }
        //유효성 검사 항목 지정
        fng.validator.config = {
            cust_cd: 'isNonEmpty', //필수
            cust_nm: 'isNonEmpty', //필수
            cust_gb: 'isNonEmpty' //필수
        };

        //유효성 검사
        fng.validator.validate(param);
        if (fng.validator.hasErrors()) {
            alert('* 가 표시되어있는 항목은 필수 항목입니다.');
            //fng.debug.log(fng.validator.messages.join('\n'));
            return false;
        };

        if (confirm("저장하시겠습니까?") == true){    //확인
            if ($('#cust_cd').attr('disabled')) {
                update(param);
                return false;
            } else {
                create(param);
                return false;
            }
        }else{   //취소
            return false;
        }
        $('#btn_clearForNew').click();      
    });

    //삭제버튼 클릭,
    $('#btn_delete').click(function(){
        var deletelist=[],
            param;
        if ($('input:checked', 'table').length <= 0) {
            alert('삭제할 항목을 체크해 주십시오.');
            return false;
        }
        $('input:checked', 'table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(0).text());
        });

        param = {cust_cd:deletelist.join("','")};
        if (confirm("삭제하시겠습니까?") == true){    //확인
            remove(param);            
            return false;
        }else{   //취소
            return false;
        } 
    });

    //clear
    function clear(){
        $('input.int_ty1').each(function(){
            $(this).val('');
        });
    }

    //조회
    function read(){
        var grdOpt,
            ajaxSettings;

        function readSuccess(d){
            custData = d;

            grdOpt = {
                selector:'#custGrid',
                tableClass:'s1-1-1',
                selectable: true,
                header:[
                    [
                        {title:'고객번호'},
                        {title:'고객명(전체)'},
                        {title:'고객명(약어)'},
                        {title:'고객구분'},
                        {title:'법인코드'},
                        {title:'비고'},
                        {title:'사용여부'}
                    ]
                ],
                body:[
                    {field:'CUST_CD'},
                    {field:'CUST_NM'},
                    {field:'CUST_SNM'},
                    {field:'CUST_GB'},
                    {field:'CO_CD'},
                    {field:'RMRK'},
                    {field:'USE_YN'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
                    target:'#custGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //그리드에서 기금 클릭, 고객정보 데이터 삽입
                    $('#custGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        if($('td', this).eq(1).text()) {
                            //$('input',this).prop('checked',!$('input',this).prop('checked'));
                            $('table>tbody>tr','#custGrid').removeClass('ac').removeClass('ac2');
                            $(this).addClass('ac2');

                            var len = custData.length,
                                idx;
                            for(var i = 0; i < len; i++){
                                if (custData[i].CUST_CD == $('td', this).eq(1).text()){
                                    idx = i;
                                    break;
                                }
                            }

                            if (i==len){
                                fng.debug.log('데이터와 그리드가 일치하지 않습니다.');
                            }

                            $('#cust_cd').val(custData[i].CUST_CD);
                            $('#cust_nm').val(custData[i].CUST_NM);
                            $('#cust_snm').val(custData[i].CUST_SNM);
                            $('#cust_gb').val(custData[i].CUST_GB);
                            $('#co_cd').val(custData[i].CO_CD);
                            $('#rmrk').val(custData[i].RMRK);
                            $selectUseYn.val(custData[i].USE_YN);
                            //$('#cust_cd').prop('disabled', true);   //PK 고객번호는 수정불가
                            $('#cust_cd').attr('disabled', 'disabled');   //PK 고객번호는 수정불가
                            $('#cust_nm').focus();  //두번째 고객명에 포커싱
                        } else {
                            $('#btn_clearForNew').click();  //빈줄 클릭시 신규버튼클릭, 클리어
                        }
                    });
                    //그리드에서 체크박스 클릭
                    $('#custGrid').off('click', 'table>tbody>tr>td>input').on('click', 'table>tbody>tr>td>input', function(e){
                        e.stopPropagation();    //기금 클릭 버블링 차단
                        //$('#btn_clearForNew').click();  //신규버튼 클릭, 클리어
                    });
                }
            }

            fng.grid(grdOpt);
        }

        function readError(data, status, err){
        }

        function readDone(){
            $('#btn_clearForNew').click();
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-01_read.asp',
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
            read();
        }

        function createError(data, status, err){
        }

        function createDone(){
        }

        $('tbody', '#custGrid').find('tr').each(function(){
            if(param.cust_cd === $(this).find('td').eq(1).text())
                isAlready = true;
        })

        if(isAlready) {
            alert('이미 등록된 고객번호입니다.');
            return;
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-01_create.asp',
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
            read();
        }

        function updateError(data, status, err){
        }

        function updateDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-01_update.asp',
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
            read();
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_01-01_delete.asp',
            param:param,
            success: removeSuccess,
            error: removeError,
            done: removeDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    }    

    //최초 로딩시 조회한다.
    read();

    //fams전용 필요한 공통 호출
    //문자열 길이 검사
    fng.fams.checkLength('#cust_gb',1,'고객구분은 1글자 입니다.'); //고객구분 체크
    fng.fams.checkLength('#co_cd',5,'법인코드는 5글자 입니다.');   //법인코드 체크
});
