$(function(){
	var info = fng.fams.info,
        selectUnitFOpt = {
            selector : '#selectUnitFund',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        // selectUnitIOpt = {
        //     selector : '#selectUnitItem',
        //     data : {
        //         '백만원':1000000,
        //         '억원':100000000
        //     }
        // },
        // selectGbOpt = {
        //     selector : '#selectGb',
        //     data : {
        //         '전체':0,
        //         '매수':1,
        //         '매도':2
        //     }
        // },
        $selectUnitFund,
        // $selectUnitItem,
        // $selectGb;
        selectFundCd;

    $selectUnitFund = fng.selectbox(selectUnitFOpt);
    // $selectUnitItem = fng.selectbox(selectUnitIOpt);
    // $selectGb = fng.selectbox(selectGbOpt);

    //링크클릭 기본 이벤트 불능
    $('a', 'article').on('click', function(){
        return false;
    })

	//조회버튼 클릭
	$('#btn_read').click(function(){
        var param = {
            cust_cd: info.cust_cd,
            trd_dt:$('#trd_dt').val(),
            unit:$selectUnitFund.val()
        }
        readFund(param);        
    });

    //종목내역조회 버튼
    function readAllGrid(){
        var param = {
            cust_cd: info.cust_cd,
            trd_dt:$('#trd_dt').val(),
            div_unit:$selectUnitFund.val(),
            fund_cd:selectFundCd,
            type_cd:''
        }

        readGrid(param, 'st');
        readGrid(param, 'bd');
        readGrid(param, 'ch');
        readGrid(param, 'fo');
        readGrid(param, 'fd');
    }


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
                tableClass:'fpt-1',
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
                    {field:'FUND_NM', align:'left'},
                    {field:'PEER_NM', align:'left'},
                    {field:'STD_PRC'},
                    {field:'SET_AMT', align:'right'},
                    {field:'NAV', align:'right'},
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
                    line:10,
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
                        readAllGrid();
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
            //url: fng.fams.path + '/portfolio_fund_portfolio_fund_read.asp',
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
            tableClass = (gb=='st'?'fpt-2':'fpt-3'),
            header,
            body;

        param.type_cd = gb;

        elmGrid = $('#' + gridNm);
        elmPage = $('#' + pageNm);

        elmGrid.html('');
        elmPage.remove();

        if (gb === 'st') {
            header = [
                [
                    {title:'시장구분'},
                    {title:'종목명'},
                    {title:'보유주수'},
                    {title:'평가액'},
                    {title:'비중'},
                    {title:'취득액'},
                    {title:'평가손익'}
                ]
            ];
            body = [
                {field:'ASSET_GRP_NM'},
                {field:'ITEM_NM', align:'left'},
                {field:'PAR_VAL', align:'right'},
                {field:'MKT_EVL_AMT', align:'right'},
                {field:'WGT_ASSET', align:'right'},
                {field:'BUY_AMT', align:'right'},
                {field:'EVL_AMT', align:'right'}
            ];
        } else if (gb === 'bd') {
            header = [
                [
                    {title:'채권유형'},
                    {title:'종목명'},
                    {title:'보유수량'},
                    {title:'평가액'},
                    {title:'비중'},
                    {title:'장부가액'},
                    {title:'평가손익'},
                    {title:'발행일'},
                    {title:'만기일'},
                    {title:'듀레이션'}
                ]
            ];
            body = [
                {field:'ASSET_GRP_NM'},
                {field:'ITEM_NM'},
                {field:'PAR_VAL'},
                {field:'MKT_EVL_AMT'},
                {field:'WGT_ASSET'},
                {field:'BOOK_AMT'},
                {field:'EVAL_PL_AMT'},
                {field:'IS_DT'},
                {field:'MA_DT'},
                {field:'ADJ_DUR'}
            ];
        } else if (gb === 'ch') {
            header = [
                [
                    {title:'상품유형'},
                    {title:'종목명'},                    
                    {title:'포지션'},
                    {title:'보유수량'},
                    {title:'평가액'},
                    {title:'비중'},
                    {title:'장부가액'},
                    {title:'취득가액'},
                    {title:'평가손익'},
                    {title:'만기일'},
                    {title:'듀레이션'}
                ]
            ];
            body = [
                {field:'ASSET_GRP_NM'},
                {field:'ITEM_NM'},
                {field:'POS_GB'},
                {field:'PAR_VAL'},
                {field:'MKT_EVL_AMT'},
                {field:'WGT_ASSET'},
                {field:'BOOK_AMT'},
                {field:'BUY_AMT'},
                {field:'EVAL_PL_AMT'},
                {field:'MA_DT'},
                {field:'ADJ_DUR'}

            ];
        } else if (gb === 'fo') {
            header = [
                [
                    {title:'상품구분'},
                    {title:'종목명'},
                    {title:'포지션'},                    
                    {title:'보유수량'},
                    {title:'평가액'},
                    {title:'비중'},
                    {title:'평가손익'},
                    {title:'만기일'},
                    {title:'듀레이션'}
                ]
            ];
            body = [
                {field:'ASSET_GRP_NM'},
                {field:'ITEM_NM'},
                {field:'POS_GB'},                
                {field:'PAR_VAL'},
                {field:'MKT_EVL_AMT'},
                {field:'WGT_ASSET'},
                {field:'EVAL_PL_AMT'},
                {field:'MA_DT'},
                {field:'ADJ_DUR'}
            ];
        } else if (gb === 'fd') {
            header = [
                [
                    {title:'펀드유형'},
                    {title:'펀드명'},
                    {title:'보유수량'},
                    {title:'평가액'},
                    {title:'비중'},
                    {title:'취득액'},
                    {title:'평가손익'},
                    {title:'운용사'}
                ]
            ];
            body = [
                {field:'ASSET_GRP_NM'},
                {field:'ITEM_NM'},
                {field:'PAR_VAL'},
                {field:'MKT_EVL_AMT'},
                {field:'WGT_ASSET'},
                {field:'BUY_AMT'},
                {field:'EVAL_PL_AMT'},
                {field:'CO_NM'}
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
            url: fng.fams.path + '/portfolio_fund_portfolio_data_read.asp',
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
    // fng.fams.date.current('#trd_dt',function(){
    //     $('#btn_read').click();
    // });
})