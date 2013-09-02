$(function(){
    $('#user_id').focus();
    if($.cookie('fams_user_idsave')) {	//아이디기억되었다면
    	$('#user_id').val($.cookie('fams_user_idsave'));
    	$('#saveId').prop('checked',true);
    }

    $('#btnLogin').click(function(){
    	login($('#user_id').val(), $('#user_pw').val());
        //logintest($('#user_id').val(), $('#user_pw').val());
    });

    $('#user_pw').keydown(function (e){
        if(e.keyCode == 13){
            $('#btnLogin').click();
        }
    });

    //로그인성공시
    function loginOk(id) {
        $.ajax({
            type:'GET',
            url: '/login_ok.asp?id=' + id,
            dataType:'html',
            contentType:'text/html; charset=UTF-8',
            cache: false,
            success: function(html){
            fng.debug.log('ok');
            },
            error: function(){
                fng.debug.log('error');
            },
            complete: function(){
            }
        });
    }

    //POST 방식으로 로그인 정보를 전송한다.
    function postToUrl(url, params, method){
      	method = method || 'POST';	//디폴트 POST
      	var dom = document,
      		form = dom.createElement('form');
      	form.setAttribute('method', method);
      	form.setAttribute('action', url);
        form.setAttribute('accept-charset', 'utf-8');

      	for(var key in params) {
      		var hf = dom.createElement('input');
      		hf.setAttribute('type', 'text');
      		hf.setAttribute('name', key);
      		hf.setAttribute('value', params[key]);
      		form.appendChild(hf);
      	}
      	dom.body.appendChild(form);
      	form.submit();
    }

    function logintest(id,pw){
        var userData = {
                CHK_CD:'OK',
                USER_NM:'TEST',
                PASSWD:'1111',
                CO_CD:'XX901',
                CO_NM:'테스트기금'
            },
            check_cd = userData.CHK_CD,
            check_msg = userData.CHK_MSG,
            staff_yn = userData.STAFF_YN,
            return_url = $('#returnUrl').val(),
            path,
            d1,
            d2,
            params;

        if (check_cd === 'OK') {    //로그인성공
            $.cookie('fams_user_id', $('#user_id').val());  //쿠키값저장
            $.cookie('fams_user_nm', userData.USER_NM);  //쿠키값저장
            $.cookie('fams_user_pw', userData.PASSWD);  //쿠키값저장
            $.cookie('fams_co_cd', userData.CO_CD);  //쿠키값저장
            $.cookie('fams_co_nm', userData.CO_NM);  //쿠키값저장
            $.cookie('fams_staff_yn', staff_yn);  //쿠키값저장
            $.cookie('fams_staff_nm', userData.STAFF_NM);  //쿠키값저장
            $.cookie('fams_staff_tel', userData.STAFF_TEL);  //쿠키값저장

            if (return_url.length === 0) {  //리턴URL이 없다면
                if (staff_yn === 'Y') {
                    return_url = 'setting_01-01'  //관리자는 설정관리로
                } else {
                    return_url = 'portfolio_01-01'  //유저는 포트폴리오로
                }
            }

            path = return_url.split('_');
            d1 = path[0];
            d2 = path[1];
            params = {
                user_id : $('#user_id').val(),
                user_nm : userData.USER_NM,
                co_cd : userData.CO_CD,
                co_nm : userData.CO_NM,
                staff_yn : staff_yn,
                staff_nm : userData.STAFF_NM,
                staff_tel : userData.STAFF_TEL
            };

            loginOk(params.user_id);
            postToUrl('/#' + d1 + '/' + d2, params);

            if ($('#saveId').prop('checked')) { //아이디기억 체크했다면
                $.cookie('fams_user_idsave', $('#user_id').val());  //쿠키값저장
            } else {
                $.removeCookie('fams_user_idsave'); //아이디기억 체크 안했다면 삭제
            }
        } else {
            alert(check_msg);   //로그인 실패
            return;
        }
    }

    //로그인 체크
    function login(id,pw){
        fng.debug.log('login click');
      	function readSuccess(d){
      		var userData = d[0],
    			check_cd = userData.CHK_CD,
    			check_msg = userData.CHK_MSG,
    			staff_yn = userData.STAFF_YN,
    			return_url = $('#returnUrl').val(),
    			path,
    			d1,
    			d2,
    			params;

      		if (check_cd === 'OK') {	//로그인성공
                $.cookie('fams_user_id', $('#user_id').val());  //쿠키값저장
                $.cookie('fams_user_nm', userData.USER_NM);  //쿠키값저장
                // $.cookie('fams_user_pw', userData.PASSWD);  //쿠키값저장
                $.cookie('fams_fngidx', userData.FNGIDX);  //쿠키값저장
                $.cookie('fams_co_cd', userData.CO_CD);  //쿠키값저장
                $.cookie('fams_co_nm', userData.CO_NM);  //쿠키값저장
                $.cookie('fams_staff_yn', staff_yn);  //쿠키값저장
                $.cookie('fams_staff_nm', userData.STAFF_NM);  //쿠키값저장
                $.cookie('fams_staff_tel', userData.STAFF_TEL);  //쿠키값저장
                
                if (return_url.length === 0) {  //리턴URL이 없다면
                    return_url = window.location.toString().split('#')[1];     
                    if (return_url && return_url.length === 0 || !return_url) {
                        if (staff_yn === 'Y') {
                            return_url = 'setting/customer_enroll'  //관리자는 설정관리로
                        } else {
                            return_url = 'portfolio/customer_portfolio'  //유저는 포트폴리오로
                        }
                    }
                }

                path = return_url.split('/');
                d1 = path[0];
                d2 = path[1];
                params = {
                    user_id : $('#user_id').val(),
                    user_nm : userData.USER_NM,
                    co_cd : userData.CO_CD,
                    co_nm : userData.CO_NM,
                    staff_yn : staff_yn,
                    staff_nm : userData.STAFF_NM,
                    staff_tel : userData.STAFF_TEL
                };

                loginOk(params.user_id);
                postToUrl('/#' + d1 + '/' + d2, params);

      			if ($('#saveId').prop('checked')) {	//아이디기억 체크했다면
      				$.cookie('fams_user_idsave', $('#user_id').val());	//쿠키값저장
      			} else {
      				$.removeCookie('fams_user_idsave');	//아이디기억 체크 안했다면 삭제
      			}
      		} else {
      			alert(check_msg);	//로그인 실패
      			return;
      		}
      	}

      	function readError(data, status, err){
      		fng.debug.log(data.status).log(err);
      	}

      	function readDone(){

      	}

      	var param = {id:id, pw:pw};

      	ajaxSettings = {
            url: '/login_check.asp',
            param: param,
            success: readSuccess,
            error: readError,
            done: readDone
        }

        fng.ajax.getJson(ajaxSettings);
    }
});