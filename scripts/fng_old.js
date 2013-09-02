/**
* fms용 공통 js 2013.07.01 by lee dong eun
*
* @module fng
*/
$(function (undefined) {
	var fng = fng || {};
	//fng 버전
	fng.version = "0.20130715";

	fng.ns = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = fng,
			i;

		//처음 중복되는 전역 객체명은 제거한다.
		if (parts[0] === 'fng') {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i += 1) {
			//프로퍼티가 존재하지 않으면 생성한다.
			if (typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	fng.ns('fng.newgrid');

	fng.newgrid = 

    /**
    * 로딩이미지 관련
      @namespace fng
      @class loadimg
    */
	fng.loadimg = function () {
	    var loadimg = '<div id="loadingdiv" style="display:none;"><img id="loadingimg" src="../img/load_fnguide.gif"/></div>';
	    /**
	    * 로딩이미지 보이기
	    * @method show
	    * @param {string} 셀렉터
	    */
	    function show(selector) {
	        $(selector).css({ 'opacity': 0.5 });
	        $(loadimg).appendTo(selector).show();
	    }
	    /**
	    * 로딩이미지 숨기기
	    * @method hide
	    * @param {string} 셀렉터
	    */
	    function hide(selector) {
	        $(selector).css({ 'opacity': 1 });
	        $(loadimg).hide();
	    }

	    return {
	        'show': show,
	        'hide': hide
	    };
	}();

	/**
	유효성 검사기
	@namespace fng
	@class validator
	*/
	fng.validator = {
		types:{},
		messages:[],
		config:{},
		/**
		유효성검사 수행 메소드
		@method validate
		@param {object} 유효성 검사할 객체
		*/
		validate: function(data) {
			var i,
				msg,
				type,
				checker,
				result_ok;
			this.messages = [];
			for(i in data) {
				if (data.hasOwnProperty(i)) {
					type = this.config[i];
					checker = this.types[type];
					if (!type) {
						continue;
					}
					if (!checker) {
						msg = '\'' + type + '\' 유효성 검사기가 없습니다.';
						this.messages.push(msg);
						continue;
					}
					result_ok = checker.validate(data[i]);
					if (!result_ok) {
						msg = '\'' + i + '\' 값이 유효하지 않습니다.' + checker.instuctions;
						this.messages.push(msg);
					}
				}
			}
			return this.hasErrors();
		},
		hasErrors: function() {
			return this.messages.length !== 0;
		}
	}

	fng.validator.types.isNonEmpty = {
		validate: function(value) {
			return value !== '';
		},
		instuctions: '이 값은 필수 입니다.'
	};

	fng.validator.types.isNonEmptyArray = {
		validate: function(value) {
			return (Object.prototype.toString.call(value) === '[object Array]') && (value.length > 0)
		},
		instuctions: ' 이 값은 비어있지 않은 배열이어야 합니다.'
	};

	/**
	* Chart 관련 (AmChart이용)
      @namespace fng
      @class chart
      @param {object} 차트셋팅값
	* 
	*/
	fng.chart = function(settings) {
		var defaults = {
					startDuration: 0.5,
					fontSize: 11,
			        marginTop: 20,
			        marginLeft: 50,
			        marginRight: 25,
			        marginBottom: 25,
			        rotate: false,
			        angle: 0,
			        depth3D: 0,
			        legendMarginTop: 0,
			        legendMarginLeft: 147,
			        pathToImages : "./img/amchart/",
			        categoryAxisParseDates : false,
			        guideLine : false,
			        scrollbar : false
			},
			opt = $.extend(defaults, settings || {});
		
		//유효성 검사 항목 지정
		fng.validator.config = {
			selector: 'isNonEmpty',
			categoryField: 'isNonEmpty',
			graph: 'isNonEmptyArray'
		};

		//유효성 검사
		fng.validator.validate(opt);
		if (fng.validator.hasErrors()) {
			fng.debug.log(fng.validator.messages.join('\n'));
			return;
		};

		$(opt.selector).html('');

		var chart,
			chartElem = opt.selector,
			len,
			i;
		
		if (opt.type === 'xychart') {
			chart = new AmCharts.AmXYChart();
		} else {
			chart = new AmCharts.AmSerialChart();   
		}
        chart.dataProvider = opt.chartData;
        chart.categoryField = opt.categoryField;
        chart.startDuration = opt.startDuration;
        chart.rotate = opt.rotate;
        chart.fontSize = opt.fontSize;
        chart.marginTop = opt.marginTop;
        chart.marginLeft = opt.marginLeft;
        chart.marginRight = opt.marginRight;
        chart.marginBottom = opt.marginBottom;
        chart.angle = opt.angle;
        chart.depth3D = opt.depth3D;
        chart.plotAreaFillAlphas= 0.2;
        chart.pathToImages = opt.pathToImages;
        opt.categoryAxisParseDates ? chart.categoryAxis.parseDates = opt.categoryAxisParseDates : false;

		opt.valAxis ? len = opt.valAxis.length : len = 1;
        var valAxis = new Array(len);

        if (len > 1) {
        	for (i = 0; i < len; i++) {	        	
	        	valAxis[i] = new AmCharts.ValueAxis();
	        	for(var prop in opt.valAxis[i]){
	        		if(opt.selector === '#chart6') {
	        			fng.debug.log(prop);
	        		}
	        		valAxis[i][prop] = opt.valAxis[i][prop];
	        	}

	        	chart.addValueAxis(valAxis[i]);
	        }
    	} else {
    		if (opt.type === 'xychart') {
    			valAxis = new Array(2);
    			valAxis[0] = new AmCharts.ValueAxis();
    			valAxis[1] = new AmCharts.ValueAxis();
    			valAxis[0].position = 'left';
    			valAxis[0].autoGridCount = true;
    			valAxis[1].position = 'bottom';
    			valAxis[1].autoGridCount = true;
				chart.addValueAxis(valAxis[0]);
				chart.addValueAxis(valAxis[1]);
    		} else {
		        var valAxis = new AmCharts.ValueAxis();
		        opt.type == '3D' ? valAxis.stackType = '3d' : valAxis.stackType = 'none';
		        valAxis.position = "left";
		        valAxis.dashLength = 5;
		        chart.addValueAxis(valAxis);	
		        valAxis[0] = valAxis;
		    }
    	}   

        len = opt.graph.length;
        var graph = new Array(len),
        	defaultGraph = {
        		balloonText : '[[value]]',
        		fillAlphas : 0,
        		dashLength : 0,
        		hideBulletsCount : 30,
        		lineThickness : 1
        	},
        	optGraph;

        for (i = 0; i < len; i++) {
        	optGraph = $.extend(defaultGraph, opt.graph[i] || {});
        	graph[i] = new AmCharts.AmGraph();        	
        	graph[i].title = optGraph.title;
        	graph[i].valueField = optGraph.field;
        	optGraph.type ? graph[i].type = optGraph.type : false;
        	graph[i].lineThickness = optGraph.lineThickness;
        	graph[i].dashLength = optGraph.dashLength;
        	graph[i].bullet = optGraph.bullet;
        	graph[i].fillAlphas = optGraph.fillAlphas;
        	graph[i].balloonText = optGraph.balloonText;
        	graph[i].lineAlpha = optGraph.lineAlpha;
        	graph[i].lineColor = optGraph.lineColor;
        	graph[i].fillAlphas = optGraph.fillAlphas;
        	graph[i].valueAxis = valAxis[i];
        	graph[i].hideBulletsCount = optGraph.hideBulletsCount;
        	graph[i].xField = optGraph.xField;
        	graph[i].yField = optGraph.yField;
        	chart.addGraph(graph[i]);
        };

        var legend = new AmCharts.AmLegend();
        legend.marginLeft = opt.legendMarginLeft;
        legend.marginTop = 20;
        chart.addLegend(legend);
        
        //커서 따라다니는 가이드 라인 표시
        if (opt.guideLine) {
		    var chartCursor = new AmCharts.ChartCursor();
		    chart.addChartCursor(chartCursor);
		}
	    
	    //차트 전체 영역 스크롤바 표시
	    if (opt.scrollbar) {
		    var chartScrollbar = new AmCharts.ChartScrollbar();
		    chartScrollbar.graph = graph[0];
		    chart.addChartScrollbar(chartScrollbar);
		}

		//차트 줌 초기값 설정(옵션에 zoomToIndexes:[시작값, 끝값])
        if (opt.zoomToIndexes) {
        	chart.addListener("dataUpdated", function(){
        		chart.zoomToIndexes(opt.zoomToIndexes[0], opt.zoomToIndexes[1]);
        	});
        }

        //차트 그리기
        chart.write($(opt.selector).attr('id'));

        if (opt.grid && opt.layer) {
        	fng.grid(opt.grid,{
	            sort : {
	                sortable: true,
	                mode: 'single'
	            },
	            datasource:chart.dataProvider,
	            header : opt.layerHeader
	        });

		    fng.layer({
		        trigger: opt.selector,
		        triggerEvent: 'click',
		        layer: opt.layer,
		        position: 'cursor',
		        modal: false,
		        docClose: false,
		        close:'.closeBtn'
		    });
		}
	};

	/**
	모달 레이어 클래스
	@class layer
	*/
	fng.layer = function(settings){
		var options = $.extend({
            trigger: '.modalLink',
            triggerEvent: 'click',
            layer: 'div.layer',
            position: 'trigger',
	        offsetY: 0,
	        offsetX: 0,
            modal: true,
            movable: true
        },settings);
		
		var layer = $(options.layer),
        	olay,
        	currentModal,
        	isopen=false,
        	mouseDown=false;		

		if (options.modal) {	//모달이면 다른 영역 이벤트 차단.
			if ($('.overlay').length > 0)
				olay = $('.overlay');
			else
				olay = $('<div class="overlay"></div>');

			$(options.trigger).bind(options.triggerEvent, function(e){
				e.preventDefault();
	            openModal();
	        });

			$(document.body).append(olay);
			
	    	olay.on('click',function(e){
	    		if(options.docClose) {	//다른영역 클릭시 모달 창 닫기
	    			closeModal();
   			    } else {
   			    	return false;
			    }
	        });
		} else {	//모달이 아니면 이동가능, 여러창 가능.
			$(options.trigger).bind(options.triggerEvent, function(e){
				//e.preventDefault();
	            openLayer(e);
	        });

			//레이어의 헤더 부분 클릭후 이동 가능
			$(options.layer + ' .layerhead').bind('mousedown',function(e){
				if ($(e.target).attr('class') === 'closeBtn') return;
				var diffX = e.pageX - layer.css('left').replace('px',''),
					diffY = e.pageY - layer.css('top').replace('px',''),
					mouseDown = true;
				$(document.body).addClass("unselectable");	//드래그시 엘리먼트 선택 표시 막기

				//마우스를 빨리 움직일 경우에도 레이어가 따라가도록 document에 이벤트 바인딩
				$(document).bind('mousemove',function(e){
					if (mouseDown) {
						e.preventDefault();
						layer.css({'top':e.pageY - diffY,'left':e.pageX - diffX});
					}
				});

				//마우스업 시 이벤트핸들러 해제
				$(document).bind('mouseup',function(e){
					mouseDown = false;
					$(document.body).removeClass("unselectable");
					$(document).unbind('mousemove').unbind('mouseup');
				});
			});
		}

		$(options.layer + ' ' + options.close).bind('click', options.modal?closeModal:closeLayer);

        function openLayer(e){
        	var p;
        	if (options.position === 'cursor') { //마우스커서 기준 레이어 위치 지정
	        	p = {
	        		top : e.pageY,
	        		left : e.pageX
	        	}
	        } else {
        		p = $(options.trigger).position();//트리거 기준 레이어 위치 지정
	        }
            layer.hide();
            layer.css({
                //top:$(window).height() /2 - layer.outerHeight() /2 + $(window).scrollTop(),
                //left:$(window).width() /2 - layer.outerWidth() /2 + $(window).scrollLeft()
                top: p.top + options.offsetY + 'px',
                left:p.left + options.offsetX + 'px'
            });

            layer.show();            
            isopen=true;
        }

        function openModal(){
            layer.hide();
            layer.css({
                top:$(window).height() /2 - layer.outerHeight() /2 + $(window).scrollTop(),
                left:$(window).width() /2 - layer.outerWidth() /2 + $(window).scrollLeft()
            });
                
            if(isopen===false){
            	olay.css({opacity : 0.7, backgroundColor: '#EFFFFF'});
                olay['fadeIn']('fast');
                olay.show();
                layer.delay('fast')['fadeIn']('fast'); 
            }else{
            	olay.show();
                layer.show();
            }
            
            isopen=true;
        }

        function closeLayer(){
            isopen=false;
            layer.hide();
            return false;
        }

        function closeModal(){
            isopen=false;
            layer.fadeOut(100, function(){
            olay.fadeOut();
            });
            return false;
        }                
	}
	
    /**
    AJAX 헬퍼
	@namespace fng
	@class ajax
	@param {string} ajax로 갱신되는 엘리먼트의 셀렉터 스트링
	@param {object} ajax 설정 정보
    */
	fng.ajax = function (selector, settings) {
	    if (!selector) { return; }
	    var defaults = {
			        type: 'get',
			        async: true,
			        dataType: 'json',
			        contentType: 'application/json; charset=utf-8'
			    },
	        settings = $.extend(defaults, settings || {});

	    fng.loadimg.show(selector);
		fng.debug.log('url:' + settings.url);
		fng.debug.log('term:' + settings.spdata.term);
		fng.debug.log('type:' + settings.spdata.type);
		fng.debug.log('page:' + settings.spdata.page);
		fng.debug.log('lines:' + settings.spdata.lines);
	    $.ajax({
	        type: settings.type,
	        async: settings.async,
	        url: settings.url,
	        data: settings.spdata,
	        dataType: settings.dataType,
	        contentType: settings.contentType,
	        success: function (data) {
	            settings.callbackSuccess(data);
	        },
	        error: function (data, status, err) {
	            settings.callbackError();
	            alert(data + "::" + status + "::" + err);
	        },
	        complete: function () {
                fng.loadimg.hide(selector);
	        }
	    });    
	};

    /**
    Grid Sorting 
    @namespace fng
    @class sort
    */
	fng.sort = function () {
		var multiIndex = [],
			multiReverse = [];
	    /**
	    * 테이블의 특정 컬럼기준으로 소팅한다.
	      @method sortTable
	    * @param {object} 소팅할 테이블 DOM 오프젝트
	    * @param {number} 기준이되는 컬럼 인덱스
	    * @param {boolean} 오더링 방향을 결정 (1,0)
	    * @param {object} 반환받을 원본 TR
	      @return {object} 원본 TR
	    */
	    function sortTable(table, col, reverse, trOld) {
	        var tb = table.tBodies[0], //<tbody>에 한해서만 소팅을 수행한다.
			  	tr = Array.prototype.slice.call(tb.rows, 0), // 모든 row를 배열로 인풋
              	i;
          
          	if (reverse === false) {
          		for (i = 0; i < trOld.length; ++i) tb.appendChild(trOld[i]); // 소팅 해제 원본으로 복구.
          	} else {
	        	reverse = -((+reverse) || -1);

		        tr = tr.sort(function (a, b) { // 소팅한다.
		            var aa = a.cells[col].textContent.replace(/,/g, '').trim(),
	                    bb = b.cells[col].textContent.replace(/,/g, '').trim();

		            if (fng.util.isNumber(aa) && fng.util.isNumber(bb)) {   // 숫자형식 끼리
		                return reverse * (parseFloat(aa) - parseFloat(bb));
		            } else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리
		                return reverse * (aa.localeCompare(bb));
		            } else {
		                return reverse; // 숫자와 문자 형식일 경우
		            }
		        });
		        for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // 각 로우를 tbody에 확장
		    }
	    }

	    /**
	    	소팅 함수
	    	@method sortFunction
	    	@param {object} 소팅 대상 1
	    	@param {object} 소팅 대상 2
	    	@param {boolean} 정렬타입
	    	@return {boolean} 정렬타입
	    */
	    function sortFunction(aa, bb, reverse) {
	    	if (fng.util.isNumber(aa) && fng.util.isNumber(bb)) {   // 숫자형식 끼리
            	return reverse * (parseFloat(aa) - parseFloat(bb));
	        } else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리
	            return reverse * (aa.localeCompare(bb));
	        } else {
	            return reverse; // 숫자와 문자 형식일 경우
	        }
	    }

	    /**
        * 테이블에 클릭 이벤트 할당 (클릭 이벤트 핸들러는 소팅함수 호출)
          @method makeSortTable
        * @param {object} 소팅할 테이블 DOM 오프젝트, 또는 셀렉터 스트링
          @param {object} 소팅 인덱스
          @param {string} 소팅타입(싱글,멀티)개발중
        */
	    function makeSortTable(table, indexArray, sortMode) {
	        var th, thr, i, j, k, len, inLen, cellCnt = 0;
			sortMode = sortMode || 'single';

	        function removeAtValue(val){
	        	multiIndex.splice(multiIndex.indexOf(val),1);
	        }

	        if (typeof table === 'string') {
	            table = $(table)[0];
	        }

	        th = table.tHead;
	        len = th.rows.length;
	        
	        trOld = Array.prototype.slice.call(table.tBodies[0].rows, 0);

	        if (len == 0)
	            return;

	        for (j = 0; j < len; j++) { //rowspan 을 준 헤더가 있을경우도 있으므로 모든 헤더로우를 탐색.
	            th && (thr = th.rows[j]);
	            if (thr) inLen = thr.cells.length;

	            for (i = 0, k = cellCnt; i < inLen; i++, k++) {
	                if ($(thr.cells[i]).attr('colspan')) { //colspan을 준 헤더는 아래 로우에 클릭이벤트를 줘야하므로 생략.
	                    k--;        //colspan을 준 헤더가 제외되었으므로 소팅가능 컬럼갯수를 맞추기 위해 -1
	                    cellCnt--;  //colspan을 준 헤더가 제외되었으므로 루프횟수를 맞추기 위해 -1
	                    continue;
	                }
	                fng.debug.log(indexArray);
	                if (indexArray && (indexArray !== true) && (indexArray.indexOf(k) === -1)) continue;
                    //각컬럼의 오더링 방향을 위해 클로저로 이벤트핸들러에 사용.
	                (function (i, k, trOld) {
	                    var dir = false;
	                    thr.cells[i].style.cursor = 'pointer';
	                    $(thr.cells[i]).append('<div class="sorticon"><i class="icon-chevron-down"></i></div>');
	                    $('.sorticon').css('visibility', 'hidden');
	                    if (sortMode === 'multiple') {	//멀티 소팅 개발 미완료. 사용불가.                    		
	                    } else if (sortMode === 'single') {
							$(thr.cells[i]).bind('click', function () {
								if ($('.sorticon', this).css('visibility') === 'hidden')
									dir = false;

								$('.sorticon').css('visibility', 'hidden');
		                        if (dir === false) {
			                        $('.sorticon', this).find('i').attr('class', 'icon-chevron-down');
			                        $('.sorticon', this).css('visibility', 'visible');
			                        dir = 0;
		                      	} else if (dir === 0) {
		                          	$('.sorticon', this).find('i').attr('class', 'icon-chevron-up');
		                          	$('.sorticon', this).css('visibility', 'visible');
		                          	dir = 1;
		                      	} else if (dir === 1){
			                       	$('.sorticon', this).css('visibility', 'hidden');
			                      	dir = false;
		                      	}
		                      	sortTable(table, k, dir, trOld)
		                    });
						}
	                }(i, k, trOld));
	            }
	            cellCnt += inLen;
	        }
	    }

	    /*
        * 인자로 받은 객체 안의 모든 테이블들을 소팅가능한 테이블로 만든다.
          @method makeAllSortTable
        * @param {object} 소팅할 테이블들이 포함되어있는 DOM 오프젝트, 또는 셀렉터 스트링
        */
	    function makeAllSortTable(parent) {
	        var t,i;
	        parent = parent || document.body;
	        if (typeof parent === 'string') {
	            parent = $(parent)[0];
	        } 
	        t = parent.getElementsByTagName('table');
	        i = t.length;
	        while (--i >= 0) makeSortTable(t[i]);
	    }

	    return {
	        'makeSortTable': makeSortTable,
	        'makeAllSortTable': makeAllSortTable
	    };
	}();

    /**
    Grid Sorting 
    @namespace fng
    @class sort
    */

    /**
    Grid 생성
    @namespace fng
    @class grid
    @param {string} 그리드를 그릴 영역의 셀렉터 스트링
    @param {object} 그리드 설정정보
    */
    fng.grid = function (selector, settings) {
        
        if (!settings.datasource) return;

        settings = $.extend({
        	sort : {
	                sortable: true,
	                mode: 'single'
	            }
        }, settings);
		/**
        * 특정영역에 페이지네이션을 생성한다.
          @method paginationing
        * @param {number} 현재 페이지
        * @param {number} 전체 페이지의 데이터 카운트
        * @param {number} 한페이지의 라인수
        * @param {number} 한화면의 링크되는 페이지수
        */
	    function paginationing(curpage, totalcnt, lines, pageCnt, pageArea, pageclickhdl) {
	        var $ul = $('<ul>'),
                $li = $('<li>'),
                $a = $('<a>'),
                totalpages = Math.ceil(totalcnt / lines),
                start = parseInt((curpage - 1) / pageCnt, 10) * pageCnt + 1,
                i;

	        if (curpage > pageCnt) {
	            $a = $('<a class="pagelink" href="' + (start - 1) + '">').text('이전' + pageCnt + '페이지');
                $ul.append($('<li>').append($a));
	        } else {
	            $a = $('<a>').text('이전' + pageCnt + '페이지');
	            $ul.append($('<li>').append($a).addClass('disabled'));
	        }

	        if (curpage > 1) {
	            $a = $('<a class="pagelink" href="' + (curpage - 1) + '">').text('이전페이지');
	            $ul.append($('<li>').append($a));
	        } else {
	            $a = $('<a>').text('이전페이지');
	            $ul.append($('<li>').append($a).addClass('disabled'));
	        }

	        for (i = start; i < start + pageCnt; i += 1) {
	            if (i > totalpages) {
	                break;
	            }
	            $a = $('<a class="pagelink" href="' + i + '">').text(i);
	            $li = $('<li>').html($a);
	            if (i === parseInt(curpage, 10)) $($li).addClass('disabled');
	            $ul.append($li);
	        }

	        if (curpage < totalpages) {
	            $a = $('<a class="pagelink" href="' + (parseInt(curpage, 10) + 1) + '">')
                    .text('다음페이지');

                $ul.append($('<li>').append($a));
            } else {
	            $a = $('<a>').text('다음페이지');
	            $ul.append($('<li>').append($a).addClass('disabled'));
	        }

	        if (start + pageCnt - 1 < totalpages) {
	            $a = $('<a class="pagelink" href="' + (start + pageCnt) + '">')
                    .text('다음' + pageCnt + '페이지');
                $ul.append($('<li>').append($a));
	        } else {
	            $a = $('<a>').text('다음' + pageCnt + '페이지');
	            $ul.append($('<li>').append($a).addClass('disabled'));
	        }

	        $(pageArea).html('');
	        $ul.appendTo(pageArea);

	        $('.pagelink').click(function (ev) {
	            try {
	                if (typeof pageclickhdl === 'function') {
	                    pageclickhdl($(this).attr('href'));
	                }
	            } catch (e) {
	                fng.debug.log(e.message);
	            } finally {
	                return false;
	            }		
	        });
	    }

	    /**
        * 특정영역에 그리드(데이터테이블)을 생성한다.
          @method displayGrid
        * @param {object} 그리드에 표시할 데이터 json 타입의 속성을 갖는 객체
        */
	    function displayGrid(data) {  	
	        data = data || settings.datasource;
	        var json, key = 'json';
	        	
	        	if (data[key])
	        		json = data[key]; // 객체의 'json'속성을 취하여 json 데이터를 확보. 향후 속성명 변경 또는 삭제예정.
	        	else
	        		json = data;

            var $table = $('<table id="tablefirst" class="table table-bordered table-hover" cellspacing="0">'),
                $thead = $('<thead>'),
                $trh = $('<tr>'),
                $tr = $('<tr>'),
                page = json[0].PAGE || '1',
                lines = json[0].LINES || '10',
                totalcnt = json.length,
                pageCnt = 10,
                header = settings.header,
                headCnt = (header && header.length) || 1, //header 설정 없다면 모든 데이터
                headColCnt = (header && header[0].length) || fng.util.propLength(json[0]),
                thString = '',
                body = settings.body,
                i,
                j,
                title;

            if (settings.page) {
            	page = 1;
            	line = settings.page.line;
            } else {
            	page = 1;
            	line = json.length;
            }

			$table.html('');
	        for (i = 0; i < headCnt; i++) {
	            if (header) {
	                headColCnt = header[i].length || headColCnt;
	                for (j = 0; j < headColCnt; j++) {
	                    thString = '<th ';
						if (header[i][j].details)
						{
							thString = thString + 'class="details" ';
						}
	                    if (header && header[i][j].rspan) {
	                        thString += 'rowspan="' + header[i][j].rspan + '" ';
	                    }
	                    if (header && header[i][j].cspan) {
	                        thString += 'colspan="' + header[i][j].cspan + '" ';
	                    }
                        //if (settings.sortable)
                        //    $trh.append($(thString + '>').text(header[i][j].title).append('<div class="sorticon"><i class="icon-chevron-down"></i></div>'));
	                    //else
                            $trh.append(thString + '>' + header[i][j].title + '</th>');
	                }
	            } else {
	                for (var p in json[0]) {
	                    //if (settings.sortable)
	                    //    $trh.append($('<th>' + json[0][p] + '</th>').append('<div class="sorticon"><i class="icon-chevron-down"></i></div>'));
	                    //else
	                        $trh.append($('<th>' + json[0][p] + '</th>'));
	                }
	            }
	            $trh.appendTo($thead);
	            $trh = $('<tr>');
	        }

	        $thead.appendTo($table);
	        displayGridBody($table, body, json, page, line);

	        $(selector).html('').append($table);

            //페이지네이션 영역을 설정했다면 페이지네이션 생성
	        if (settings.page && settings.page.pageArea) {
	            paginationing(page, totalcnt, lines, pageCnt, settings.page.pageArea, function(page){
	            	pageNumClick(page);
	            });
	        }

	        if (settings.sort.sortable) {
	            fng.sort.makeSortTable($('table', selector)[0], settings.sort.sortable, settings.sort.mode);
	        }
	    }

	    function pageNumClick(page) {
	    	displayGridBody($('#tablefirst'), settings.body, settings.datasource, page, settings.page.line);
	    }

	    function displayGridBody($table, body, json, page, line){
	    	var start,
	    		data;

	    		start = (page - 1) * line;
	    		data = json.slice(start,line);
	    		GridBody($table, body, data);
	    }

	    function GridBody($table, body, json) {
	    	var cnt = json.length,
	    		bodyColCnt = (body && body.length),
	    		$tbody = $('<tbody>'),
	    		$tr = $('<tr>'),
	    		i,j;

	    	for (i = 0; i < cnt; i += 1) {
	            if (body) {
	                for (j = 0; j < bodyColCnt; j++) {
						if (body[j].details) {
							$tr.append($("<" + (j==0?"th":"td") + " class='details'>").text(json[i][body[j].field]));
						} else {
		                    $tr.append($("<" + (j==0?"th":"td") + ">").text(json[i][body[j].field]));
		                }
	                }
	            }
	            else {
	                for (var p in json[i]) {
	                    $tr.append($("<" + (j==0?"th":"td") + ">").text(json[i][p]));
	                }
	            }

	            $tr.appendTo($tbody);
	            $tr = $('<tr>');
	        }

	        $tbody.appendTo($table);
	    }

	    	displayGrid(settings.datasource);
	};
	/**
	 * JSON 관련, 브라우저별 호환성때문에 따로 사용자객체로 만들어 사용.
	   @namespace fng
	   @class json
	 */
	fng.json = function () {
		//JSON 객체를 지원하는 브라우저는 네이티브 JSON 객체를 사용한다.
		if (window.JSON && window.JSON.parse && window.JSON.stringify) {
			var endsWith___ = /___$/;
			return {
				'parse': function (str) {
					try {
						return window.JSON.parse(str);
					} catch (e) {
						return false;
					}
				},
				'stringify': function (obj) {
					try {
						return window.JSON.stringify(obj, function (k, v) {
							return !endsWith___.test(k) ? v : null;
						});
					} catch (e) {
						return null;
					}
				}
			};
		} else {
        	/**
			* JSON객체 미지원 브라우저일 경우.
			* 더글라스 크락포드 형님 Github에서 일부 가져와 수정함.
			* https://github.com/douglascrockford/JSON-js
			*/

			/**
			* 정수를 2digit 으로 변환 (십의자리를 0으로)
			  @method f
			* @param {number} n
			* @private
			*/
			function f(n) {
				return n < 10 ? '0' + n : n;
			}

			Date.prototype.toJSON = function () {
				return [this.getUTCFullYear(), '-',
					    f(this.getUTCMonth() + 1), '-',
					    f(this.getUTCDate()), 'T',
					    f(this.getUTCHours()), ':',
					    f(this.getUTCMinutes()), ':',
					    f(this.getUTCSeconds()), 'Z'].join('');
			};

			/**
			특수문자 대체 enum
			@const
			@enum {string}
			*/
			var m = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			};

			/**
			json 타입을 문자열로 변환하여 반환한다.
			@method stringify
			@param {*} value 변환할 모든 값
			@return {string} 변환된 문자열
			*/
			function stringify(value) {
				var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g, v;
				switch (typeof value) {
				case 'string':
					return r.test(value) ?
					    '"' + value.replace(r, function (a) {
							var c = m[a];
							if (c) {
								return c;
							}
							c = a.charCodeAt();
							return '\\u00' +
                                Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
					    }) + '"' : '"' + value + '"';
				case 'number':
					return isFinite(value) ? String(value) : 'null';
				case 'boolean':
				case 'null':
					return String(value);
				case 'object':
					if (!value) {
						return 'null';
					}
					a = [];
					if (typeof value.length === 'number' && !value.propertyIsEnumerable('length')) {
						l = value.length;
						for (i = 0; i < l; i += 1) {
								a.push(stringify(value[i]) || 'null');
						}
						return '[' + a.join(',') + ']';
					}
					for (k in value) {
					    if (k.match('___$')) { continue; }
							if (value.hasOwnProperty(k)) {
								if (typeof k === 'string') {
									v = stringify(value[k]);
									if (v) {
										a.push(stringify(k) + ':' + v);
									}
								}
							}
					}
					return '{' + a.join(',') + '}';
				}
				return '';
			}

			return {
				'stringify': stringify,
				'parse': function (text) {
					if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, '@').
				        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
				        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
						return eval('(' + text + ')');
					}
					return false;
				}
			};
		}
	}();

	/**
	각종 유틸리티 함수들
	@namespace fng
	@class util
	*/
	fng.util = function () {
		var parameters = null,
			cache = {};
		/**
		url 스트링을 받아서 파라미터 부분을 반환한다.
		@method parseUrlParams
		@param {string} url
		*/
		function parseUrlParams(url) {
			//url 스트링을 받아서 파라미터 부분을 반환한다.
			//document.location.hash 는 브라우저마다 다를수 있으므로 사용하지 않음.
			var query,
				queryIdx = url.indexOf('?'),
				hashIdx = url.indexOf('#');
			//** 해시부분 처리 보류, 해시있든 없든 파라미터 부분 반환
			//if (hashIdx === -1) {
			query = url.substr(queryIdx + 1);
			//} else {
			//	query = [url.substr(queryIdx + 1, hashIdx - queryIdx - 1), '&', url.substr(hashIdx + 1)].join('');
			//}
			return query.split('&');
		}

		return {
			/**
			객체의 속성갯수를 반환
			@method propLength
			@param {object} 객체
			*/
		    'propLength': function (obj) {
		        var count = 0,
		            i;

		        for (i in obj) {
		            if (obj.hasOwnProperty(i)) {
		                count++;
		            }
		        }
		        return count;
		    },
			/**
			파라미터가 숫자형식이면 true 반환
			@method isNumber
			@param {*} 객체
			*/
		    'isNumber': function (n) {
		        return !isNaN(parseFloat(n)) && isFinite(n);
		    },
			/**
			현재 url에서 파라미터중 해당 name의 값을 반환한다.
			@method getURLParameter
			@param {string} name (필수, 원하는 파라미터 이름)
			@return {string}
			*/
		    'getURLParameter': function (name) {
            	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	        },
			/**
			url에서 파라미터 부분을 객체로 변환하여 반환한다.
			@method getURLParameterObj
			@param {string} opt_url (생략하면 현재 url)
			@return {object}
			*/
		    'getURLParameterObj': function (opt_url) {
		        var no_opt_url = typeof opt_url === 'undefined',
                	i,
		        	j;
		        if (parameters !== null && no_opt_url) {
		            return parameters;
		        }
		        var parsed = {},
					pairs = parseUrlParams(opt_url || document.location.href), //파라미터르 배열로 저장
					unesc = window.decodeURIComponent ? decodeURIComponent : unescape, //이스케이핑된 URL 디코딩
					pos = '',
					argName = '',
					value = '';

		        for (i = 0, j = pairs.length; i < j; ++i) {
		            pos = pairs[i].indexOf('=');
		            if (pos === -1) {
		                continue;
		            }
		            argName = pairs[i].substring(0, pos);
		            value = pairs[i].substring(pos + 1);
		            value = value.replace(/\+/g, ' ');
		            parsed[argName] = unesc(value);
		        }
		        if (no_opt_url) {
		            parameters = parsed;
		        }
		        return parsed;
		    },
		    /**
			객체를 URLEncode된 문자열로 반환한다.
			@method encodeValues
			@param {object} fields 변환할 객체 
			@param {boolean} opt_noEscaping URLEncode 안할 경우 True, 생략하면 false
			@return {string} 변환된 문자열
			*/
		    'encodeValues': function (fields, opt_noEscaping) {
		        var escape = !opt_noEscaping,
				    buf = [],
				    first = false,
				    i;
		        for (i in fields) {
		            if (fields.hasOwnProperty(i) && !/___$/.test(i)) {
		                if (!first) {
		                    first = true;
		                } else {
		                    buf.push('&');
		                }
		                buf.push(escape ? encodeURIComponent(i) : i);
		                buf.push('=');
		                buf.push(escape ? encodeURIComponent(fields[i]) : fields[i]);
		            }
		        }
		        return buf.join('');
		    }
		};
	}();

	/**
	디버깅클래스, fng.debug.enable(true)시 동작
	@class debug
	*/
	fng.debug = function (msg) {
		var isDebug = false;
		return {
			/**
			현재 디버깅 모드를 표시
			@method status
			@return this
			*/
			'status': function () { //상태값을 True로 잠시 바꾼후 원래 상태값을 표시하고 원복
				var wasDebug = isDebug;
				this.enable(true).log('isDebug:' + wasDebug).enable(wasDebug);
				return this;
			},
			/**
			디버깅 모드 변경
			@method enable
			@param {boolean} true or false 로 활성여부 지정
			@return this
			*/
			'enable': function (b) { //상태값을 파라미터값으로 변경
				isDebug = (typeof b === 'boolean') ? b : false;
				return this;
			},
			/**
			콘솔로그가 있는 브라우저에서 로그 출력
			@method log
			@param {*} 콘솔로그 내용
			@return this
			*/
			'log': function (msg) {
				if (isDebug === true) { //콘솔에 로그 찍기, 없으면 얼럿창에 출력
				    if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
				        console.log(msg);
				    } else {
				        //alert(msg);
				    }
				}
				return this;
			}
		};
	}();

	window.fng = window.fng || fng;

}(undefined));


