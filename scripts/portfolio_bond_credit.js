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
            trd_dt:$('#trd_dt').val(),
            unit:$selectUnitFund.val()
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
                tableClass:'bdcredit-1',
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
                        {title:'채권비중'},
                        {title:'주식비중'},
                        {title:'현금성'},
                        {title:'기타비중'}
                    ]
                ],
                body:[
                    {field:'FUND_GB'},
                    {field:'FUND_CD_SS', align:'left'},
                    {field:'FUND_NM', align:'left'},
                    {field:'PEER_NM', align:'left'},
                    {field:'STD_PRC', align:'right'},
                    {field:'SET_AMT', align:'right'},
                    {field:'NAV', align:'right'},
                    {field:'BD_RT', align:'right'},
                    {field:'ST_RT', align:'right'},
                    {field:'CH_RT', align:'right'},
                    {field:'ET_RT', align:'right'}
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
                    defaultOrd: 'asc'
                },
                callback: function(){
                    $('#fundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#fundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                        var dataKey = $(this).attr('data-key');
                        if(dataKey.length <= 0){
                            dataKey = 'X';
                        }
                        var param = { 
                            cust_cd:info.cust_cd,
                            trd_dt:$('#trd_dt').val(),
                            fund_cd:dataKey,
                            div_unit:$selectUnitFund.val()
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
            url: fng.fams.path + '/portfolio_fund_list.asp',
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
                divClass:'bdcredit-2',
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
                    {field:'BOND_GUBN'},
                    {field:'AAA_AMT', align:'right'},
                    {field:'AAA_WGT', align:'right'},
                    {field:'AA_AMT', align:'right'},
                    {field:'AA_WGT', align:'right'},
                    {field:'A_AMT', align:'right'},
                    {field:'A_WGT', align:'right'},
                    {field:'BBB_AMT', align:'right'},
                    {field:'BBB_WGT', align:'right'},
                    {field:'ETC_AMT', align:'right'},
                    {field:'ETC_WGT', align:'right'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:6,
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
            url: fng.fams.path + '/portfolio_bond_credit_data_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    function readChart(param){
        //chartData json으로 받아오기 추가해야함.
        ajaxSettings;

        function readSuccess(d){
            var chartData = [];
            for(var i = 0; i < d.length; i++){
                chartData.push({xasix:d[i]['CREDIT_NM'], yasix:parseInt(d[i]['AMT'])});
            }

            var graphOpt = [
                {
                    title : '기간',
                    field : 'yasix',
                    type : 'column',
                    lineThickness : 2,
                    dashLength : '1',
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
                categoryField: 'xasix',
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
        
        function readError(data, status, err){
            fng.debug.log(data.status).log(err);
        }

        function readDone(){
        }

        ajaxSettings = {
            url: fng.fams.path + '/portfolio_bond_credit_graph_read.asp',
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
    // $('#trd_dt').val(fng.fams.today());
    // //최초조회
    // $('#btn_read').click();
})