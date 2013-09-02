$(function(){
	var reload = false;

	//캘린더가 있는 화면일 경우 캘린더 인풋의 포맷팅된 스트링을 'yyyymmdd' 형태로 가져오기 위해 jquery 메서드인 .fn.val()을 오버라이드한다.
    $.fn.old_val = $.fn.val;
	$.fn.val = function () {
		//인풋엘리먼트이며 calendar 클래스를 가졌다면 캘린더로 쓰인다고 가정하고 진행.
	    if ($(this).prop("tagName") === 'INPUT' && $(this).hasClass('fncalendar') === true) {
	    	if (arguments.length == 1) {
	    		var text = arguments[0];
				if ($.isNumeric(text) && text.length == 8){
					text = text.substring(0,4) + '/' + text.substring(4,6) + '/' + text.substring(6,8);
					this.old_val.call(this, text);
				}else{
					this.old_val.call(this, text);
				}
				return;
	    	} else if (arguments.length == 0){
	    		var jqueryUiDatePicker = arguments.callee.caller.toString().substring(0,25);
	    		if( jqueryUiDatePicker === 'function(inst, noDefault)') {
	    			return this.old_val.apply(this, arguments)
			    } else {
		        	return this.old_val.apply(this, arguments).toString().replace(/\//g,''); // yyyy/mm/dd -> yyyymmdd
		        }
		    }
	    }
	    //캘린더가 아니라면 원본 val() 실행.
	    return this.old_val.apply(this, arguments);
	};

	fng.debug.enable(true);
	//fams사이트용 공통 추가
	//fnguide 공통에 넴스페이스 추가후 함수 정의한다.
	if (fng && fng.ns) {
		//유저정보
		fng.ns('fng.fams.info');
		fng.fams.info = {
			user_id:$('#iuser_id').val(),
			user_nm:$('#iuser_nm').val(),
			cust_cd:$('#icust_cd').val(),
			cust_nm:$('#icust_nm').val(),
			staff_yn:$('#istaff_yn').val(),
			staff_nm:$('#istaff_nm').val(),
			staff_tel:$('#istaff_tel').val()
		};

		//대메뉴별 경로 변수
		fng.ns('fng.fams.path');
		//오늘 날짜 가져오기
		fng.ns('fng.fams.date.today');
		fng.fams.date.today = function(val, gb){
			var d = new Date(),
				month, day, output;
			if (val) {
				gb = gb || 'D'; 
				if(gb.toUpperCase() === 'D'){
					d.setDate(d.getDate() + val);
				} else if(gb.toUpperCase() === 'M') {
					d.setMonth(d.getMonth() + val);
				} else if(gb.toUpperCase() === 'Y') {
					d.setYear(d.getFullYear() + val);
				}
			}

			month = d.getMonth()+1;
			day = d.getDate();
			output = d.getFullYear() + '/' +  (month<10 ? '0' : '') + month + '/' + 
		    (day<10 ? '0' : '') + day;
			return output;
		}

		fng.ns('fng.fams.today');
		fng.fams.today = function(val, gb){
			return fng.fams.date.today(val, gb);
		}

		//펀드보유내역 최근 날짜 가져오기
		fng.ns('fng.fams.date.current');
		fng.fams.date.current = function(id, callback){
			var curDate;
			ajaxSettings = {
				async : false,
	            url: '/fund_current_date.asp?cust_cd=' + fng.fams.info.cust_cd,
	            success: function(d){
	            	$(id).val(d.toString());
	            	callback();
	            },
	            error: function(data, status, err){
	            	$(id).val(fng.fams.date.today());
	            	callback();
	            },
	            done: function(){
	            	return false;
	            }
	        }

	        fng.ajax.getJson(ajaxSettings);
		}

		//기준일로 부터 날짜 계산 결과 반환
		fng.ns('fng.fams.date.diff');
		fng.fams.date.diff = function(date, val, gb){
			var d = new Date(date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8)),
				month, day, output;
				val = parseInt(val, 10);
			if (val) {
				gb = gb || 'D'; 
				if(gb.toUpperCase() === 'D'){
					d.setDate(d.getDate() + val);
				} else if(gb.toUpperCase() === 'M') {
					d.setMonth(d.getMonth() + val);
				} else if(gb.toUpperCase() === 'Y') {
					d.setYear(d.getFullYear() + val);
				}
			}

			month = d.getMonth()+1;
			day = d.getDate();
			output = d.getFullYear() + '/' +  (month<10 ? '0' : '') + month + '/' + 
		    (day<10 ? '0' : '') + day;
			return output;
		}

		//최근날짜 셋팅, 조회버튼 클릭 등. 초기화 설정하기
		fng.ns('fng.fams.date.init');
		fng.fams.date.init = function(){
			if ($('#trd_dt').length > 0) {
				fng.fams.date.current('#trd_dt',function(){
					if ($('#fr_dt').length > 0) {
						var opt, 
							val = -1, 
							gb = 'm';
						
						if($('#fr_dt').attr('data-term')) {
							opt = $('#fr_dt').attr('data-term').split(',');
							val = opt[0];
							gb = opt[1];
						}
			        	$('#fr_dt').val(fng.fams.date.diff($('#trd_dt').val(), val, gb));
			        }
			        if($('#btn_read').length > 0 ) {
				        $('#btn_read').click();
				    }
			    })
			}

			if ($('#to_dt').length > 0){
				fng.fams.date.current('#to_dt',function(){
					if ($('#fr_dt').length > 0) {
						var opt, 
							val = -1, 
							gb = 'm';
						if($('#fr_dt').attr('data-term')) {
							opt = $('#fr_dt').attr('data-term').split(',');
							val = opt[0];
							gb = opt[1];
						}
			        	$('#fr_dt').val(fng.fams.date.diff($('#to_dt').val(), val, gb));
			        }
			        if($('#btn_read').length > 0 ) {
				        $('#btn_read').click();
				    }
			    })
			}
		}

		//캘린더생성
		fng.ns('fng.fams.calendar');
		fng.fams.calendar = function (){
			$.datepicker.regional['ko'] = {
		        closeText: '닫기',
		        prevText: '이전달',
		        nextText: '다음달',
		        currentText: '오늘',
		        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		        monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		        dayNames: ['일','월','화','수','목','금','토'],
		        dayNamesShort: ['일','월','화','수','목','금','토'],
		        dayNamesMin: ['일','월','화','수','목','금','토'],
		        weekHeader: 'Wk',
		        dateFormat: 'yy/mm/dd',
		        firstDay: 0,
		        isRTL: false,
		        showMonthAfterYear: false,
		        yearSuffix: '년'
		    };

			$('input.fncalendar').on('input',function(){ //유저가 날짜를 입력했을 경우 포맷팅한다.
				var text = $(this).val();
				if ($.isNumeric(text) && text.length == 8){
					$(this).val(text.substring(0,4) + '/' + text.substring(4,6) + '/' + text.substring(6,8));
				}
				return;
			}).on('change',function(){	//캘린더UI를 통해 입력했을경우 캘린더 버튼으로 포커싱 전환한다.
				var dateFormat = /^[0-9]{8}$/;
				if (dateFormat.test($(this).val())) {
					$(this).next().focus();
				};
			});

			$('input.fncalendar').datepicker( "destroy" );
			$('input.fncalendar').datepicker().datepicker('option', 'showAnim', 'slideDown').datepicker( "option",$.datepicker.regional['ko'] );
			
			$('.btn_calopen').click(function(){
		        $('#' + $(this).attr('data-id')).focus();
		        return false;
		    });
		}

		//유효성 검사, 문자열 길이 체크
		fng.ns('fng.fams.checkLength');
		fng.fams.checkLength = function(selector, len, msg){
			//입력시
		    $(selector).keydown(function(e){
		        if(!fng.util.isTextSelected($(this)[0])){
		            var keyCode = e.keyCode || e.which, 
		                inp = String.fromCharCode(keyCode);
		            if (/[a-zA-Z0-9-_ ]/.test(inp)) {
		                if($(this).val().length >= len) {
		                    if($('#' + $(this).attr('id') + '_cmt').length === 0) {
		                        $('#cmt').append('<li style="color:red;" id="' + $(this).attr('id') + '_cmt">' + msg + '</li>');
		                    }
		                    e.preventDefault();
		                    return false;
		                } else {
		                    $('#' + $(this).attr('id') + '_cmt').remove();
		                }
		            }
		        }
		    }).focusout(function(){	//포커스아웃시 유효성체크
		        if($(this).val().length <= len) {
		            $('#' + $(this).attr('id') + '_cmt').remove();
		        } else {
		            if($('#' + $(this).attr('id') + '_cmt').length === 0) {
		                $('#cmt').append('<li style="color:red;" id="' + $(this).attr('id') + '_cmt">' + msg + '</li>');
		            }
		        }
		    });
		}

		//로그인여부 체크
		fng.ns('fng.fams.wasLogin');
		fng.fams.wasLogin = function(url){
			function login(id,pw){
				function readSuccess(d){
			  		var userData = d[0],
			  				check_cd = userData.CHK_CD;
			  		if (check_cd !== 'OK') {	//로그인성공
			  			window.location = '/intro.fng?rtnUrl=' + url;
			  		}
			  	}

			  	function readError(data, status, err){
			  		fng.debug.log(data.status).log(err);
			  	}

			  	function readDone(){
			  	}

			  	var param = {id:id, pw:pw};
			  	ajaxSettings = {
			        url: '/login_check_idx.asp',
			        param: param,
			        success: readSuccess,
			        error: readError,
			        done: readDone
			    }

			    fng.ajax.getJson(ajaxSettings);
		    }

		    login($.cookie('fams_user_id'), $.cookie('fams_fngidx'));
		}

		//메뉴별 js 파일 찾기
		fng.ns('fng.fams.getScript');
		fng.fams.getScript = function(){
			var jsFileNm = $('a', $('.lnb_wrap').filter(function (index) {
                return $(this).css("display") === "block";
			})).filter(function (index){
				return $(this).hasClass('ac');
			}).attr('href').replace('#','').replace('/','_');

			fng.util.loadScript('/scripts/' + jsFileNm + '.js');
		}

		//공통 얼럿 메시지
		fng.ns('fng.fams.alert');
		fng.ns('fng.fams.alert.ready');
		fng.fams.alert = function(s){
			alert(s);
			return false;
		}
		fng.fams.alert.ready = function(){
			fng.fams.alert('중비중입니다.');
			return false;
		}
	}	

	//1depth 설정
	function setDepth1Menu(d1){
		fng.fams.path = '/' + d1;
		$('li a', '#gnb').removeClass('ac');
		$('li a[href^="#' + d1 + '/"]', '#gnb').addClass('ac');
		$('li a[href^="#' + d1 + '/"]', '#gnb').unbind('focusout');
		$('h1','.content').eq(0).text($('li a[href^="#' + d1 + '/"]', '#gnb').text());
	}

    //2depth 설정
	function setDepth2Menu(d1, d2){
		$('.lnb_wrap').css('display','none');
        $('.lnb_wrap.' + d1).css('display','block');
        $('a', '.lnb_wrap.' + d1 + ' > .menubox').removeClass('ac');
        $('a[href="#' + d1 + '/' + d2 + '"]', '.lnb_wrap.' + d1 + ' > .menubox').addClass('ac');
	}

	//해당 메뉴의 아티클 전체영역 가져오기
	function setArticle(d1, d2){
		$.ajax({
			type:'GET',
			url: d1 + '/' + d1 + '_' + d2 + '.asp',
			dataType:'html',
			contentType:'text/html; charset=UTF-8',
			cache: false,
			success: function(html){
				$('article').html('').append(html);
				fng.fams.getScript();	//각 화면의 스크립트 불러오기
				$('.btn_print').click(function(){
				    var contents = $('article').innerHTML;
		            var oldPage = document.body.innerHTML;

		            document.body.innerHTML = 
		              "<html><head><title></title></head><body>" + 
		              contents + "</body>";

		            window.print();

		            document.body.innerHTML = oldPage;
					return false;
				}).css('display','none');
			},
			error: function(){
				var errStr = '<div class="cont_wrap">';
					errStr = errStr + '<div class="guide_area virt_clr">';
					errStr = errStr + '<a href="" class="btn_print">인쇄</a>';
					errStr = errStr + '</div>';
					errStr = errStr + '<section class="section_pg">';
					errStr = errStr + '<h1 class="pg_title">준비중입니다...</h1>';
					errStr = errStr + '<section class="section_box">';
					errStr = errStr + '<div class="p_b6">';
					errStr = errStr + '<div class="option_t3_box virt_clr">';
					errStr = errStr + '<div class="fbox fbox_ty1">';
					errStr = errStr + '<label for="">기준일자</label>';
					errStr = errStr + '<div class="cad_ty1">';
					errStr = errStr + '<input id="trd_dt" name="" type="text" maxlength="10" class="int_ty1 fncalendar" />';
					errStr = errStr + '<a href="" data-id="trd_dt" class="btn_calopen">달력</a>';
					errStr = errStr + '</div>';
					errStr = errStr + '</div>';
					errStr = errStr + '<div class="fbox fbox_ty1">';
					errStr = errStr + '<label for="">단위</label>';
					errStr = errStr + '<div class="txt_ty1">( %, 원, &nbsp;</div>';
					errStr = errStr + '<div class="sel_ty2" id="selectUnitFund">';
					errStr = errStr + '</div>';
					errStr = errStr + '<div class="txt_ty1">&nbsp;)</div>';
					errStr = errStr + '</div>';
					errStr = errStr + '<p class="btn_group virt_clr">';
					errStr = errStr + '<a id="btn_read" href="" class="btn_view">조회</a>';
					errStr = errStr + '</p>';
					errStr = errStr + '</div>';
					errStr = errStr + '</div></section></section><div>';
				
				$('article').html('').append(errStr);
			},
			complete: function(){

			}
		});
	}
	
	if ($.sammy) {
		//2depth 까지 히스토리 관리.
		//화면에서 옵션변경, 조회등은 히스토리 관리 안함.
		var app = $.sammy(function () {
		        this.get('#:depth1/:depth2', function (context) {
		            var d1 = this.params["depth1"],
		            	d2 = this.params["depth2"];
		            fng.fams.wasLogin(d1 + '/' + d2);
		            setDepth1Menu(d1);
		            setDepth2Menu(d1, d2);
		            setArticle(d1, d2);
		        });
		    });

		app.run($('h1>a', '.header_wrap').attr('href'));

		$('li a', '#gnb').focus(function(){
			if (!$(this).hasClass('ac')) {
				$(this).addClass('ac');
			    $(this).focusout(function(){
			    	$(this).removeClass('ac');
			    });
			}
		});
	}


	//공통 이벤트	
	$('#logout').click(function(){
		if (confirm("로그아웃 하시겠습니까?") == true){    //확인
			logout();
	    	window.location = 'http://www.fnfams.com/intro.fng';
	    }else{   //취소
	        return;
	    }
	});

	function logout(){
		$.removeCookie('fams_user_id');
		$.removeCookie('fams_user_nm');
		$.removeCookie('fams_user_pw');
		$.removeCookie('fams_co_cd');
		$.removeCookie('fams_co_nm');
		$.removeCookie('fams_staff_yn');
		$.removeCookie('fams_staff_nm');
		$.removeCookie('fams_staff_tel');
		$.removeCookie('fams_fngidx');
	}

	$(window).keydown(function(e){
		if(e.keyCode == 116){
	      	reload = true;
	    }
	});

	$(window).bind('beforeunload', function(){
	  if(!reload && $.cookie('fams_user_id')) {
			if (confirm("FAMS창을 닫습니다.\n로그아웃 하시겠습니까?\n(확인:로그아웃,  취소:로그인유지)") == true){    
				logout();
		    }else{   //취소
		      	return;
		    }
		}
	});

	function abc(){
		
	}
});