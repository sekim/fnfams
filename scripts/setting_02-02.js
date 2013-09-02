$(function(){
    var $selectCustCd,
    selectCustCdOpt = {
        selector : '#selectCustCd',
        url : fng.fams.path + '/setting_01-01_read.asp',
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
                    url : fng.fams.path + '/setting_02-02_peer_read.asp?cust_cd=' + cust_cd,
                    data : {
                        PEER_NM : 'PEER_CD'
                    },
                    callback: function(){
                        $('select', '#selectPeerCd').change(function(){
                            $('#inputPeerNm').val($(this).val());
                            if($(this).val().substr(0,2) === 'AA') {
                                $('#fst_std_dt').prop('disabled', false);
                            } else {
                                $('#fst_std_dt').prop('disabled', true);
                            }
                        }).change();
                        $('#btn_read').click();
                    }
                };
                $selectPeerCd = fng.selectbox(selectPeerCdOpt);
            }).change();
        }
    };

    $selectCustCd = fng.selectbox(selectCustCdOpt);

    $('a', 'article').on('click', function(){
        return false;
    })

    $('#btn_read').click(function(){
        var param = {
            cust_cd:$selectCustCd.val(),
            peer_cd:$selectPeerCd.val()
        }
        readFundInPeer(param);
        readFundOutPeer(param);
    });

    $('#btn_delete').click(function(){
        if($('input:checked', '#fundInPeerGrid > table').length == 0) {
            alert('삭제할 펀드를 선택해 주세요.');
            return false;
        }

        var deletelist=[],
        param;

        $('input:checked', '#fundInPeerGrid > table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(2).text());
        });

        param = {
            cust_cd:$selectCustCd.val(),
            fund_cd:deletelist.join("','")
        };

        if (confirm("삭제하시겠습니까?") == true){    //확인          
            remove(param);            
        }else{   //취소
            return false;
        }
        return false;
    });

    //    //저장버튼 클릭,
    $('#btn_save').click(function(e){
        if($('input:checked', '#fundOutPeerGrid > table').length == 0) {
            alert('등록할 펀드를 선택해 주세요.');
            return false;
        }

        if($selectPeerCd.val().substr(0,2) === 'AA' && $('#fst_std_dt').val().length !== 8) {
            alert('대표 유형분류로 등록하려면 최초설정일이 필요합니다.');
            return false;
        }

        var deletelist=[],
        param;

        $('input:checked', '#fundOutPeerGrid > table').each(function(){          
            deletelist.push($(this).parent().siblings().eq(0).text());
        });

        param = {
            cust_cd:$selectCustCd.val(),
            fund_cd:deletelist.join("','"),
            peer_cd:$selectPeerCd.val(),
            fr_dt:$('#fst_std_dt').val()
        };

        if (confirm("등록하시겠습니까?") == true){    //확인          
            create(param);            
        }else{   //취소
            return false;
        }
        return false;      
    });

    //조회 유형분류내 펀드목록
    function readFundInPeer(param){
        var grdOpt,
        ajaxSettings;
        $('#fundInPeerGrid').html('');
        $('#fundInPeerGridpagearea').remove();
        function readSuccess(d){
            grdOpt = {
                selector:'#fundInPeerGrid',
                tableClass:'s2-3-1',
                selectable: true,
                header:[
                    [
                        {title:'유형분류'},
                        {title:'유형분류코드'},
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'최초투자일'},
                        {title:'운용사'}
                    ]
                ],
                body:[
                    {field:'PEER_NM'},
                    {field:'PEER_CD'},
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'FST_TRD_DT'},
                    {field:'CO_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#fundInPeerGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                }
            }

            fng.grid(grdOpt);
        }

        function readError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_02-02_fund_in_peer_read.asp?cust_cd=' + $selectCustCd.val() + '&peer_cd=' + $selectPeerCd.val(),
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    //조회 유형분류외 펀드목록
    function readFundOutPeer(param){
        var grdOpt,
        ajaxSettings;
        $('#fundOutPeerGrid').html('');
        $('#fundOutPeerGridpagearea').remove();
        function readSuccess(d){
            grdOpt = {
            selector:'#fundOutPeerGrid',
            tableClass:'s2-3-2',
            selectable: true,
            header:[
                [
                    //{title:'유형분류'},
                    //{title:'유형분류코드'},
                    {title:'펀드코드'},
                    {title:'펀드명'},
                    {title:'최초투자일'},
                    {title:'운용사'}
                ]
            ],
            body:[
                //{field:'PEER_NM'},
                //{field:'PEER_CD'},
                {field:'FUND_CD'},
                {field:'FUND_NM'},
                {field:'FST_TRD_DT'},
                {field:'CO_NM'}
            ],
            data:d,
            page:{
                curPage:1,
                line:5,
                target:'#fundOutPeerGridpagearea'
            },
            sort:{
                sortable: true,
                mode: 'single',
                defaultIdx: 1,
                defaultOrd: 'asc'
            },
            callback: function(){
            }
            }

            fng.grid(grdOpt);
        }

        function readError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/setting_02-02_fund_out_peer_read.asp?cust_cd=' + $selectCustCd.val() + '&peer_cd=' + $selectPeerCd.val(),
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    //    //수정
    function create(param){
           var ajaxSettings;

           function createSuccess(d){
            fng.debug.log(d);
               alert('저장되었습니다.');
                $('#btn_read').click();
           }

           function createError(data, status, err){
             fng.debug.log(data.status).log(err);
           }

           function createDone(){
           }

           ajaxSettings = {
               url: fng.fams.path + '/setting_02-02_fund_in_peer_create.asp',
               param:param,
               success: createSuccess,
               error: createError,
               done: createDone
           }

           fng.ajax.queryExecute(ajaxSettings);
    }

    //delete
    function remove(param){
       var ajaxSettings;

        function removeSuccess(d){
            fng.debug.log(d);
            alert('삭제되었습니다.');
            $('#btn_read').click();
        }

        function removeError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function removeDone(){
        }

       ajaxSettings = {
           url: fng.fams.path + '/setting_02-02_fund_in_peer_delete.asp',
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