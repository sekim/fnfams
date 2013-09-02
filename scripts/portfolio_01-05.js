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
    
	function readFund(param) {
		var grdOpt,
        ajaxSettings;
        $('#fundGrid').html('');
        $('#fundGridpagearea').remove();
        function readSuccess(d){
        	//fng.debug.log(d);
            grdOpt = {
                selector:'#fundGrid',
                tableClass:'b1-7-1',
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
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'STD_PRC'},
                    {field:'RT'},
                    {field:'SET_AMT'},
                    {field:'NAV'},
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
                        readData(param);
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
        $('#dataGrid').html('');
        $('#dataGridpagearea').remove();
        function readSuccess(d){
            //fng.debug.log(d);
            grdOpt = {
                selector:'#dataGrid',
                tableClass:'b1-7-2',
                selectable: false,
                header:[
                    [
                        {title:'유형분류 구분'},
                        {title:'일수익률(절대값)'},
                        {title:'BM초과(절대값)'},
                        {title:'유형초과(절대값)'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'STD_PRC'},
                    {field:'RT'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#dataGridpagearea'
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
    $('#trd_dt').val(fng.fams.today());
    //최초조회
    $('#btn_read').click();
})