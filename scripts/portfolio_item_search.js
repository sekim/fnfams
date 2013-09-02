$(function(){
	var info = fng.fams.info,
        selectUnitFOpt = {
            selector : '#selectUnitFund',
            data : {
                '백만원':1000000,
                '억원':100000000
            }
        },
        selectItemGbOpt = {
            selector : '#selectItemGb',
            data : {
                '전체':'ALL', 
                '주식':'ST',
                '채권':'BD',
                '현금성':'CH',
                '기타':'ETC'
            },
            defaultIdx : 2
        },
        $selectUnitFund,
        $selectItemGb;

    $selectUnitFund = fng.selectbox(selectUnitFOpt);
    $selectItemGb = fng.selectbox(selectItemGbOpt);

    //링크클릭 기본 이벤트 불능
    $('a', 'article').on('click', function(){
        return false;
    })

	//조회버튼 클릭
	$('#btn_read').click(function(){
        var param = {
            cust_cd:info.cust_cd,
            trd_dt:$('#trd_dt').val(),
            grp_gb:$selectItemGb.val(),
            item_nm:$('#inputItem').val(),
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
    }

	function readFund(param) {
		var grdOpt,
            ajaxSettings;
        $('#fundGrid').html('');
        $('#fundGridpagearea').remove();
        function readSuccess(d){
            grdOpt = {
                selector:'#fundGrid',
                tableClass:'itemsearch-1',
                selectable: false,
                header:[
                    [
                        {title:'펀드구분'},
                        {title:'상위펀드'},
                        {title:'펀드명'},
                        {title:'펀드유형'},
                        {title:'종목구분'},
                        {title:'종목명'},
                        {title:'평가액'},
                        {title:'자산내비중'},
                        {title:'펀드비중'}
                    ]
                ],
                body:[
                    {field:'FUND_GB'},
                    {field:'FUND_CD_SS', align:'left'},
                    {field:'FUND_NM', align:'left'},
                    {field:'PEER_NM', align:'left'},
                    {field:'ASSET_GRP'},
                    {field:'ITEM_NM', align:'left'},
                    {field:'MKT_EVAL_AMT', align:'right', type:'number'},
                    {field:'WGT_ASSET', align:'right', type:'number'},
                    {field:'WGT_NAV', align:'right', type:'number'}
                ],
                data:d,
                page:{
                    curPage:1,
                    line:20,
                    target:'#fundGridpagearea'
                },
                sort:{
                    sortable: true,
                    mode: 'single',
                    defaultIdx: 0,
                    defaultOrd: 'asc'
                },
                callback: function(){
                    $('#fundGrid').off('click', 'table>tbody>tr').on('click', 'table>tbody>tr', function(){
                        $('table>tbody>tr','#fundGrid').removeClass('ac').removeClass('ac2');
                        $(this).addClass('ac2');
                    });
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
            url: fng.fams.path + '/portfolio_item_search_read.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
        //fng.ajax.queryExecute(ajaxSettings);
	}

    //fams전용 필요한 공통 호출
    //캘린더생성
    fng.fams.calendar();
    fng.fams.date.init();
    // fng.fams.date.current('#trd_dt',function(){
    //     fng.debug.log(fng.fams.date.diff($('#trd_dt').val(),-1,'m'));
    //     $('#btn_read').click();
    // });    
})