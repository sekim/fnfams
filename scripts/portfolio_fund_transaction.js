$(function(){
	var info = fng.fams.info,
        selectUnitFOpt = {
            selector : '#selectUnitFund',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        selectUnitIOpt = {
            selector : '#selectUnitItem',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        selectGbOpt = {
            selector : '#selectGb',
            data : {
                '전체':0,
                '매수':1,
                '매도':2
            }
        },
        selectFundCd,
        $selectUnitFund,
        $selectUnitItem,
        $selectGb;

    $selectUnitFund = fng.selectbox(selectUnitFOpt);
    $selectUnitItem = fng.selectbox(selectUnitIOpt);
    $selectGb = fng.selectbox(selectGbOpt);

    //링크클릭 기본 이벤트 불능
    $('a', 'article').on('click', function(){
        return false;
    })

	//조회버튼 클릭
	$('#btn_read').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#trd_dt').val(),
            unit:$selectUnitFund.val()
        }
        readFund(param);        
    });

    //종목내역조회 버튼
    $('#btn_read_item').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            from_dt:$('#fr_dt').val(),
            to_dt:$('#to_dt').val(),
            div_unit:$('#selectUnitItem option:selected').val(),
            fund_cd:selectFundCd,
            type_cd:'',
            trd_gubn:$('#selectGb option:selected').val()
        }

        readGrid(param, 'st');
        readGrid(param, 'bd');
        readGrid(param, 'ch');
        readGrid(param, 'fo');
        readGrid(param, 'fd');
    });

    $('.tab').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#trd_dt').val()
        }
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tabdiv').hide();
        $('#' + $(this).attr('data-id') + 'Div').show();
        //readGrid(param, $(this).attr('data-id'));
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
                tableClass:'ftt-1',
                selectable: false,
                key: 'FUND_CD',
                //key: 'CODE',
                header:[
                    [
                        {title:'펀드구분'},
                        {title:'상위펀드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'기준가'},
                        {title:'설정액'},
                        {title:'순자산'},
                        {title:'채권비중'},
                        {title:'주식비중'},
                        {title:'현금성'},
                        {title:'기타비중'}
                    ]
                ],
                body:[
                    {field:'FUND_GB'},
                    {field:'FUND_CD_SS'},
                    {field:'FUND_NM'},
                    {field:'PEER_NM'},
                    {field:'STD_PRC'},
                    {field:'SET_AMT'},
                    {field:'NAV'},
                    {field:'BD_RT'},
                    {field:'ST_RT'},
                    {field:'CH_RT'},
                    {field:'ET_RT'}
                    /*
                   {field:'GUBN'},
                    {field:'U_NAME'},
                    {field:'NAME'},
                    {field:'TYPE'},
                    {field:'STD_PRC'},
                    {field:'SET_AMT'},
                    {field:'NAV'},
                    {field:'STK_EVAL'},
                    {field:'BND_EVAL'},
                    {field:'CSH_EVAL'},
                    {field:'ETC_EVAL'}*/
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
                    $('#fundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#fundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        selectFundCd = $(this).attr('data-key');
                        //readData($(this).attr('data-key'));
                        $('#btn_read_item').click();
                    });
                    $('#fundGrid>table>tbody>tr:first').click();
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
            url: fng.fams.path + '/portfolio_fund_list.asp',
            // url: fng.fams.path + '/portfolio_fund_transaction_fund_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
	}

	function readGrid(param, gb) {
        var grdOpt,
            ajaxSettings,
            gridNm = gb + 'Grid',
            pageNm = gridNm + 'pagearea',
            elmGrid,
            elmPage,
            tableClass = (gb=='st'?'b1-9-2':'b1-9-3'),
            header,
            body;

        param.type_cd = gb;

        elmGrid = $('#' + gridNm);
        elmPage = $('#' + pageNm);

        elmGrid.html('');
        elmPage.remove();

        if (gb === 'bd' || gb === 'ch') {
            header = [
                [
                    {title:(gb=='bd'?'채권유형':'상품유형')},
                    {title:'종목명'},
                    {title:'거래일'},
                    {title:'거래구분'},
                    {title:'거래단가'},
                    {title:'매매수량'},
                    {title:'매매금액'},
                    {title:'매매수익률'},
                    {title:'매매처'}
                ]
            ];
            body = [
                {field:'TYPE'},
                {field:'NAME'},
                {field:'STD_DT', type:'date'},
                {field:'TRD_GUBN'},
                {field:'TRD_AMT'},
                {field:'TRD_NUM'},
                {field:'SET_AMT'},
                {field:'TRD_MGN'},
                {field:'COR_NM'}
            ];
        }else{
            header = [
                [
                    {title:(gb=='st'?'시장구분':'상품유형')},
                    {title:'종목명'},
                    {title:'거래일'},
                    {title:'거래구분'},
                    {title:(gb=='st'?'매매주수':'거래단가')},
                    {title:'매매수량'},
                    {title:'매매금액'},
                    {title:'매매처'}
                ]
            ];
            body = [
                {field:'TYPE'},
                {field:'NAME'},
                {field:'STD_DT', type:'date'},
                {field:'TRD_GUBN'},
                {field:'TRD_AMT'},
                {field:'TRD_NUM'},
                {field:'SET_AMT'},
                {field:'COR_NM'}
            ];
        }

        function readSuccess(d){
            //fng.debug.log(d);
            grdOpt = {
                selector:'#' + gridNm,
                tableClass:tableClass,
                selectable: false,
                header:header,
                body:body,
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#' + pageNm
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 2,
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
            url: fng.fams.path + '/portfolio_fund_transaction_data_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    fng.fams.date.init();
    // fng.fams.date.current('#to_dt',function(){
    //     $('#fr_dt').val(fng.fams.date.diff($('#to_dt').val(), -1, 'm'));
    // });

    // fng.fams.date.current('#trd_dt',function(){
    //     $('#btn_read').click();
    // });
})