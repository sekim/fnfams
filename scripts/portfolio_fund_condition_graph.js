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
            to_dt:$('#to_dt').val()
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
            grdOpt = {
                selector:'#pFundGrid',
                selectable: false,
                key: 'FUND_CD',
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
                        var param = {
                            cust_cd:info.cust_cd,
                            fr_dt:$('#fr_dt').val(),
                            to_dt:$('#to_dt').val(),
                            unit:$selectUnit.val(),
                            fund_cd : $(this).attr('data-key')
                        }


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
            url: fng.fams.path + '/portfolio_read_fund_condition_series_parent.asp',
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
            grdOpt = {
                selector:'#cFundGrid',
                selectable: false,
                key: 'FUND_CD',
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
                        var param = {
                            cust_cd:info.cust_cd,
                            fr_dt:$('#fr_dt').val(),
                            to_dt:$('#to_dt').val(),
                            unit:$selectUnit.val(),
                            fund_cd : $(this).attr('data-key')
                        }
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
            url: fng.fams.path + '/portfolio_read_fund_condition_series_child.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }

    function chartPfund(param){

        function readSuccess(d) {
            var valAxis4 = [
                {
                    axisColor : '#FF6600',
                    axisThickness : 2
                },
                {   
                    offset : 0,
                    position : 'right',
                    gridAlpha : 0,
                    axisColor : '#B0DE09',
                    axisThickness : 2
                }
            ];

            var graphOpt = [
                    {
                        title : '기준가',
                        field : 'ADJ',
                        valueAxis : valAxis4[0],
                        lineColor : '#FF6600',
                        type : 'smoothedLine',
                        bullet : 'round',
                        hideBulletsCount : 30
                    },
                    {
                        title : '평가금액',
                        field : 'NAV',
                        valueAxis : valAxis4[1],
                        lineColor : '#B0DE09',
                        bullet : 'triangleUp',
                        hideBulletsCount : 30,
                        type : 'smoothedLine',
                        fillAlphas : 0.5
                    }
                ];
        
            var id = 'chartPfund';
            
            $('#' + id).show();

            fng.chart({selector: '#' + id,
                  marginTop: 15, 
                  marginLeft: 50, 
                  marginRight: 60, 
                  chartData: d, 
                  categoryField: 'TRD_DT', 
                  graph: graphOpt, 
                  valAxis: valAxis4, 
                  guideLine: true, 
                  scrollbar: true,
                  categoryAxisParseDates: true,
                  legend : true, //범례
                  legendMarginLeft: 130
               
              }); 
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_read_fund_condition_graph_chart.asp',
            param: param,
            success: readSuccess,
            error: function(data, status, err){
                fng.debug.log(data.status).log(err);
            }
        }

        fng.ajax.getJson(ajaxSettings);
    } 
   
    function chartCfund(param){

        function readSuccess(d) {
            var valAxis4 = [
                {
                    axisColor : '#FF6600',
                    axisThickness : 2
                },
                {   
                    offset : 0,
                    position : 'right',
                    gridAlpha : 0,
                    axisColor : '#B0DE09',
                    axisThickness : 2
                }
            ];

            var graphOpt = [
                    {
                        title : '기준가',
                        field : 'ADJ',
                        valueAxis : valAxis4[0],
                        lineColor : '#FF6600',
                        type : 'smoothedLine',
                        bullet : 'round',
                        hideBulletsCount : 30
                    },
                    {
                        title : '평가금액',
                        field : 'NAV',
                        valueAxis : valAxis4[1],
                        lineColor : '#B0DE09',
                        bullet : 'triangleUp',
                        hideBulletsCount : 30,
                        type : 'smoothedLine',
                        fillAlphas : 0.5
                    }
                ];
        
            var id = 'chartCfund';
            
            $('#' + id).show();

            fng.chart({selector: '#' + id,
                  marginTop: 15, 
                  marginLeft: 50, 
                  marginRight: 60, 
                  chartData: d, 
                  categoryField: 'TRD_DT', 
                  graph: graphOpt, 
                  valAxis: valAxis4, 
                  guideLine: true,
                  scrollbar: true,
                  categoryAxisParseDates: true,
                  legend : true, //범례
                  legendMarginLeft: 130
               
              }); 
        }
        
        ajaxSettings = {
            url: fng.fams.path + '/portfolio_read_fund_condition_graph_chart.asp',
            param: param,
            success: readSuccess,
            error: function(data, status, err){
                fng.debug.log(data.status).log(err);
            }
        }

        fng.ajax.getJson(ajaxSettings);
    } 

    fng.fams.calendar();
    fng.fams.date.init();
    // $('#fr_dt').val(fng.fams.today(-1,'Y'));
    // $('#to_dt').val(fng.fams.today());
    // //최초조회
    // $('#btn_read').click();
})