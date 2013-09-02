<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%

	Dim ConnFF, strSQL
	Dim cust_cd, fund_cd, fund_nm, fr_dt, co_cd, co_nm, peer_cd, work_id
	
	cust_cd = Request("cust_cd")
	fund_cd = Request("fund_cd")
	fund_nm = Request("fund_nm")
	fr_dt = Request("fr_dt")
	co_cd = Request("co_cd")
	co_nm = Request("co_nm")
	peer_cd = Request("peer_cd")
	work_id = Request("work_id")
	
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "insert into am_fbt010 (cust_cd, fund_cd, std_dt, fr_dt, fund_nm, peer_cd, bm_cd, co_cd, co_nm, work_id) select  cust_cd, '" & fund_cd & "', '33330303', '" & fr_dt & "', '" & fund_nm & "', '" & peer_cd & "', bm_cd, '" & co_cd & "', '" & co_nm & "', '" & work_id & "' from am_sgm010 where cust_cd = '" & cust_cd & "' and peer_cd = '" & peer_cd & "'"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>