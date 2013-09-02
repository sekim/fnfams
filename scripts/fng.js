/**
* fng 공통 모듈 - 2013.07.18 - lee dong eun 
*
* @module fng
*/
$(function (undefined) {

	var fng = fng || {};

	//fng 버전
	fng.version = "0.20130718";

	//네임스페이스를 생성한다.
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
			if (typeof parent[parts[i]] === undefined) {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};
	
	//fng.ns('fng.debug');
	//fng.ns('fng.grid');

	/**
	셀렉트박스 생성

	*/
	fng.selectbox = function(settings){
		var $selector = $(settings.selector),
			$selectbox = $('<select></select>'),
			$span = $('<span class="sel_val"></span>');

		if (settings.url) {
			function readSuccess(data){
				for (var p in settings.data) {
					for (var pp=0; pp<data.length; pp++) { 
						$selectbox.append('<option value="' + data[pp][settings.data[p]] + '">' + data[pp][p] + '</options>');	
					}
				}

				$span.text($('option:selected', $selectbox).text());
				$selectbox.change(function(){
					$span.text($('option:selected',this).text());
				});

				$selector.append($selectbox).append($span);

				$('option', $selectbox).eq(settings.defaultIdx || 0).attr("selected", "selected");

				//콜백 등록
				if(settings && settings.callback) {
					settings.callback();
				}				
			}

			function readError(data, status, err){
				fng.debug.log('selectbox error:' + settings.url + ',' + data.status. err);
			}

			function readDone(){
			}

			ajaxSettings = {
	            url: settings.url,
	            success: readSuccess,
	            error: readError,
	            done: readDone
	        }

	        fng.ajax.getJson(ajaxSettings);
		} else {
			if (settings.data) {
				for (var p in settings.data) {
					$selectbox.append('<option value="' + settings.data[p] + '">' + p + '</options>');
				}
			}

			$('option', $selectbox).eq(settings.defaultIdx || 0).attr("selected", "selected");

			$span.text($('option:selected', $selectbox).text());
			$selectbox.change(function(){
				$span.text($('option:selected',this).text());
			});


			$selector.append($selectbox).append($span);

			//콜백 등록
			if(settings && settings.callback) {
				settings.callback();
			}
		}

		function getVal(){
			return $selectbox.val();
		}

		function setVal(val){
			$selectbox.val(val);
			$selectbox.change();
		}

		function val(){
			if(arguments.length !== 0) {
				setVal(arguments[0]);
			} else {			
				return getVal();
			}
		}

		function change(){
			$selectbox.change();
		}

		return {
			'val' : val,
			'change' : change
		};
	};

	/**
    그리드 생성자를 반환하는 클래스
    @namespace fng
    @class grid
    @param {object} 그리드 설정정보
    */
	fng.grid = (function(){
		var gridConstr
		/*
		**그리드 클래스 생성자
		**@class gridConstr
		*/
		gridConstr = function(settings){
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
			if(settings.callback) settings.callback();
		};

		//공개 API
		gridConstr.prototype = {
			/**
			* 그리드 생성자
			* @property constructor
			* @type {function}
			*/
			constructor : fng.grid,
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
	            	$table = $('<table class="table_ty1">'),
	                $thead = $('<thead>'),
	                $colgrp = $('<colgroup>'),
	                $trh = $('<tr>'),
	                $tr = $('<tr>'),
	                header = options.header,
	                headCnt = (header && header.length) || 1, //header 설정 없다면 모든 데이터
	                headColCnt = (header && header[0].length) || fng.util.propLength(options.data[0]),
	                thString = '',
	                body = options.body,
	                i,
	                j,
	                k = 1,	//colgroup 용 인덱스
	                title;

	            if(options.tableClass) {
	            	$table.addClass(options.tableClass);
	            }

	            if(options.divClass) {
	            	$(options.selector).parent().parent().addClass(options.divClass);
	            }

	            target = $table;

				$(options.selector).html('');
				$(options.selector + 'pagearea').remove();
				
				if(options.selectable) {
					$trh.append('<th>선택</th>');
					$colgrp.append('<col class="col' + k + '"/>');
					k++;
				}

		        for (i = 0; i < headCnt; i++) {
		            if (options.headerVisible === false) {
		            	// headColCnt = header[i].length || headColCnt;
		                for (j = 0; j < headColCnt; j++, k++) {
		     //                thString = '<th ';
							// if (header[i][j].details)
							// {
							// 	thString = thString + 'class="details" ';
							// }
		     //                if (header && header[i][j].rspan) {
		     //                    thString += 'rowspan="' + header[i][j].rspan + '" ';
		     //                }
		     //                if (header && header[i][j].cspan) {
		     //                    thString += 'colspan="' + header[i][j].cspan + '" ';
		     //                }
	      //                   $trh.append(thString + '>' + header[i][j].title + '</th>');
	                        if ( i == 0 ) $colgrp.append('<col class="col' + k + '"/>');
		                }
		            	// for (var p in options.data[0]) {
		                //     $trh.append($('<th>' + options.data[0][p] + '</th>'));
		                // }
		            } else {
		            	headColCnt = header[i].length || headColCnt;
		                for (j = 0; j < headColCnt; j++, k++) {
		                    thString = '<th data-field="' + body[j].field + '"';
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
	                        if ( i == 0 ) $colgrp.append('<col class="col' + k + '"/>');
		                }
		            }
		            $trh.appendTo($thead);
		            $trh = $('<tr>');

		        }

		        $colgrp.appendTo($table);
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
		        //할일 소팅 체크박스 제외   	
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
		    		line = (options.page && options.page.line) || options.data.length; //page.line 지정안하면 전체 데이터
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
		    		bodyColCnt = (body && body.length) || options.dataBody[0].length,
		    		i = 0,
		    		j = 0,
		    		k = 0,
		    		tr = '',
		    		td = '',
		    		field,
		    		cls,
		    		key;
		    	
		    	if (!bodyColCnt) {
		    		bodyColCnt = 0;
		    		for (i in options.dataBody[0]) {
					    if (options.dataBody[0].hasOwnProperty(i)) {
					        bodyColCnt++;
					    }
					}
		    	}

		    	for (i = 0; i < cnt; i += 1) {
		    		td = '';
		    		key = '';
		            if (body) {
		                for (j = 0; j < bodyColCnt; j++) {
		                	field = body[j].field;

		                	var align, 
		                		tdData;
		                	if (body[j].align)
		                		align = 'an' + body[j].align.charAt(0);
		                	else
		                		align = 'anc'

		                	if(!options.dataBody[i])
		                		break;
		                	else
		                		key = options.dataBody[i][options.key];

		                	if (j == 0 && options.selectable){
			            		td = td + '<td class="anc"><input type="checkbox"/></td>';
			            	}
							if (body[j].details) {
								if(field) {
									tdData = options.dataBody[i][field]
				                	if (body[j].type && tdData) {
				                		if (body[j].type === 'date') {
				                			tdData = tdData.substring(0,4) + '/' + tdData.substring(4,6) + '/' + tdData.substring(6,8);
				                		}
				                	}
									td = td + '<td class="details">' + tdData + '</td>';
								} else {
									td = td + '<td></td>';
								}
							} else {
			                    if(field) {
			                    	tdData = options.dataBody[i][field]
				                	if (body[j].type && tdData) {
				                		if (body[j].type === 'date') {
				                			tdData = tdData.substring(0,4) + '/' + tdData.substring(4,6) + '/' + tdData.substring(6,8);
				                		}
				                	}
			                    	td = td + '<td class="' + align + '" title="' + tdData + '">' + tdData + '</td>';
			                    } else {
			                   		td = td + '<td></td>';
			                   	}
			                }
		                }
		                for(var l = j; l < bodyColCnt; l++) {
		                	if (l == j && options.selectable){
			            		td = td + '<td></td>';
			            	}
		                	td = td + '<td></td>';
		                }
		            }
		            else {
		            	k = 0;
		                for (var p in options.dataBody[i]) {
			            	if (k == 0 && options.selectable){
			            		td = td + '<td class="' + align + '"><input type="checkbox"/></td>';
			            	}
		                    td = td + '<td class="' + align + '" title="' + options.dataBody[i][p] + '">' + options.dataBody[i][p] + '</td>';
		                    k++;
		                }
		                for(var l = k; l < bodyColCnt; l++) {
		                	if (l == k && options.selectable){
			            		td = td + '<td></td>';
			            	}
		                	td = td + '<td></td>';
		                }

		            }      
		            tr = tr + (options.key?'<tr data-key="' + key + '">':'<tr>') + td + '</tr>'
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
		        var $wrap = $('<div>'),
	                curpage = options.page.curPage,
	                pageCnt = options.pageCnt,
	                totalpages = Math.ceil(options.totalcnt / options.page.line),
	                start = parseInt((curpage - 1) / pageCnt, 10) * pageCnt + 1,
	                i,
	                target = options.selector + 'pagearea';


		        if (curpage > pageCnt) {
	                $wrap.append('<a class="pagelink btn_pgprev2" href="javascript:;" data-link="' + (start - 1) + '"">이전' + pageCnt + '페이지></a> ');
		        } else {
		            $wrap.append('<a class="pagelink btn_pgprev2 disabled" href="javascript:;" data-link="' + (start - 1) + '"">이전' + pageCnt + '페이지></a> ');
		        }

		        if (curpage > 1) {
		            $wrap.append('<a class="pagelink btn_pgprev" href="javascript:;" data-link="' + (curpage - 1) +'">이전페이지</a> ');
		        } else {
		            $wrap.append('<a class="pagelink btn_pgprev disabled" href="javascript:;" data-link="' + (curpage - 1) +'">이전페이지</a> ');
		        }

		        for (i = start; i < start + pageCnt; i += 1) {
		            if (i > totalpages) {
		                break;
		            }
		            if (i === parseInt(curpage, 10)) {
		            	$wrap.append('<a class="pagelink btn_pgtxt txt_active" href="' + i.toString() + '" data-link="' + i + '">' + i + '</a>');
		           	} else {
		           		$wrap.append('<a class="pagelink btn_pgtxt" href="' + i.toString() + '" data-link="' + i + '">' + i + '</a>');
		           	}
		        }

		        if (curpage < totalpages) {
	                $wrap.append(' <a class="pagelink btn_pgnext" href="javascript:;" data-link="' + (parseInt(curpage, 10) + 1) + '">다음페이지</a> ');
	            } else {
		            $wrap.append(' <a class="pagelink btn_pgnext disabled" href="javascript:;" data-link="' + (parseInt(curpage, 10) + 1) + '">다음 페이지</a> ');
		        }

		        if (start + pageCnt - 1 < totalpages) {
	                $wrap.append('<a class="pagelink btn_pgnext2" href="javascript:;" data-link="' + (start + pageCnt) + '">다음' + pageCnt + '페이지</a>');
		        } else {
		            $wrap.append('<a class="pagelink btn_pgnext2 disabled" href="javascript:;" data-link="' + (start + pageCnt) + '">다음' + pageCnt + '페이지</a>');
		        }

		        $(target).html('').addClass('fmspage');

	            //엑셀다운로드 버튼
	            $btnExl = $('<a href="javascript:;" class="btn_exdown2" data-id="' + options.selector + '">엑셀다운로드</a>');
	            $btnExl.appendTo(target);
		        $btnExl.click(function(){
		        	//fng.debug.log('url:' + options.url);
		        	fng.util.saveGridToExcel($(this).attr('data-id').replace('#',''),options) //현재 그리드의 내용만 엑셀로 저장
		        	return false;
		        });

	            //페이지네이션 영역
		        $wrap.addClass('fmspage_wrap').appendTo(target);

		        //현재페이지/전체페이지
		        $('<div class="pggd"><strong>' + curpage + '</strong>/<span>' + totalpages + '</span></div>').appendTo(target);

		        $('.pagelink', target).click(function (ev) {
		            try {			
		                if (typeof pageclickhdl === 'function' && !$(this).hasClass('disabled')) {
		                    pageclickhdl($(this).attr('data-link'));
		                }
		            } catch (e) {
		                fng.debug.log(e.message);
		            } finally {
		                return false;
		            }		
		        });
		        

		        $('a.disabled').css('cursor','default');
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
		        len = th.rows.length; //줄수
		        
		        if (options.page && options.page.line > 1) {
		        	trOld = fng.util.deepCopy(options.data);
		        } else {
		        	var ii, trLen = table.tBodies[0].rows.length;
		        	for(ii = 0; ii < trLen; ii += 1)
		        		trOld.push(table.tBodies[0].rows[ii]);
		        }

		        if (len == 0)
		            return;

		        for (j = 0; j < len; j++) { //rowspan 을 준 헤더가 있을경우도 있으므로 모든 헤더로우를 탐색.
		            th && (thr = th.rows[j]);
		            if (thr) inLen = thr.cells.length;//컬럼수

		            for (i = 0, k = cellCnt; i < inLen; i++, k++) {
		            	if (i === 0 && options.selectable) continue;        	
		                if ($(thr.cells[i]).attr('colspan') && $(thr.cells[i]).attr('colspan') > 1) { //colspan을 준 헤더는 아래 로우에 클릭이벤트를 줘야하므로 생략.
		                    k--;        //colspan을 준 헤더가 제외되었으므로 소팅가능 컬럼갯수를 맞추기 위해 -1
		                    cellCnt--;  //colspan을 준 헤더가 제외되었으므로 루프횟수를 맞추기 위해 -1
		                    continue;
		                }   
		                if (indexArray && (indexArray !== true) && (indexArray.indexOf(k) === -1)) continue;

	                    var dir = false, sText = $(thr.cells[i]).text();
	                    $(thr.cells[i]).text('');
	                    thr.cells[i].style.cursor = 'pointer';           
	                    $(thr.cells[i]).append('<a class="sorticon">' + sText + '</a>');
	                    $(thr.cells[i]).addClass(options.selector.replace(/#/g,'') + 'sortable');	                    
		            }
		            cellCnt += inLen;
		        }
		        $('.sorticon').addClass('icon-chevron-de');
		        defaultSortCol();
		        $(document).off('click','.' + options.selector.replace(/#/g,'') + 'sortable');	
		        $(document).on('click','.' + options.selector.replace(/#/g,'') + 'sortable', function(){
				 	if ($('.sorticon', this).attr('class') === 'sorticon icon-chevron-de')
						dir = false;

					$('.sorticon').attr('class', 'sorticon icon-chevron-de');

                    if (dir === false) {
                        $('.sorticon', this).attr('class', 'sorticon icon-chevron-up');
                        dir = 0;
                  	} else if (dir === 0) {
                      	$('.sorticon', this).attr('class', 'sorticon icon-chevron-down');
                      	dir = 1;
                  	} else if (dir === 1) {
                      	$('.sorticon', this).attr('class', 'sorticon icon-chevron-de');
                      	dir = false;
                      	//세번째 클릭해서 디폴트로 돌아갈때 디폴트 컬럼을 디폴트 정렬로 표시 할까 말까....
                      	//defaultSortCol($(this).index());	//일단 말자...
                  	}

					if (options.page && options.page.line > 1) {
                  		that.sortData(table, options, $(this).attr('data-field'), dir, trOld)
                  	} else { 	
                  		that.sortTable(table, $(this).index(), dir, trOld)
                  	}

			        if (options.page && options.page.line > 1) {
			        	that.paginationing(options, function(page){
			            	that.pageLinkClick(page);
			            });
			        }
		        });
				
				//디폴트 소팅 컬럼 표시
				function defaultSortCol(thisIdx) {
					var idx = options.sort.defaultIdx,
						tdir = options.sort.defaultOrd;

			        if(!isNaN(idx) && tdir) {
						if (tdir === 'asc') {
				    		$('.sorticon', table.tHead.rows[0].cells[idx]).attr('class', 'sorticon icon-chevron-up');
				    		if (thisIdx == idx) dir = 0;
				    	} else if (tdir === 'desc') {
				    		$('.sorticon', table.tHead.rows[0].cells[idx]).attr('class', 'sorticon icon-chevron-down');
				    		if (thisIdx == idx) dir = 1;
				    	} else {
				    		$('.sorticon', table.tHead.rows[0].cells[idx]).attr('class', 'sorticon icon-chevron-up');
				    		if (thisIdx == idx) dir = 0;
				    	}
				    }
			    }
		    },
		    /**
		    * 테이블의 특정 컬럼기준으로 소팅한다.
		      @method sortTable
		    * @param {object} 소팅할 테이블 DOM 오프젝트
		    * @param {number} 기준이되는 컬럼 인덱스
		    * @param {boolean} 오더링 방향을 결정 (1,0)
		    * @param {object} 반환받을 원본 바디
		    */
		    sortTable : function (table, col, reverse, trOld) { //json 데이터타입을 정렬할 경우 col 은 속성의 이름
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

			            //if (fng.util.isNumber(aa) && fng.util.isNumber(bb)) {   // 숫자형식 끼리
			            //    return reverse * (parseFloat(aa) - parseFloat(bb));
			            //} else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리			            	
			                return reverse * (aa.localeCompare(bb));
			            //} else {
			            //    return reverse; // 숫자와 문자 형식일 경우
			            //}
			        });
			        for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // 각 로우를 tbody에 확장
			    }
		    },
		    /**
		    * JSON의 특정 컬럼기준으로 소팅한다.
		      @method sortData
		    * @param {object} 소팅할 데이터 json 객체
		    * @param {object} 페이지네이션 정보를 위해 옵션 객체를 받는다.
		    * @param {string} 기준이 되는 컬럼에 해당하는 json데이터 속성의 이름
		    * @param {boolean} 오더링 방향을 결정 (1,0)
		    * @param {object} 반환받을 원본 데이터
		    */
		    sortData : function (table, options, col, reverse, dataOld) {
			    var i = 0,
			    	field = col, //json 데이터타입을 정렬할 경우 col 은 속성의 이름
			    	type,
			    	cnt;
			    
				if (reverse === false) {
					options.data = fng.util.deepCopy(dataOld);
				} else {
					reverse = -((+reverse) || -1);
					options.page.curPage = 1;
					
					for(cnt=0; cnt<options.body.length; cnt++){
						if (options.body[cnt].field === field) {
							type = options.body[cnt].type || 'string';
							break;
						}
					}

					options.data = options.data.sort(function(a, b) {
						var aa,
							bb;

						if (a[field]) {
							aa = $.trim(a[field].toString().replace(/,/g, ''));
						} else {
							return 1;
						}

						if (b[field]) {
							bb = $.trim(b[field].toString().replace(/,/g, ''));
						} else {
							return -1;
						}

						if(type === 'number'){
							return reverse * (parseFloat(aa) - parseFloat(bb));
						} else {
							return reverse * (aa.localeCompare(bb));
						}
						//문자열 형태로만 정렬 처리 하기 위해 숫자형식 체크는 주석처리함.
						//if (fng.util.isNumber(aa) && fng.util.isNumber(bb)) {   // 숫자형식 끼리
			            //    return reverse * (parseFloat(aa) - parseFloat(bb));
			            //} else if ((typeof aa) === 'string' && (typeof bb) === 'string') {  // 스트링형식 끼리
			            //		return reverse * (aa.localeCompare(bb));
			            //} else {
			            //    return reverse; // 숫자와 문자 형식일 경우
			            //}
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
	fng.validator = {
		types:{},
		messages:[],
		config:{},
		/**
		파라미터 유효성검사 수행 메소드
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
    		if (opt.type === 'xychart') {	//버블차트인경우
    			valAxis = new Array(2);
    			valAxis[0] = new AmCharts.ValueAxis();
    			valAxis[1] = new AmCharts.ValueAxis();
    			valAxis[0].position = 'left';
    			valAxis[0].autoGridCount = true;
    			valAxis[1].position = 'bottom';
    			valAxis[1].autoGridCount = true;
    			// valAxis[0].title = opt.axisTitle[0];
    			// valAxis[1].title = opt.axisTitle[1];
				chart.addValueAxis(valAxis[0]);
				chart.addValueAxis(valAxis[1]);
				valAxis[0].labelsEnabled = false;
				valAxis[1].labelsEnabled = false;
				valAxis[0].autoGridCount = false;
				valAxis[1].autoGridCount = false;

				if (opt.XaxisGuide) {
					var guide;
					valAxis[1].gridCount = opt.XaxisGuide.length;
					for(var c = 0; c < opt.XaxisGuide.length; c++) {
						guide = new AmCharts.Guide();
		                guide.value = opt.XaxisGuide[c].val;
		                guide.lineColor = "#CC0000";
		                guide.label = opt.XaxisGuide[c].label;
		                guide.inside = false; // this puts labels outside plot area
		                guide.lineAlpha = 0; // this makes the actual guide line not to show
		                valAxis[1].addGuide(guide);
					}
				}

				if (opt.YaxisGuide) {
					var guide;
					valAxis[0].gridCount = opt.YaxisGuide.length;
					for(var c = 0; c < opt.YaxisGuide.length; c++) {
						guide = new AmCharts.Guide();
		                guide.value = opt.YaxisGuide[c].val;
		                guide.lineColor = "#CC0000";
		                guide.label = opt.YaxisGuide[c].label;
		                guide.inside = false; // this puts labels outside plot area
		                guide.lineAlpha = 0; // this makes the actual guide line not to show
		                valAxis[0].addGuide(guide);
					}
				}

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

        if (opt.legend) {
	        var legend = new AmCharts.AmLegend();
	        legend.marginLeft = opt.legendMarginLeft;
	        legend.marginTop = 20;
	        chart.addLegend(legend);
	    }
        
        //커서 따라다니는 가이드 라인 표시
        if (opt.guideLine) {
		    var chartCursor = new AmCharts.ChartCursor();
		    chart.addChartCursor(chartCursor);
		}
	    
	    //차트 전체 영역 스크롤바 표시
	    if (opt.scrollbar) {
		    var chartScrollbar = new AmCharts.ChartScrollbar();
            chartScrollbar.hideResizeGrips = false;
		    //chartScrollbar.graph = graph[0];
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
        	var grid = fng.grid({
        		selector : opt.grid,
	            sort : {
	                sortable: true,
	                mode: 'single'
	            },
	            data:chart.dataProvider,
	            header : opt.layerHeader
	        });

		    fng.layer({
		        trigger: opt.selector,
		        triggerEvent: 'click',
		        layer: opt.layer,
		        position: 'cursor',
		        modal: false,
		        docClose: true,
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
	            openLayer(e);	     
	        });

		    if(options.triggerEvent === 'mouseenter' && options.closeEvent === 'mouseleave') {
		    	if (options.position !== 'cursor') {
		    		$(options.layer).bind('mouseleave', function(e){
		    			e.preventDefault();
		    			closeLayer(e);
		    		});
		    	} else {		  
		    		if( options.closeEvent )
				        $(options.trigger).bind(options.closeEvent, function(e){
				        	closeLayer(e);
				        });
		    	}
		    } else {
		    	if( options.closeEvent )
			        $(options.trigger).bind(options.closeEvent, function(e){
			        	closeLayer(e);
			        });
		    }
  
			//레이어의 헤더 부분 클릭후 이동 가능
			$(options.layer + ' .layerhead').bind('mousedown',function(e){
				e.preventDefault();
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
	        		top : e.pageY + 2,
	        		left : e.pageX + 2
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
                left:$(window).width() /2 - layer.outerWidth() /2 + $(window).scrollLeft(),
                width:options.width,
                height:options.height
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
            fng.debug.log('close');
            layer.fadeOut(100, function(){
            olay.fadeOut();
            });
            return false;
        }                
	}
	
	/**
    * 로딩이미지 관련
      @namespace fng
      @class loadimg
    */
	fng.loadimg = function () {
	    var loadimg = '<div id="loadingdiv" style="display:none;"><img id="loadingimg" src="./img/load_fnguide.gif"/></div>';
	    /**
	    * 로딩이미지 보이기
	    * @method show
	    * @param {string} 셀렉터
	    */
	    function show(selector) {
	    	fng.debug.log('show');
	        $(selector).css({ 'opacity': 0.5 });
	        $(loadimg).appendTo(selector).show();
	    }
	    /**
	    * 로딩이미지 숨기기
	    * @method hide
	    * @param {string} 셀렉터
	    */
	    function hide(selector) {
	    	fng.debug.log('hide');
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

		//그리드의 전체내용으로 엑셀 파일 생성
		//아이프레임 삽이하고 데이터 넘기고 저장 (IE에서만 동작함.)
		function saveGridToExcel(targetId, options, fileName)
		{
		    if(document.all)
		    {
		    	var selectorFull = options.selector + '_fullData';
		    	if ($(selectorFull).length > 0)
		    		$(selectorFull).remove();

		    	$('<div id="' + selectorFull.replace('#','') + '" style="display:none">').insertAfter(options.selector);

		    	var gridOption = {
		                url:options.url,
		                selector:options.selector + '_fullData',
		                tableClass:options.tableClass,
		                selectable: false,
		                header:options.header,
		                body:options.body,
		                data:options.data,
		                sort:options.sort,
		                callback: function(){
		                	if(!document.all.excelExportFrame) // 프레임 만든다.
					        {
					            var excelFrame=document.createElement('iframe'); 
					            excelFrame.id='excelExportFrame';
					            excelFrame.position='absolute'; 
					            excelFrame.style.zIndex=-1; 
					            excelFrame.style.top='-10px'; 
					            excelFrame.style.left='-10px'; 
					            excelFrame.style.height='0px'; 
					            excelFrame.style.width='0px'; 
					            document.body.appendChild(excelFrame); // 프레임 삽입
					        }
					        var frmTarget = document.all.excelExportFrame.contentWindow.document; // 프레임 접근
					        
					        frmTarget.open('application/vnd.ms-excel','replace'); 
					        frmTarget.write('<html>');
					        frmTarget.write('<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=euc-kr">\r\n');
					        frmTarget.write('<body>');
					        frmTarget.write(document.getElementById(selectorFull.replace('#','')).outerHTML);
					        frmTarget.write('</body>');
					        frmTarget.write('</html>');
					        frmTarget.close();      
					        frmTarget.charset='UTF-8';
					        //frmTarget.charset="euc-kr";
					        frmTarget.focus();
					        if(!fileName)
					        {
					            fileName='fnfams.xls';
					        }
					        frmTarget.execCommand('SaveAs','false',fileName);
					        $(selectorFull).remove();
		                }
		            }

	            fng.grid(gridOption); //전체데이터를 출력하는 그리드를 만든다.
		    }
		   else
		    {
		    	if(!options.url){
		    		alert('엑셀 파일이 준비되지 않았습니다.');
		    		return false;
		    	}

		    	var filename = '',
			    	menuname = options.url.split('/')[1],
			    	sp,
			    	url;
		    	filename = $('li a[href^="#' + menuname + '/"]', '#gnb').text();
		    	filename = filename + '_' + $('a[class="ac"]', '.lnb_wrap.' + options.url.split('/')[1] + ' > .menubox').text().replace(' ','');
		    	sp = options.url.split('?');
		    	
		    	if (sp.length > 1)
		    		url = options.url.replace('_read.','_excel.') + '&filename=' + filename;
		    	else
		    		url = options.url.replace('_read.','_excel.') + '?filename=' + filename
		    	
		    	var rt = window.open(url);
		    	//alert('엑셀 다운로드 기능은 Internet Explorer에서만 지원됩니다.');
		        return false;
		    }
		}

		return {
			'saveGridToExcel' : saveGridToExcel,
			//입력으로 받은 dom객체에 선택된 텍스트영역이 있는지 체크
			'isTextSelected' : function (input){
		        var startPos = input.selectionStart;
		        var endPos = input.selectionEnd;
		        var doc = document.selection;

		        if(doc && doc.createRange().text.length != 0){
		            return true;
		        }else if (!doc && input.value.substring(startPos,endPos).length != 0){
		           return true;
		        }
		        return false;
		    },
			//배열, 오프벡트 값복사본 생성
			'deepCopy' : function (obj) {
			    if (Object.prototype.toString.call(obj) === '[object Array]') {
			        var out = [], i = 0, len = obj.length;
			        for ( ; i < len; i++ ) {
			            out[i] = arguments.callee(obj[i]);
			        }
			        return out;
			    }
			    
			    if (Object.prototype.toString.call(obj) === '[object Null]') {
			    	return null;
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
		        var no_opt_url = typeof opt_url === undefined,
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
		    },
		    'loadScript': function (url, callback) {
				var script = document.createElement('script');
				script.type = 'text/javascript';

				if(callback) {
					if (script.readyState) {
						script.onreadystatechange = function(){
							if (script.readyState == 'loaded' || script.readyState == 'complete') {
								script.onreadystatechange = null;
								callback();
							}
						}
					} else {
						script.onload = function(){
							callback();
						}
					}
				}

				script.src = url;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		};
	}();

	fng.ajax = function() {
		function getJson(settings) {
			if (settings.url) {
				$.ajax({
					async: settings.async || true,
					type: settings.type || 'GET',
					url: settings.url,
					data: settings.param,
					dataType: 'json',
					success: function(data) {
						settings.success && settings.success(data);
					},
					error: function(data, status, err) {
						settings.error && settings.error(data, status, err);
					},
					complete: function() {
						settings.done && settings.done();
					}			
				});
			}
			return this;
		}

		function queryExecute(settings) {
			if (settings.url) {
				$.ajax({
					type: settings.type || 'GET',
					url: settings.url,
					data: settings.param,
					dataType: 'text',
         			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					success: function(data) {
						settings.success && settings.success(data);
					},
					error: function(data, status, err) {
						settings.error && settings.error(data, status, err);
					},
					complete: function() {
						settings.done && settings.done();
					}			
				});
			}
			return this;
		}

		return {
			'getJson' : getJson,
			'queryExecute' : queryExecute
		};
	}();

	/**
	디버깅클래스, fng.debug.enable(true)시 동작
	@class debug
	*/
	fng.debug = function () {
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
				    if (typeof console !== undefined && typeof console.log !== undefined) {
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

}('undefined'));