$(function(){
	var info = fng.fams.info,

               selectPeerCdOpt = {
                selector : '#selectPeerCd',
                url : fng.fams.path + '/portfolio_performance_monitoring_sub_opt_read.asp?cust_cd=XX901',
                data : {
                    PEER_NM : 'PEER_CD'
                },
                callback: function(){
                    /*
                    $('select', '#selectCustCd').change(function(){
                        $('#inputCustNm').val($(this).val());
                        fng.debug.log('read call');
                        read($(this).val());
                    }).change();*/
                }
            },
            $selectPeerCd;    

            $selectPeerCd = fng.selectbox(selectPeerCdOpt);

    //링크클릭 기본 이벤트 불능
    $('a', 'article').on('click', function(){
        return false;
    })

	//조회버튼 클릭
	$('#btn_read').click(function(){
        var param = {
            cust_cd: info.cust_cd,
            trd_dt: $('#trd_dt').val()
        }
        readFund(param);        
    });
    
	function readFund(param) {
		var grdOpt,
        ajaxSettings;
        $('#fundGrid').html('');
        $('#fundGridpagearea').remove();
        function readSuccess(d){
        	//fng.debug.log(d);
            grdOpt = {
                selector:'#fundGrid',
                tableClass:'permo-1',
                selectable: false,
                header:[
                    [
                        {title:'펀드구분'},
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'기준가'},
                        {title:'일수익률'},
                        {title:'BM초과'},
                        {title:'유형초과'},
                        {title:'이상유무'}
                    ]
                ],
                body:[
                    {field:'GUBN'},
                    {field:'CODE'},
                    {field:'NAME', align:'left'},
                    {field:'TYPE', align:'left'},
                    {field:'STD_PRC'},
                    {field:'D_MGN', align:'right'},
                    {field:'BM_MGN', align:'right'},
                    {field:'TYPE_MGN', align:'right'},
                    {field:'CHK_YN'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#fundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 2,
                    defaultOrd: 'asc'
                },
                callback: function(){
/*                    $('#fundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#fundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        //readData(param);
                    });
                    $('#fundGrid>table>tbody>tr:first').click();*/
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
            url: fng.fams.path + '/portfolio_performance_monitoring_main_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
	}


    function readData() {
        var param = {
            cust_cd:info.cust_cd,
        }
        var grdOpt,
        ajaxSettings;
        $('#dataGrid').html('');
        $('#dataGridpagearea').remove();
        function readSuccess(d){
            grdOpt = {
                selector:'#dataGrid',
                tableClass:'permo-2',
                selectable: true,
                key: 'PEER_CD',
                //headerVisible: false,
                header:[
                    [                 
                        {title:'펀드유형'},
                        {title:'일수익률(절대값)'},
                        {title:'BM초과(절대값)'},
                        {title:'유형초과(절대값)'}
                    ]
                ],
                body:[
                    {field:'PEER_NM'},
                    {field:'CHK_RT'},
                    {field:'BM_CHK_RT'},
                    {field:'PEER_CHK_RT'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#dataGridpagearea'
                },
                sort:{
                    sortable: false,
                    mode: 'single',
                    defaultIdx: 2,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    //header값 조정[추후 css로 수정]
                    $('table> thead > tr > th', '#dataGrid').width('23');

                    $('#dataGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#dataGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        $('select', '#selectPeerCd').val($(this).attr('data-key'));
                        $('select', '#selectPeerCd').change();
                        $("#d_rd_abs").val($(this).find('td:nth-child(3)').text());
                        $("#bm_rd_abs").val($(this).find('td:nth-child(4)').text());
                        $("#peer_rd_abs").val($(this).find('td:nth-child(5)').text());

                        //fng.debug.log($(this).attr('data-key') + "::" + $(this).find('td:nth-child(3)').text() + "::" + $(this).find('td:nth-child(4)').text() + "::" + $(this).find('td:nth-child(4)').text());
                    });
                }
            }

            fng.grid(grdOpt);

            //Header Visible False
            //$('#dataGrid > table > thead > tr').hide();

            //Option Select Setting
            /*
            var param = {
                cust_cd:'XX901' //info.cust_cd,
            };

            ajaxSettings = {
                url: fng.fams.path + '/portfolio_performance_monitoring_sub_opt_read.asp',
                param: param,
                success: function readOptSuccess(d){
                    for(var k = 0; k < d.length; k++){
                        $("#selectPeerCdOpt").append($("<option></option>").attr("value", d[k]["PEER_CD"]).text(d[k]["PEER_NM"]));
                    }
                },
                error: function readOptError(){
                },
                done: function readOptDone(){
                }
            }

            fng.ajax.getJson(ajaxSettings);
            */

            //<select name="selectPeerCd" id="selectPeerCd" class="sel_tdty"></select>
            //<select name="" id="" class="sel_tdty"><option value="">xxx</option><option value="">xxx</option></select>
/*            var selectPeerCdOpt = {
                selector : '#selectPeerCd',
                url : fng.fams.path + '/portfolio_performance_monitoring_sub_opt_read.asp?cust_cd=XX901',
                data : {
                    PEER_NM : 'PEER_CD'
                },
                callback: function(){
                    $('select', '#selectCustCd').change(function(){
                        $('#inputCustNm').val($(this).val());
                        fng.debug.log('read call');
                        read($(this).val());
                    }).change();
                }
            },
            $selectPeerCd;     
            $selectPeerCd = fng.selectbox(selectPeerCdOpt);*/
        }

        function readError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/portfolio_performance_monitoring_sub_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    function createData() {

        var pChkRt = $("#d_rd_abs").val();
        var pBmChkRt = $("#bm_rd_abs").val();
        var pPeerChkRt = $("#peer_rd_abs").val();
        ajaxSettings;


        if(pChkRt.length <= 0 || pBmChkRt.length <= 0 || pPeerChkRt.length <= 0){
            alert("(*)가 표시되어있는 항목은 필수 항목입니다.");
            return;
        } 

        if(numberChk(pChkRt) == false || numberChk(pBmChkRt) == false || numberChk(pPeerChkRt) == false){
            alert("숫자만 입력 가능합니다.");
            return;
        } 

        if(confirm("저장하시겠습니까?") == false) return;

        var param = {
            cust_cd:info.cust_cd,
            peer_cd: $('select', '#selectPeerCd').val(),
            chk_rt:pChkRt,
            bm_chk_rt:pBmChkRt,
            peer_chk_rt:pPeerChkRt
        };

        function createSuccess(d){
            //모니터링 데이터 다시 조회 
            $('#btn_read').click();
            //기준데이터 다시 조회 
            readData();

            //데이터 초기화 
            $("#d_rd_abs").val("");
            $("#bm_rd_abs").val("");
            $("#peer_rd_abs").val("");
        }

        function createError(){
        }

        function createDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_performance_monitoring_sub_create.asp',
            param: param,
            success: createSuccess, 
            error: createError,
            done: createDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    }    

    function deleteData(peerCdList) {
        
        var param = {
            cust_cd:info.cust_cd,
            peer_cd: peerCdList
        };

        ajaxSettings;

        if(confirm("삭제하시겠습니까?") == false) return;

        function deleteSuccess(d){
            //모니터링 데이터 다시 조회 
            $('#btn_read').click();
            //기준데이터 다시 조회 
            readData();

            //데이터 초기화 
            $("#d_rd_abs").val("");
            $("#bm_rd_abs").val("");
            $("#peer_rd_abs").val("");
        }

        function deleteError(){
        }

        function deleteDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_performance_monitoring_sub_delete.asp',
            param: param,
            success: deleteSuccess, 
            error: deleteError,
            done: deleteDone
        }

        fng.ajax.queryExecute(ajaxSettings);
    } 


    function readLatestDate() {
        
        var param = {
            type:'FD'
        };

        ajaxSettings;        

        function readSuccess(d){
            
            var latestDate = d[0]['LATEST_DT'];
            if(latestDate.length > 7){

                $('#trd_dt').val(latestDate);
            }
            //최초조회
            $('#btn_read').click();
        }

        function readError(){
            //최초조회
            $('#btn_read').click();
        }

        function readDone(){
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_fund_date.asp',
            param: param,
            success: readSuccess, 
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }      

    //신규 버튼 Click Event
    $('.btn_new').click(function(){
        //데이터 초기화 
        $("#d_rd_abs").val("");
        $("#bm_rd_abs").val("");
        $("#peer_rd_abs").val("");
    });

    //저장 버튼 Click Event 
    $('.btn_save').on('click', function(){
        createData();
    });

    //삭제버튼 Click Event
    $('.btn_del').on('click', function(){
        var peerCdList = "";
        $('#dataGrid > table > tbody tr').each(function(index){
            if($(this).find(">:first-child").find("input:checkbox:first").is(":checked") === true){
                //peerCdList = peerCdList + $(this).find('td:nth-child(2)').text() + "|";
                peerCdList = peerCdList + $(this).attr('data-key') + "|";
            }
        });

        if(peerCdList.length > 0){
            deleteData(peerCdList);
        }else{
            alert("선택한 펀드유형이 없습니다.");
        }
    });

    function numberChk(value){
        for(var i = 0; i < value.length; i++){
            if(value.charAt(i) == " ") return false;
            if(value.charAt(i) != "." && isNaN(value.charAt(i))) return false;
        }
        return true;
    };

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    fng.fams.date.init();
    //$('#trd_dt').val(fng.fams.date.today());   
    // fng.fams.date.current('#trd_dt',function(){
    //     $('#btn_read').click();
    // });

    //성과기준 조회
    readData();
})