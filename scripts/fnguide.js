/**
* fnguide 공통 모듈 - 2013.07.18 - lee dong eun 
*
* @module fnguide
*/
$(function (undefined) {

	var fnguide = fnguide || {};

	//fnguide 버전
	fnguide.version = "0.20130718";

	//네임스페이스를 생성한다.
	fnguide.ns = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = fnguide,
			i;

		//처음 중복되는 전역 객체명은 제거한다.
		if (parts[0] === 'fnguide') {
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
	
	fnguide.ns('fnguide.debug');
	fnguide.ns('fnguide.grid');

	$.fn.fngGrid = function(){

	}
	/**
    그리드 생성자를 반환하는 클래스
    @namespace fnguide
    @class grid
    @param {object} 그리드 설정정보
    */
	fnguide.grid = (function(){
		var gridConstr

		/*
		**그리드 클래스 생성자
		**@class gridConstr
		*/
		gridConstr = function(settings){
			fnguide.debug.enable(true);
			//그리드 설정이 없거나 데이터소스가 없다면 종료
			if (!settings || !settings.data) return;
			//new 키워드를 생략할 수 있도록 this 체크후 재귀호출
			if(!(this instanceof arguments.callee)){
				return new arguments.callee(arguments[0]);
			}

			//기본설정
			this.options = {};
	        this.setOptions(settings);
			this.displayGrid(this.options);
		};

		//공개 API
		gridConstr.prototype = {
			/**
			* 그리드 생성자
			* @property constructor
			* @type {function}
			*/
			constructor : fnguide.grid,
			/**
			* 그리드 모듈 버전
			* @property version
			* @type {string}
			*/
			version : '2.0',			
			/**
			그리드 설정하기
			@method setOptions
			@param {object} 그리드설정객체
			@return {object}
			*/
			setOptions : function(obj) {
				this.options = $.extend({
					pageCnt : 10, //한페이지네이션에 링크로 연결할 페이지 수
					totalcnt: obj.data.length
				}, obj);
			},	
			/**
			그리드영역 그리기
			@method displayGrid
			@param {object} 그리드설정객체
			*/
			displayGrid : function(){			
				var options = this.options,
	            	$table = $('<table class="table table-bordered table-hover" cellspacing="0">'),
	                $thead = $('<thead>'),
	                $trh = $('<tr>'),
	                $tr = $('<tr>'),
	                header = options.header,
	                headCnt = (header && header.length) || 1, //header 설정 없다면 모든 데이터
	                headColCnt = (header && header[0].length) || fnguide.util.propLength(options.data[0]),
	                thString = '',
	                body = options.body,
	                i,
	                j,
	                title;

	            target = $table;

				$(options.selector).html('');
				$(options.selector + 'pagearea').remove();

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
	                        $trh.append(thString + '>' + header[i][j].title + '</th>');
		                }
		            } else {
		                // for (var p in options.data[0]) {
		                //     $trh.append($('<th>' + options.data[0][p] + '</th>'));
		                // }
		            }
		            $trh.appendTo($thead);
		            $trh = $('<tr>');
		        }

		        $thead.appendTo($table);
		        $table.append(this.displayGridBody(this.getDataBody(options)));
		        $(options.selector).html('').append($table);

	            //페이지네이션 영역을 설정했다면 페이지네이션 생성
		        if (options.page && options.page.line > 1) {
                    $pageArea = $('<div id="' + options.selector.replace('#','') + 'pagearea"></div>');
                    $pageArea.insertAfter(options.selector);
		        	var that = this;	
		            this.paginationing(options, function(page){	            	
		            	that.pageLinkClick(page);
		            });
		        }

		        if (options.sort && options.sort.sortable) {	        	
	            	this.makeSortTable(options, this);
		        }
	        
			},
			pageLinkClick : function(page){
				this.options.page.curPage = page;        
        		//$('tbody', $(this.options.selector)).html('');		    

            	//$('table', $(this.options.selector)).append('<tbody></tbody>');
            	//$('table', $(this.options.selector)).append(this.displayGridBody(this.getDataBody(this.options)));
            	$('tbody', $(this.options.selector)).html(this.displayGridBody(this.getDataBody(this.options)));
  		        var that = this;   	
            	this.paginationing(this.options,function(page){		
		            	that.pageLinkClick(page);
		            });				
			},
			/**
			그리드 Body 영역 가져오기
			@method getDataBody
			@param {object} 그리드설정객체
			@return {object} 그리드몸통부분객체
			*/
			getDataBody : function(options) {		
		    	var start,
		    		curPage = (options.page && options.page.curPage) || 1,
		    		line = (options.page && options.page.line) || options.data.length;
	    		start = (curPage - 1) * line;	
				var tmparr = [];
				for(var j = start; j < start + line; j++)
					tmparr.push(options.data[j]);
				var returnvalue = $.extend({dataBody:tmparr},options);
	    		return returnvalue;
		    },
			/**
			그리드 Body 영역 그리기
			@method displayGridBody
			@param {object} 그리드설정객체
			@return {object} 그리드몸통JQUERY객체
			*/
		    displayGridBody : function(options) {	
		    	var cnt = options.dataBody.length,
		    		body = options.body,
		    		bodyColCnt = (body && body.length) || options.dataBody.length,
		    		$tbody = $('<tbody>'),
		    		$tr = $('<tr>'),
		    		i = 0,
		    		j = 0,
		    		tr = '',
		    		td = '';

		    	for (i = 0; i < cnt; i += 1) {
		    		td = '';
		            if (body) {
		                for (j = 0; j < bodyColCnt; j++) {
							if (body[j].details) {
								//$tr.append($("<" + (j==0?"th":"td") + " class='details'>" + options.dataBody[i][body[j].field] + "</" + (j==0?"th":"td") + ">"));
								td = td + "<" + (j==0?"th":"td") + " class='details'>" + options.dataBody[i][body[j].field] + "</" + (j==0?"th":"td") + ">";
							} else {
			                    //$tr.append($("<" + (j==0?"th":"td") + ">" + options.dataBody[i][body[j].field] + "</" + (j==0?"th":"td") + ">"));
			                    td = td + "<" + (j==0?"th":"td") + ">" + options.dataBody[i][body[j].field] + "</" + (j==0?"th":"td") + ">";
			                }
		                }
		            }
		            else {
		                for (var p in options.dataBody[i]) {
		                    //$tr.append($("<" + (j==0?"th":"td") + ">" + options.dataBody[i][p] + "</" + (j==0?"th":"td") + ">"));
		                    td = td + "<" + (j==0?"th":"td") + ">" + options.dataBody[i][p] + "</" + (j==0?"th":"td") + ">";
		                }
		            }      
		            //$tr.appendTo($tbody);
		            //$tr = $('<tr>');
		            tr = tr + '<tr>' + td + '</tr>'
		        }			        
		        return tr;
		    },
			/**
			페이지네이션 그리기
			@method paginationing
			@param {object} 그리드설정객체
			@param {function} 페이지링크클릭핸들러
			*/
		    paginationing : function (options, pageclickhdl) {
		        var $ul = $('<ul>'),
	                $li = $('<li>'),
	                $a = $('<a>'),
	                curpage = options.page.curPage,
	                pageCnt = options.pageCnt,
	                totalpages = Math.ceil(options.totalcnt / options.page.line),
	                start = parseInt((curpage - 1) / pageCnt, 10) * pageCnt + 1,
	                i,
	                target = options.selector + 'pagearea';

		        if (curpage > pageCnt) {
		            $a = $('<a class="pagelink" href="' + (start - 1) + '" data-link="' + (start - 1) + '>').text('이전' + pageCnt + '페이지');
	                $ul.append($('<li>').append($a));
		        } else {
		            $a = $('<a>').text('이전' + pageCnt + '페이지');
		            $ul.append($('<li>').append($a).addClass('disabled'));
		        }

		        if (curpage > 1) {
		            $a = $('<a class="pagelink" href="' + (curpage - 1) + '">').text('이전페이지');
		            $ul.append($('<li>').html('<a class="pagelink" href="' + (curpage - 1) + '" data-link="' + (curpage - 1) + '">이전페이지</a>'));
		        } else {
		            $a = $('<a>').text('이전페이지');
		            $ul.append($('<li>').append($a).addClass('disabled'));
		        }

		        for (i = start; i < start + pageCnt; i += 1) {
		            if (i > totalpages) {
		                break;
		            }
		            $a = $('<a class="pagelink" href="' + i + '">').text(i);
		            $li = $('<li>').html('<a class="pagelink" href="' + i.toString() + '" data-link="' + i + '">' + i + '</a>');
		            if (i === parseInt(curpage, 10)) $($li).addClass('disabled');
		            $ul.append($li);
		        }

		        if (curpage < totalpages) {
		            $a = $('<a class="pagelink" href="' + (parseInt(curpage, 10) + 1) + '">')
	                    .text('다음페이지');

	                $ul.append($('<li>').html('<a class="pagelink" href="' + (parseInt(curpage, 10) + 1) + '" data-link="' + (parseInt(curpage, 10) + 1) + '">다음페이지</a>'));
	            } else {
		            $a = $('<a>').text('다음페이지');
		            $ul.append($('<li>').append($a).addClass('disabled'));
		        }

		        if (start + pageCnt - 1 < totalpages) {
		            $a = $('<a class="pagelink" href="' + (start + pageCnt) + '" data-link="' + (start + pageCnt) + '">')
	                    .text('다음' + pageCnt + '페이지');
	                $ul.append($('<li>').append($a));
		        } else {
		            $a = $('<a>').text('다음' + pageCnt + '페이지');
		            $ul.append($('<li>').append($a).addClass('disabled'));
		        }

		        $(target).html('');
		        $ul.appendTo(target);

		        $('.pagelink', target).click(function (ev) {
		            try {			
		                if (typeof pageclickhdl === 'function') {		                	
		                    pageclickhdl($(this).attr('data-link'));
		                }
		            } catch (e) {
		                fnguide.debug.log(e.message);
		            } finally {
		                return false;
		            }		
		        });
		    },
		    /**
	        * 테이블에 클릭 이벤트 할당 (클릭 이벤트 핸들러는 소팅함수 호출)
	          @method makeSortTable
	        * @param {object} 소팅할 테이블 DOM 오프젝트, 또는 셀렉터 스트링
	          @param {object} 소팅 인덱스
	          @param {string} 소팅타입(싱글,멀티)개발중
	        */
		    makeSortTable : function (options, that) {
		        var th, thr, i, j, k, len, inLen, cellCnt = 0,
		        	table = $('table', options.selector)[0],
					sortMode = options.sort.sortMode || 'single',
					indexArray = options.sort.sortable || true, //소팅할 헤더 배열(기본true는 전체헤더)
					trOld = [];
		        if (typeof table === 'string') {
		            table = $(table)[0];
		        }

		        th = table.tHead;
		        len = th.rows.length;
		        
		        if (options.page && options.page.line > 1) {
		        	trOld = fnguide.util.deepCopy(options.data);
		        } else {
		        	var ii, trLen = table.tBodies[0].rows.length;
		        	for(ii = 0; ii < trLen; ii += 1)
		        		trOld.push(table.tBodies[0].rows[ii]);
		        }

		        if (len == 0)
		            return;

		        for (j = 0; j < len; j++) { //rowspan 을 준 헤더가 있을경우도 있으므로 모든 헤더로우를 탐색.
		            th && (thr = th.rows[j]);
		            if (thr) inLen = thr.cells.length;

		            for (i = 0, k = cellCnt; i < inLen; i++, k++) {            	
		                if ($(thr.cells[i]).attr('colspan') && $(thr.cells[i]).attr('colspan') > 1) { //colspan을 준 헤더는 아래 로우에 클릭이벤트를 줘야하므로 생략.
		                    k--;        //colspan을 준 헤더가 제외되었으므로 소팅가능 컬럼갯수를 맞추기 위해 -1
		                    cellCnt--;  //colspan을 준 헤더가 제외되었으므로 루프횟수를 맞추기 위해 -1
		                    continue;
		                }   
		                if (indexArray && (indexArray !== true) && (indexArray.indexOf(k) === -1)) continue;

	                    var dir = false;
	                    thr.cells[i].style.cursor = 'pointer';
	                    $(thr.cells[i]).append('<div class="sorticon"><i class="icon-chevron-down"></i></div>');
	                    $('.sorticon').css('visibility', 'hidden');
	                    $(thr.cells[i]).addClass(options.selector.replace(/#/g,'') + 'sortable');	                    
		            }
		            cellCnt += inLen;
		        }

		        $(document).on('click','.' + options.selector.replace(/#/g,'') + 'sortable', function(){
				 	if ($('.sorticon', this).css('visibility') === 'hidden')
						dir = false;

					$('.sorticon', table).css('visibility', 'hidden');

                    if (dir === false) {
                        $('.sorticon', this).find('i').attr('class', 'icon-chevron-down');
                        $('.sorticon', this).css('visibility', 'visible');
                        dir = 0;
                  	} else if (dir === 0) {
                      	$('.sorticon', this).find('i').attr('class', 'icon-chevron-up');
                      	$('.sorticon', this).css('visibility', 'visible');
                      	dir = 1;
                  	} else if (dir === 1) {
                       	$('.sorticon', this).css('visibility', 'hidden');
                      	dir = false;
                  	}

					if (options.page && options.page.line > 1) {
                  		that.sortData(table, options, $(this).index(), dir, trOld)
                  	} else {
                  		that.sortTable(table, $(this).index(), dir, trOld)
                  	}

			        if (options.page && options.page.line > 1) {
			        	that.paginationing(options, function(page){
			            	that.pageLinkClick(page);
			            });
			        }
		        });
		    },
		    /**
		    * 테이블의 특정 컬럼기준으로 소팅한다.
		      @method sortTable
		    * @param {object} 소팅할 테이블 DOM 오프젝트
		    * @param {number} 기준이되는 컬럼 인덱스
		    * @param {boolean} 오더링 방향을 결정 (1,0)
		    * @param {object} 반환받을 원본 바디
		    */
		    sortTable : function (table, col, reverse, trOld) {
		        var tb = table.tBodies[0], //<tbody>에 한해서만 소팅을 수행한다.
				  	tr = [], // = Array.prototype.slice.call(tb.rows, 0), // 모든 row를 배열로 인풋
	              	i,
	              	trLen = tb.rows.length;

	              	for(var j = 0; j < trLen; j++)
	              		tr.push(tb.rows[j]); // 모든 row를 배열로 인풋
	          
	          	if (reverse === false) {
	          		for (i = 0; i < trOld.length; ++i) tb.appendChild(trOld[i]); // 소팅 해제 원본으로 복구.
	          	} else {
		        	reverse = -((+reverse) || -1);

			        tr = tr.sort(function (a, b) { // 소팅한다.	        	
			            var aa = $.trim((a.cells[col].textContent || a.cells[col].innerText).replace(/,/g, '')),
		                    bb = $.trim((b.cells[col].textContent || b.cells[col].innerText).replace(/,/g, ''));

			            if (fnguide.util.isNumber(aa) && fnguide.util.isNumber(bb)) {   // 숫자형식 끼리
			                return reverse * (parseFloat(aa) - parseFloat(bb));
			            } else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리
			                return reverse * (aa.localeCompare(bb));
			            } else {
			                return reverse; // 숫자와 문자 형식일 경우
			            }
			        });
			        for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // 각 로우를 tbody에 확장
			    }
		    },
		    /**
		    * JSON의 특정 컬럼기준으로 소팅한다.
		      @method sortData
		    * @param {object} 소팅할 데이터 json 객체
		    * @param {number} 기준이되는 컬럼 인덱스
		    * @param {boolean} 오더링 방향을 결정 (1,0)
		    * @param {object} 반환받을 원본 데이터
		    */
		    sortData : function (table, options, col, reverse, dataOld) {
			    var i = 0,
			    	field;

			    for(p in options.data[0]) {
			    	if(col === i) field = p;
			    	i++;
			    }
				if (reverse === false) {
					options.data = fnguide.util.deepCopy(dataOld);
				} else {
					reverse = -((+reverse) || -1);
					options.page.curPage = 1;
					options.data = options.data.sort(function(a, b) {
						var aa = $.trim(a[field].toString().replace(/,/g, '')),
							bb = $.trim(b[field].toString().replace(/,/g, ''));

						if (fnguide.util.isNumber(aa) && fnguide.util.isNumber(bb)) {   // 숫자형식 끼리
			                return reverse * (parseFloat(aa) - parseFloat(bb));
			            } else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리
			                return reverse * (aa.localeCompare(bb));
			            } else {
			                return reverse; // 숫자와 문자 형식일 경우
			            }
					});
				}
			$('tbody', $(table)).remove();
			$(table).append(this.displayGridBody(this.getDataBody(options)));
		    }
		};

		return gridConstr;
	}());

	/**
	유효성 검사기
	@namespace fng
	@class validator
	*/
	fnguide.validator = {
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

	fnguide.validator.types.isNonEmpty = {
		validate: function(value) {
			return value !== '';
		},
		instuctions: '이 값은 필수 입니다.'
	};

	fnguide.validator.types.isNonEmptyArray = {
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
	fnguide.chart = function(settings) {
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
		fnguide.validator.config = {
			selector: 'isNonEmpty',
			categoryField: 'isNonEmpty',
			graph: 'isNonEmptyArray'
		};

		//유효성 검사
		fnguide.validator.validate(opt);
		if (fnguide.validator.hasErrors()) {
			fnguide.debug.log(fnguide.validator.messages.join('\n'));
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
	        			fnguide.debug.log(prop);
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
        	var grid = fnguide.grid({
        		selector : opt.grid,
	            sort : {
	                sortable: true,
	                mode: 'single'
	            },
	            data:chart.dataProvider,
	            header : opt.layerHeader
	        });

		    fnguide.layer({
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
	fnguide.layer = function(settings){
		var options = $.extend({
            trigger: '.modalLink',
            triggerEvent: 'click',
            position: 'trigger',
	        offsetY: 0,
	        offsetX: 0,
            modal: true,
            movable: true,
            width: 400,
            height: 500
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
                left:p.left + options.offsetX + 'px',
                width:options.width,
                height:options.height
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
	fnguide.ajax = function (selector, settings) {
	    if (!selector) { return; }
	    var defaults = {
			        type: 'get',
			        async: true,
			        dataType: 'json',
			        contentType: 'application/json; charset=utf-8'
			    },
	        settings = $.extend(defaults, settings || {});

	    fnguide.loadimg.show(selector);
		fnguide.debug.log('url:' + settings.url);
		fnguide.debug.log('term:' + settings.spdata.term);
		fnguide.debug.log('type:' + settings.spdata.type);
		fnguide.debug.log('page:' + settings.spdata.page);
		fnguide.debug.log('lines:' + settings.spdata.lines);
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
                fnguide.loadimg.hide(selector);
	        }
	    });    
	};

    /**
    * 로딩이미지 관련
      @namespace fng
      @class loadimg
    */
	fnguide.loadimg = function () {
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
	각종 유틸리티 함수들
	@namespace fnguide
	@class util
	*/
	fnguide.util = function () {
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
			'deepCopy' : function (obj) {
			    if (Object.prototype.toString.call(obj) === '[object Array]') {
			        var out = [], i = 0, len = obj.length;
			        for ( ; i < len; i++ ) {
			            out[i] = arguments.callee(obj[i]);
			        }
			        return out;
			    }
			    if (typeof obj === 'object') {
			        var out = {}, i;
			        for ( i in obj ) {
			            out[i] = arguments.callee(obj[i]);
			        }
			        return out;
			    }
			    return obj;
			},
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
	디버깅클래스, fnguide.debug.enable(true)시 동작
	@class debug
	*/
	fnguide.debug = function () {
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

	window.fnguide = window.fnguide || fnguide;

}('undefined'));