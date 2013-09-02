<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim ConnFF, strSQL
	Dim cust_cd, fund_cd, fund_nm, fund_snm, qty_unit, fst_set_qty, fst_set_amt, invst_pool_gb, fst_trd_dt, set_dt, sell_co_nm, invst_std_rt, invst_min_rt, invst_max_rt, fr_dt, co_cd, co_nm, peer_cd, work_id
	
	cust_cd = Request("cust_cd")
	peer_cd = Request("peer_cd")
	peer_nm = Request("peer_nm")
	peer_nm_eng = Request("peer_nm_eng")
	parent_peer_cd = Request("parent_peer_cd")
	peer_depth = Request("peer_depth")
	peer_unit_yn = Request("peer_unit_yn")
	bm_cd = Request("bm_cd")
	invst_std_rt = Request("invst_std_rt")
	invst_min_rt = Request("invst_min_rt")
	invst_max_rt = Request("invst_max_rt")
	expt_rtn = Request("expt_rtn")
	tgr_rtn = Request("tgr_rtn")
	rmrk = Request("rmrk")
	use_yn = Request("use_yn")
	work_id = Request("work_id")
	
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "INSERT INTO AM_SGM010 "
	strSQL = strSQL & "(CUST_CD, "
	strSQL = strSQL & "peer_cd, "
	strSQL = strSQL & "peer_nm, "
	strSQL = strSQL & "peer_nm_eng, "
	strSQL = strSQL & "parent_peer_cd, "
	strSQL = strSQL & "peer_depth, "
	strSQL = strSQL & "peer_unit_yn, "
	strSQL = strSQL & "bm_cd, "
	strSQL = strSQL & "invst_std_rt, "
	strSQL = strSQL & "invst_min_rt, "
	strSQL = strSQL & "invst_max_rt, "
	strSQL = strSQL & "expt_rtn, "
	strSQL = strSQL & "tgt_rtn, "
	strSQL = strSQL & "rmrk, "
	strSQL = strSQL & "use_yn, "
	strSQL = strSQL & "work_id) "
	strSQL = strSQL & "VALUES ('" & cust_cd & "', "
	strSQL = strSQL & "'" & peer_cd & "', "
	strSQL = strSQL & "'" & peer_nm & "', "
	strSQL = strSQL & "'" & peer_nm_eng & "', "
	strSQL = strSQL & "'" & parent_peer_cd & "', "
	strSQL = strSQL & "'" & peer_depth & "', "
	strSQL = strSQL & "'" & peer_unit_yn & "', "
	strSQL = strSQL & "'" & bm_cd & "', "
	strSQL = strSQL & "'" & invst_std_rt & "', "
	strSQL = strSQL & "'" & invst_min_rt & "', "
	strSQL = strSQL & "'" & invst_max_rt & "', "
	strSQL = strSQL & "'" & expt_rtn & "', "
	strSQL = strSQL & "'" & tgt_rtn & "', "
	strSQL = strSQL & "'" & rmrk & "', "
	strSQL = strSQL & "'" & use_yn & "', "
	strSQL = strSQL & "'" & work_id & "') "
	'response.write strSQL
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>