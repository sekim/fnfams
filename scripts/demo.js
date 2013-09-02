

$(function(){

    fng.debug.enable(true);

    var gridData1 = [{"u_cd": "FI00.EWI.001","u_nm": "MKF 블루칩","gicode": "A104520","itemabbrnm": "KOSEF 블루칩","prc": 6089.3,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.MID.VAL","u_nm": "MKF 중형가치","gicode": "A097720","itemabbrnm": "TIGER 미드캡","prc": 7837.68,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.MIX.01","u_nm": "fng-KIS 5대그룹주장기채플러스","gicode": "A157650","itemabbrnm": "KStar 5대그룹주장기채+","prc": 1247.84,"diff": 0.25,"update_dt": "2013-07-18 오전 7:51:26"},{"u_cd": "FI00.MSM.VAL","u_nm": "MKF 중소형가치","gicode": "A097750","itemabbrnm": "TREX 중소형가치","prc": 6363.28,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.PVA","u_nm": "MKF 순수가치","gicode": "A097710","itemabbrnm": "TIGER 가치주","prc": 14926.65,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.015","u_nm": "MKF F15 VW","gicode": "A105270","itemabbrnm": "KINDEX 성장대형F15","prc": 2781.17,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.200","u_nm": "fng-RAFI Korea200","gicode": "A145850","itemabbrnm": "TREX 펀더멘탈 200","prc": 6102.74,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.BLC","u_nm": "MKF 블루칩30","gicode": "A139300","itemabbrnm": "TIGER 블루칩30","prc": 6290.47,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.CHC","u_nm": "중국내수테마","gicode": "A150460","itemabbrnm": "TIGER 중국소비테마","prc": 3617.64,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.CYC","u_nm": "경기주도주","gicode": "A161500","itemabbrnm": "ARIRANG 주도주","prc": 4940.92,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.D20","u_nm": "MKF 웰스고배당20","gicode": "A104530","itemabbrnm": "KOSEF 고배당","prc": 6788.07,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.DEF","u_nm": "경기방어주","gicode": "A161490","itemabbrnm": "ARIRANG 방어주","prc": 2555.42,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.ELT","u_nm": "MKF 코스닥엘리트30","gicode": "A108480","itemabbrnm": "KStar 코스닥엘리트30","prc": 2000.75,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.EXP","u_nm": "MKF 수출주","gicode": "A140570","itemabbrnm": "KStar 수출주","prc": 9044.45,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.G05","u_nm": "MKF 5대그룹주","gicode": "A105780","itemabbrnm": "KStar 5대그룹주","prc": 4921.4,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.H01","u_nm": "철강금속+","gicode": "A161540","itemabbrnm": "ARIRANG 철강금속","prc": 5821,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.H02","u_nm": "조선운송+","gicode": "A161530","itemabbrnm": "ARIRANG 조선운송","prc": 4038.9,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.H03","u_nm": "화학+","gicode": "A161550","itemabbrnm": "ARIRANG 화학","prc": 4921.1,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.H07","u_nm": "자동차+","gicode": "A161520","itemabbrnm": "ARIRANG 자동차","prc": 8710.13,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.HDV","u_nm": "배당주","gicode": "A161510","itemabbrnm": "ARIRANG 배당주","prc": 11239.6,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.HFW","u_nm": "MKF 현대차그룹+ FW","gicode": "A138540","itemabbrnm": "TIGER 현대차그룹+","prc": 23132.27,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.HMC","u_nm": "MKF 현대차그룹","gicode": "A107560","itemabbrnm": "GIANT 현대차그룹","prc": 20984.36,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.HSS","u_nm": "핵심소비재","gicode": "A136280","itemabbrnm": "KODEX 소비재","prc": 8094.92,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.I30","u_nm": "생활소비재","gicode": "A152180","itemabbrnm": "TIGER 생활소비재","prc": 9275.11,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.IAM","u_nm": "자동차","gicode": "A157510","itemabbrnm": "TIGER 자동차","prc": 17834.9,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.ICH","u_nm": "화학","gicode": "A157520","itemabbrnm": "TIGER 화학","prc": 8591.89,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.ISC","u_nm": "증권","gicode": "A157500","itemabbrnm": "TIGER 증권","prc": 1865.34,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.ISW","u_nm": "소프트웨어","gicode": "A157490","itemabbrnm": "TIGER 소프트웨어","prc": 2396.93,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.LAR","u_nm": "fng-RAFI Korea Large","gicode": "A143460","itemabbrnm": "KINDEX 밸류대형","prc": 5861.46,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.LAR","u_nm": "fng-RAFI Korea Large","gicode": "A144670","itemabbrnm": "KOSEF 펀더멘탈대형주","prc": 5861.46,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.LFW","u_nm": "MKF LG그룹+ FW","gicode": "A138530","itemabbrnm": "TIGER LG그룹+","prc": 6169.97,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.LGG","u_nm": "MKF LG그룹&","gicode": "A117740","itemabbrnm": "ARIRANG LG그룹&","prc": 11078.96,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.MMT","u_nm": "모멘텀","gicode": "A147970","itemabbrnm": "TIGER 모멘텀","prc": 19815.14,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SAM","u_nm": "삼성그룹","gicode": "A102780","itemabbrnm": "KODEX 삼성그룹","prc": 6149.04,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SEW","u_nm": "MKF SAMS EW","gicode": "A131890","itemabbrnm": "KINDEX 삼성그룹EW","prc": 12051.37,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SFW","u_nm": "MKF SAMS FW","gicode": "A138520","itemabbrnm": "TIGER 삼성그룹","prc": 8297.11,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SMB","u_nm": "베타플러스","gicode": "A170350","itemabbrnm": "TIGER 베타플러스","prc": 5526.82,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SOL","u_nm": "태양광","gicode": "A144750","itemabbrnm": "KODEX 태양광","prc": 1582.53,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.SSW","u_nm": "MKF SAMs SW ","gicode": "A108450","itemabbrnm": "KINDEX 삼성그룹SW","prc": 9151.98,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.STA","u_nm": "MKF 스타우량","gicode": "A108630","itemabbrnm": "FIRST 스타우량","prc": 1542.91,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI00.WLT.WIN","u_nm": "MKF 우량업종대표주","gicode": "A140580","itemabbrnm": "KStar 우량업종","prc": 10134.98,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"},{"u_cd": "FI01.WLT.PDF","u_nm": "MKF 네오밸류","gicode": "A129270","itemabbrnm": "ARIRANG 네오밸류","prc": 5738.55,"diff": 0,"update_dt": "2013-07-18 오전 7:51:27"}];
    
    var gridData2 = [
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000},
            {cnt:200, page:1, lines:10, year:'2000', price:'120000', sales:123340000, profit:23300000}
        ];

    var opt1 = {
            selector:'#grid1',
            header:[
                [
                    {title:'지수코드'},
                    {title:'지수구분'},
                    {title:'종목코드'},
                    {title:'지수명'},
                    {title:'종가'},
                    {title:'전일대비'},
                    {title:'날짜'}
                ]
            ],
            data:gridData1
        },
        opt2 = {
            selector:'#grid2',
            selectable: true,
            header:[
                [
                    {title:'지수코드'},
                    {title:'지수구분'},
                    {title:'종목코드'},
                    {title:'지수명'},
                    {title:'종가'},
                    {title:'전일대비'},
                    {title:'날짜'}
                ]
            ],
            data:gridData1,
            page:{
                curPage:1,
                line:15,
                target:'#grid2pagearea'
            },
            sort:{
                sortable: true,
                mode: 'single',
                defaultIdx: 0,
                defaultOrd: 'asc'
            }
        },
        opt3 = {
            selector:'#grid1',
            header:[
                [
                    {title:'지수코드'},
                    {title:'지수구분'},
                    {title:'종목코드'},
                    {title:'지수명'},
                    {title:'종가'},
                    {title:'전일대비'},
                    {title:'날짜'}
                ]
            ],
            data:gridData1,
            sort:{
                sortable: true,
                mode: 'single'
            }
        };

    // var grid1 = fng.grid(opt1);

    $('#changeGridData').click(function(){
        grid1.setOptions(opt3);
        grid1.displayGrid();
    });

    // var grid2 = fng.grid(opt2);

    fng.layer({
        trigger: '#layer1',
        triggerEvent: 'click',
        layer: '#layerdemo1',
        width:300,
        height:200,
        position: 'cursor',
        modal: true,
        docClose: true,
        close: '.closeBtn'
    });

    fng.layer({
        trigger: '#layer2',
        triggerEvent: 'mouseenter',
        closeEvent: 'mouseleave',
        layer: '#layerdemo2',
        width:300,
        height:200,
        position: 'cursor',
        modal: false,
        close: '.closeBtn'
    });

    fng.layer({
        trigger: '#layer3',
        triggerEvent: 'mouseenter',
        closeEvent: 'mouseleave',
        layer: '#layerdemo3',
        modal: false,
        close: '.closeBtn'
    });


    var chartData = [
            {year:2005,income:23.5,expenses:28.1}, 
            {year:2006,income:26.2,expenses:32.8},
            {year:2007,income:33.1,expenses:36.9},
            {year:2008,income:29.5,expenses:31.1},
            {year:2009,income:24.6,expenses:27.0}
        ];

    var chartData2 = [
            {year:2005,avg:23.5,price:123000}, 
            {year:2006,avg:26.2,price:153000},
            {year:2007,avg:33.1,price:173000},
            {year:2008,avg:29.5,price:143000},
            {year:2009,avg:24.6,price:128700}
        ];

    var chartData6 = [{x:10, y:14, value:59},
                    {x:5, y:3, value:50},
                    {x:-10, y:-3, value:19},
                    {x:-6, y:5, value:65},
                    {x:15, y:-4, value:92},
                    {x:13, y:1, value:8},
                    {x:1, y:6, value:35}];

    //라인 차트 데모
    var graph1 = [
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

    $('#chart1show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({selector: '#' + id,
                chartData: chartData,
                categoryField: 'year',
                graph: graph1,
                legendMarginLeft: 30,
                grid: '#' + id + 'datagrid',
                layer: '#' + id + 'Layer',
                layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]});  
    });

    $('.chartHide').click(function(){
        var id = $(this).attr('id').replace('hide','');
        $('#' + id).fadeOut().html('');
    });

    //바 차트 데모
    var graph2 = [
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

    $('#chart2show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({selector: '#' + id,
                chartData: chartData,
                categoryField: 'year',
                graph: graph2,
                legendMarginLeft: 100,
                grid: '#' + id + 'datagrid',
                layer: '#' + id + 'Layer',
                layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]});  
    });

    //3D 바 차트 데모
    var graph3 = [
            {
                title : 'Income',
                field : 'income',
                type : 'column',
                lineThickness : 2,
                dashLength : '1',
                fillAlphas : 1,
                balloonText : '[[category]] Income: [[value]]',
                lineAlpha : 0,
                lineColor : "#D2CB00"
            },
            {
                title : 'Expenses',
                field : 'expenses',
                type : 'column',
                dashLength : '2',
                lineThickness : 2,
                fillAlphas : 1,
                balloonText : '[[category]] Expenses: [[value]]',
                lineAlpha : 0,
                lineColor : "#BEDF66"
            }
        ];

    $('#chart3show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({selector: '#' + id,
                chartData: chartData,
                categoryField: 'year',
                graph: graph3,
                legendMarginLeft: 100,
                type: '3D',
                angle: 40,
                depth3D: 30,
                grid: '#chart3datagrid',
                layer: '#chart3Layer',
                layerHeader: [[{title:'year'},{title:'income'},{title:'expenses'}]]});
    });

    //2중축 라인, 영역, 줌, 가이드라인 차트
    var chartData4 = [];

    //랜덤하게 차트에 들어갈 데이터를 만드는 함수
    function generateChartData() {
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
            
        for(var i = 0; i < 100; i++)
        {
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
                  
            var visits = Math.round(Math.random() * 40) + 100;
            var views   = Math.round(Math.random() * 6000);
                  
            chartData4.push({date:newDate, visits:visits, views:views});
        }
    }

    generateChartData();
    
    //2중축 이상일 경우 축 설정값을 꼭 넘겨준다.                
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

    var graph4 = [
            {
                title : 'Visits',
                field : 'visits',
                valueAxis : valAxis4[0],
                lineColor : '#FF6600',
                type : 'smoothedLine',
                bullet : 'round',
                hideBulletsCount : 30
            },
            {
                title : 'Views',
                field : 'views',
                valueAxis : valAxis4[1],
                lineColor : '#B0DE09',
                bullet : 'triangleUp',
                hideBulletsCount : 30,
                type : 'smoothedLine',
                fillAlphas : 0.5
            }
        ];

    $('#chart4show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({selector: '#chart4',
                marginTop: 15,
                marginLeft: 110,
                marginRight: 50,
                chartData: chartData4,
                categoryField: 'date',
                graph: graph4,
                valAxis: valAxis4,
                guideLine: true,
                scrollbar: true,
                categoryAxisParseDates: true,
                grid: '#chart4datagrid',
                layer: '#chart4Layer',
                layerHeader: [[{title:'date'},{title:'visits'},{title:'views'}]]});
    });

    //다중축 라인, 영역, 줌, 가이드라인 차트
    var chartData5 = [];

    //랜덤하게 차트에 들어갈 데이터를 만드는 함수
    function generateChartData2() {
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
            
        for(var i = 0; i < 50; i++)
        {
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
                  
            var visits = Math.round(Math.random() * 40) + 100;
            var hits   = Math.round(Math.random() * 80) + 500;
            var views   = Math.round(Math.random() * 6000);
                  
            chartData5.push({date:newDate, visits:visits, hits:hits, views:views});
        }
    }

    generateChartData2();

    //2중축 이상일 경우 축 설정값을 꼭 넘겨준다.
    var valAxis5 = [
            {
                axisColor : '#FF6600',
                axisThickness : 2

            },
            {   
                offset : 0,
                position : 'right',
                gridAlpha : 0,
                axisColor : '#FCD202',
                axisThickness : 2
            },
            {   
                offset : 50,
                gridAlpha : 0,
                axisColor : '#B0DE09',
                axisThickness : 2
            }
        ];

    var graph5 = [
            {
                title : 'Visits',
                valueAxis : valAxis5[0],
                field : 'visits',
                type : 'smoothedLine',
                bullet : 'round',
                hideBulletsCount : 30
            },
            {
                title : 'Views',
                field : 'views',
                bullet : 'triangleUp',
                hideBulletsCount : 30,
                type : 'smoothedLine',
                valueAxis : valAxis5[1]
            },
            {
                title : 'Hits',
                field : 'hits',
                bullet : 'triangleUp',
                hideBulletsCount : 30,
                type : 'smoothedLine',
                valueAxis : valAxis5[2],
                fillAlphas : 0.5
            }
        ];

    $('#chart5show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({selector: '#chart5',
                marginTop: 15,
                marginLeft: 110,
                marginRight: 50,
                chartData: chartData5,
                categoryField: 'date',
                graph: graph5,
                valAxis: valAxis5,
                guideLine: true,
                scrollbar: true,
                categoryAxisParseDates: true,
                zoomToIndexes: [0,10],
                grid: '#chart5datagrid',
                layer: '#chart5Layer',
                layerHeader: [[{title:'date'},{title:'visits'},{title:'views'},{title:'hits'}]]}); //최초 줌상태 설정값[시작,끝]
    });
    
    //버블 차트 데모
    var graph6 = [
            {
                title : 'Value',
                field : 'value',
                xField : "x",   //버블 차트는 x, y 축 설정 필요 
                yField : "y",
                bullet : 'round',
                lineThickness : 0,
                lineColor : '#FF0000'
            }
        ];

    $('#chart6show').click(function(){
        var id = $(this).attr('id').replace('show','');
        $('#' + id).show();

        fng.chart({
                type: 'xychart',    //버블 차트는 타입을 xychart로 설정.
                selector: '#chart6',
                chartData: chartData6,
                graph: graph6,
                legendMarginLeft: 100,
                scrollbar: true,
                grid: '#chart6datagrid',
                layer: '#chart6Layer',
                layerHeader: [[{title:'x'},{title:'y'},{title:'value'}]]});
    });
    
    //var toc = $("#toc").tocify({ selectors: "h2, h3, h4" }).data("toc-tocify");

    setTimeout(function(){$('#loadbg').hide();},1000);
});
