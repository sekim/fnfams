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
            trd_dt:$('#trd_dt').val()
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
                divClass:'b1-5-1',
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
                    line:5,
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
                        readParentFundHist(param);
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
                divClass:'b1-5-3',
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
                    line:5,
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
                        readChildFundHist(param);
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

    function readParentFundHist(param) {
        var grdOpt,
        ajaxSettings;
        $('#pFundHistGrid').html('');
        $('#pFundHistGridpagearea').remove();
        function readSuccess(d){
            //fng.debug.log(d);
            grdOpt = {
                selector:'#pFundHistGrid',
                selectable: false,
                divClass:'b1-5-2',
                header:[
                    [
                        {title:'기준일자'},
                        {title:'기준가'},
                        {title:'일수익률'},
                        {title:'순자산총액'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'FUND_NM'},
                    {field:'FUND_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#pFundHistGridpagearea'
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

	function readChildFundHist(param) {
        var grdOpt,
        ajaxSettings;
        $('#cFundHistGrid').html('');
        $('#cFundHistGridpagearea').remove();
        function readSuccess(d){
            //fng.debug.log(d);
            grdOpt = {
                selector:'#cFundHistGrid',
                selectable: false,
                divClass:'b1-5-4',
                header:[
                    [
                        {title:'기준일자'},
                        {title:'기준가'},
                        {title:'일수익률'},
                        {title:'순자산총액'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'FUND_NM'},
                    {field:'FUND_NM'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:5,
                    target:'#cFundHistGridpagearea'
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
    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();

    $('#fr_dt').val(fng.fams.today(-1,'m'));
    $('#to_dt').val(fng.fams.today());
    //최초조회
    $('#btn_read').click();
})