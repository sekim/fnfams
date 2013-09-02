<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, peer_cd, peer_nm, peer_nm_eng, parent_peer_cd, peer_depth
	Dim peer_unit_yn, bm_cd, invst_std_rt, invst_min_rt, invst_max_rt
	Dim expt_rtn, tgt_rtn, rmrk, use_yn, work_id
	
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
	tgt_rtn = Request("tgt_rtn")
	rmrk = Request("rmrk")
	use_yn = Request("use_yn")
	work_id = Request("work_id")
	
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "update  am_sgm010 "
	strSQL = strSQL & "set     peer_nm = '" & peer_nm & "', "
	strSQL = strSQL & "        peer_nm_eng = '" & peer_nm_eng & "', "
	strSQL = strSQL & "        parent_peer_cd = '" & parent_peer_cd & "', "
	strSQL = strSQL & "        peer_depth = '" & peer_depth & "', "
	strSQL = strSQL & "        peer_unit_yn = '" & peer_unit_yn & "', "
	strSQL = strSQL & "        bm_cd = '" & bm_cd & "', "
	strSQL = strSQL & "        invst_std_rt = '" & invst_std_rt & "', "
	strSQL = strSQL & "        invst_min_rt = '" & invst_min_rt & "', "
	strSQL = strSQL & "        invst_max_rt = '" & invst_max_rt & "', "
	strSQL = strSQL & "        expt_rtn = '" & expt_rtn & "', "
	strSQL = strSQL & "        tgt_rtn = '" & tgt_rtn & "', "
	strSQL = strSQL & "        rmrk = '" & rmrk & "', "
	strSQL = strSQL & "        use_yn = '" & use_yn & "', "
	strSQL = strSQL & "        work_id = '" & work_id & "' "
	strSQL = strSQL & "where   cust_cd = '" & cust_cd & "' "
	strSQL = strSQL & "and     peer_cd = '" & peer_cd & "'"
	ConnFF.Execute strSQL
	'response.write(strSQL)
%>