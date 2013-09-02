$(function(){
	var info = fng.fams.info;

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
        readChildFund(param);
    });

	function readParentFund(param) {
		var grdOpt,
        ajaxSettings;
        $('#pFundGrid').html('');
        $('#pFundGridpagearea').remove();
        function readSuccess(d){
        	//fng.debug.log(d);
            grdOpt = {
                selector:'#pFundGrid',
                tableClass:'b1-3-1',
                selectable: false,
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'최초투자일'},
                        {title:'투자풀구분'},
                        {title:'운용사'},
                        {title:'판매사'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'PEER_NM'},
                    {field:'FST_TRD_DT'},
                    {field:'INVST_POOL_GB'},
                    {field:'CO_NM'},
                    {field:'SELL_CO_NM'}
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
                        var param = {
                            cust_cd:info.cust_cd,
                            trd_dt:$('#trd_dt').val()
                        }
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
            grdOpt = {
                selector:'#cFundGrid',
                tableClass:'b1-3-2',
                selectable: false,
                header:[
                    [
                        {title:'펀드코드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'펀드설정일'},
                        {title:'최초투자일'},
                        {title:'운용사'}
                    ]
                ],
                body:[
                    {field:'FUND_CD'},
                    {field:'FUND_NM'},
                    {field:'PEER_NM'},
                    {field:'SET_DT'},
                    {field:'FST_TRD_DT'},
                    {field:'CO_NM'}
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