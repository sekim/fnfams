$(function(){
	var info = fng.fams.info,
        selectUnitFOpt = {
            selector : '#selectUnitFund',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        $selectUnitFund;

    $selectUnitFund = fng.selectbox(selectUnitFOpt);

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

    $('.tab').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#trd_dt').val()
        }
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tabdiv').hide();
        $('#' + $(this).attr('data-id') + 'Div').show();
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
                tableClass:'b2-2-1',
                selectable: false,
                header:[
                    [
                        {title:'펀드구분'},
                        {title:'상위펀드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'기준가'},
                        {title:'설정액'},
                        {title:'평가금액'},
                        {title:'주식비중'},
                        {title:'채권비중'},
                        {title:'현금성'},
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
                        var param = {
                            cust_cd:info.cust_cd,
                            trd_dt:$('#trd_dt').val()
                        }
                        readData(param);
                        readChart(param);
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

	function readData(param) {
        var grdOpt,
        ajaxSettings;
        $('#grid').html('');
        $('#gridpagearea').remove();
        function readSuccess(d){
            grdOpt = {
                selector:'#grid',
                divClass:'b2-2-2',
                selectable: false,
                header:[
                    [
                        {title:'채권구분'},
                        {title:'AAA금액'},
                        {title:'AAA비중'},
                        {title:'AA금액'},
                        {title:'AA비중'},
                        {title:'A금액'},
                        {title:'A비중'},
                        {title:'BBB금액'},
                        {title:'BBB비중'},
                        {title:'기타 금액'},
                        {title:'기타 비중'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'STD_PRC'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'},
                    {field:'RT'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
                    target:'#gridpagearea'
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
            url: fng.fams.path + '/portfolio_01-01_read_fund_parent.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    function readChart(param){
        //chartData json으로 받아오기 추가해야함.
        var chartData = [
                {year:2005,income:23.5,expenses:28.1}, 
                {year:2006,income:26.2,expenses:32.8},
                {year:2007,income:33.1,expenses:36.9},
                {year:2008,income:29.5,expenses:31.1},
                {year:2009,income:24.6,expenses:27.0}
            ];

        var graphOpt = [
                {
                    title : 'Income',
                    field : 'income',
                    type : 'column',
                    lineThickness : 2,
                    dashLength : '1',
                    fillAlphas : 1
                },
                {
                    title : 'Expenses',
                    field : 'expenses',
                    type : 'column',
                    dashLength : '2',
                    lineThickness : 2,
                    fillAlphas : 1
                }
            ];
        
        var id = 'chart';
        $('#' + id).show();
        
        if ($('.tab[data-id="grid"]').hasClass('active')) {
            $('#chartDiv').show();
        }

        fng.chart({selector: '#' + id,
            chartData: chartData,
            categoryField: 'year',
            graph: graphOpt,
            legendMarginLeft: 100
            // grid: '#' + id + 'datagrid',
            // layer: '#' + id + 'Layer',
            // layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]
        });

        if ($('.tab[data-id="grid"]').hasClass('active')) {
            $('#chartDiv').hide();
        }
    }

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    $('#trd_dt').val(fng.fams.today(-1, 'm'));
    //최초조회
    $('#btn_read').click();
})