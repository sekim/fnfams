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
            trd_dt:$('#tr_dt').val()
        }
        readFund(param);        
    });

    //종목내역조회 버튼
    $('#btn_read_item').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#tr_dt').val()
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
                tableClass:'b1-9-1',
                selectable: false,
                header:[
                    [
                        {title:'펀드구분'},
                        {title:'상위펀드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'기준가'},
                        {title:'설정액'},
                        {title:'순자산'},
                        {title:'주식비중'},
                        {title:'채권비중'},
                        {title:'현금성비중'},
                        {title:'기타비중'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'STD_PRC'},
                    {field:'RT'},
                    {field:'SET_AMT'},
                    {field:'NAV'},
                    {field:'INVST_AMT'},
                    {field:'INVST_AMT'},
                    {field:'INVST_AMT'},
                    {field:'INVST_AMT'},
                    {field:'INVST_AMT'}
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
            url: fng.fams.path + '/portfolio_01-01_read_fund_parent.asp',
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
            tableClass = (gb=='st'?'b1-9-2':'b1-9-3');

        elmGrid = $('#' + gridNm);
        elmPage = $('#' + pageNm);

        elmGrid.html('');
        elmPage.remove();

        function readSuccess(d){
            //fng.debug.log(d);
            grdOpt = {
                selector:'#' + gridNm,
                tableClass:tableClass,
                selectable: false,
                header:[
                    [
                        {title:(gb=='st'?'시장구분':(gb=='bd'?'채권유형':'상품유형'))},
                        {title:'종목명'},
                        {title:'거래일'},
                        {title:'거래구분'},
                        {title:(gb=='st'?'매매주수':'거래단가')},
                        {title:'매매금액'},
                        {title:'매매수익률'},
                        {title:'매매처'}
                    ]
                ],
                body:[
                    {field:'MKT_GB'},
                    {field:'ITEMNM'},
                    {field:'TRD_DT'},
                    {field:'GGB'},
                    {field:'AMT'},
                    {field:'PRC'},
                    {field:'RT'},
                    {field:'PLC'}
                ],
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
            url: fng.fams.path + '/portfolio_01-01_read_fund_parent.asp',
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
    $('#fr_dt').val(fng.fams.today(-1, 'm'));
    $('#to_dt').val(fng.fams.today());
    //최초조회
    $('#btn_read').click();
})