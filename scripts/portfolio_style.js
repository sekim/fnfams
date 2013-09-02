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
            trd_dt:$('#trd_dt').val().replace(/-/g,''),
            unit:$selectUnitFund.val()
        }
        readFund(param);        
    });

    //종목내역조회 버튼
    function readData(fund_cd){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#trd_dt').val().replace(/-/g,''),
            fund_cd:fund_cd,
            unit:$selectUnitFund.val()
        }
        readBondChart(param);
        readStockChart(param);
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
                tableClass:'stksec-1',
                selectable: false,
                key: 'FUND_CD',
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
                        {title:'현금성'},
                        {title:'기타비중'}
                    ]
                ],
                body:[
                    {field:'FUND_GB'},
                    {field:'FUND_CD_SS', align:'left'},
                    {field:'FUND_NM', align:'left'},
                    {field:'PEER_NM', align:'left'},
                    {field:'STD_PRC', align:'right', type:'number'},
                    {field:'SET_AMT', align:'right', type:'number'},
                    {field:'NAV', align:'right', type:'number'},
                    {field:'ST_RT', align:'right', type:'number'},
                    {field:'BD_RT', align:'right', type:'number'},
                    {field:'CH_RT', align:'right', type:'number'},
                    {field:'ET_RT', align:'right', type:'number'}
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
                    defaultOrd: 'asc'
                },
                callback: function(){
                    $('#fundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#fundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        readData($(this).attr('data-key'));
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
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
	}

    function readBondChart(param){

        function readSuccess(d) {
            // for (var i = 0; i < d.length; i++) {
            //     d[i].CNT = parseInt(d[i].CNT, 10);
            // }

            var XaxisGuide = [
                    { val:1, label:'단기'},
                    { val:2, label:'중기'},
                    { val:3, label:'장기'},
                ],
                YaxisGuide = [
                    { val:1, label:'하'},
                    { val:2, label:'중'},
                    { val:3, label:'상'},
                ];

            var graphOpt = [
                    {
                        title : '비중',
                        field : 'CNT',
                        xField : "BOND_DUR_GB",   //버블 차트는 x, y 축 설정 필요 
                        yField : "BOND_CREDIT_GB",
                        bullet : 'round',
                        lineThickness : 0,
                        lineColor : '#6799FF',
                        legend : false
                    }
                ];
            
            var id = 'bondStyleChart';
            
            fng.chart({
                selector: '#' + id,
                type: 'xychart',
                chartData: d,
                categoryField: 'year',
                graph: graphOpt,
                legendMarginLeft: 200,
                guideLine: true,
                scrollbar: true,
                XaxisGuide:XaxisGuide,
                YaxisGuide:YaxisGuide
                // grid: '#' + id + 'datagrid',
                // layer: '#' + id + 'Layer',
                // layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]
            });
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_style_bond_chart.asp',
            param: param,
            success: readSuccess,
            error: function(){
                fng.debug.log('fail');
            }
        }

        fng.ajax.getJson(ajaxSettings);
    }

    function readStockChart(param){

        function readSuccess(d) {
            // var data = []
            // for (var i = 0; i < d.length; i++) {
            //     d[i].CNT = parseInt(d[i].CNT, 10);
            // }

            var XaxisGuide = [
                    { val:1, label:'Value'},
                    { val:2, label:'Blend'},
                    { val:3, label:'Growth'}
                ],
                YaxisGuide = [
                    { val:1, label:'소형'},
                    { val:2, label:'중형'},
                    { val:3, label:'멀티캡'},
                    { val:4, label:'대형'}
                ];


            var graphOpt = [
                    {
                        title : '비중',
                        field : 'CNT',
                        xField : "STK_VAL_GB",   //버블 차트는 x, y 축 설정 필요 
                        yField : "STK_SIZE_GB",
                        bullet : 'round',
                        lineThickness : 0,
                        lineColor : '#FF8224',
                        legend : false
                    }
                ];
            
            var id = 'stockStyleChart';
            
            fng.chart({
                selector: '#' + id,
                type: 'xychart',
                chartData: d,
                categoryField: 'year',
                graph: graphOpt,
                legendMarginLeft: 200,
                guideLine: true,
                scrollbar: true,
                axisTitle:['신용평점', '듀레이션'],
                XaxisGuide:XaxisGuide,
                YaxisGuide:YaxisGuide
                // grid: '#' + id + 'datagrid',
                // layer: '#' + id + 'Layer',
                // layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]
            });
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_style_stock_chart.asp',
            param: param,
            success: readSuccess,
            error: function(){
                fng.debug.log('fail');
            }
        }

        fng.ajax.getJson(ajaxSettings);
    }

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    fng.fams.date.init();
})