$(function(){
	var info = fng.fams.info,
        selectUnitOpt = {
            selector : '#selectUnit',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        $selectUnit;

    $selectUnit = fng.selectbox(selectUnitOpt);

    //링크클릭 기본 이벤트 불능
    $('a', 'article').on('click', function(){
        return false;
    })

	//조회버튼 클릭
	$('#btn_read').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#to_dt').val()
        }
        readParentFund(param);
        //readChildFund(param);
    });

	function readParentFund(param) {
		var grdOpt,
        ajaxSettings;
        $('#pFundGrid').html('');
        $('#pFundGridpagearea').remove();

        function readSuccess(d){
        	fng.debug.log('::' + d);
            grdOpt = {
                selector:'#pFundGrid',
                selectable: false,
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
                    target:'#pFundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    $('#pFundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#pFundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        chartPfund(param);
                        readChildFund(param);
                    });
                    $('#pFundGrid>table>tbody>tr:first').click();
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

    function readChildFund(param) {
        var grdOpt,
        ajaxSettings;
        $('#cFundGrid').html('');
        $('#cFundGridpagearea').remove();

        function readSuccess(d){
            fng.debug.log('::' + d);
            grdOpt = {
                selector:'#cFundGrid',
                selectable: false,
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:10,
                    target:'#cFundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 1,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    $('#cFundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#cFundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        chartCfund(param);
                    });
                    $('#cFundGrid>table>tbody>tr:first').click();
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

    function chartPfund(param){
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
                    type : 'line',
                    lineThickness : 2,
                    dashLength : '1',
                    bullet : 'round',
                    fillAlphas : 0
                },
                {
                    title : 'Expenses',
                    field : 'expenses',
                    type : 'line',
                    dashLength : '2',
                    lineThickness : 2,
                    bullet : 'bubble',
                    fillAlphas : 0
                }
            ];
        
        var id = 'chartPfund';
        $('#' + id).show();

        fng.chart({selector: '#' + id,
                chartData: chartData,
                categoryField: 'year',
                graph: graphOpt,
                legendMarginLeft: 100
                //grid: '#' + id + 'datagrid',
                //layer: '#' + id + 'Layer',
                //layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]
            });  
    }

    function chartCfund(param){
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
        
        var id = 'chartCfund';
        $('#' + id).show();

        fng.chart({selector: '#' + id,
                chartData: chartData,
                categoryField: 'year',
                graph: graphOpt,
                legendMarginLeft: 100
                // grid: '#' + id + 'datagrid',
                // layer: '#' + id + 'Layer',
                // layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]
            });  
    }

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();

    $('#fr_dt').val(fng.fams.today(-1,'m'));
    $('#to_dt').val(fng.fams.today());
    //최초조회
    $('#btn_read').click();
})