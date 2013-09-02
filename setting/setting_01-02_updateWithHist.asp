<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, fund_cd, fund_nm, fund_snm, qty_unit, fst_set_qty, fst_set_amt, invst_pool_gb, fst_trd_dt, set_dt, sell_co_nm, invst_std_rt, invst_min_rt, invst_max_rt, fr_dt, co_cd, co_nm, peer_cd, work_id
	
	cust_cd = Request("cust_cd")
	fund_cd = Request("fund_cd")
	fund_nm = Request("fund_nm")
	fund_snm = Request("fund_snm")
	qty_unit = Request("qty_unit")
	fst_set_qty = Request("fst_set_qty")
	fst_set_amt = Request("fst_set_amt")
	invst_pool_gb = Request("invst_pool_gb")
	fst_trd_dt = Request("fst_trd_dt")
	set_dt = Request("set_dt")
	sell_co_nm = Request("sell_co_nm")
	invst_std_rt = Request("invst_std_rt")
	invst_min_rt = Request("invst_min_rt")
	invst_max_rt = Request("invst_max_rt")
	fr_dt = Request("fr_dt")
	co_cd = Request("co_cd")
	co_nm = Request("co_nm")
	peer_cd = Request("peer_cd")
	work_id = Request("work_id")

	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "update AM_FBM010 set fund_nm = '" + fund_nm + "', fund_snm = '" + fund_snm + "', set_dt = '" + set_dt + "', peer_cd = '" + peer_cd + "', fst_trd_dt = '" + fst_trd_dt + "', invst_pool_gb = '" + invst_pool_gb + "', sell_co_nm = '" + sell_co_nm + "', invst_std_rt = '" + invst_std_rt + "', invst_min_rt = '" + invst_min_rt + "', qty_unit = '" + qty_unit + "', fst_set_qty = '" + fst_set_qty + "', fst_set_amt = '" + fst_set_amt + "', invst_max_rt = '" + invst_max_rt + "', work_id = '" + work_id + "' where   cust_cd = '" + cust_cd +"' and     fund_cd = '" + fund_cd + "'"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	
	strSQL = "update am_fbt010 set std_dt = (select to_char(to_date('" & fr_dt & "','yyyymmdd') - 1,'yyyymmdd') from dual) where cust_cd = '" & cust_cd & "' and fund_cd = '" & fund_cd & "' and std_dt = (select max(std_dt) from am_fbt010 where cust_cd = '" & cust_cd & "' and fund_cd = '" & fund_cd & "')"
  'response.write(strSQL)
	ConnFF.Execute strSQL

	strSQL = "insert into am_fbt010 (cust_cd, fund_cd, std_dt, fr_dt, fund_nm, peer_cd, bm_cd, co_cd, co_nm, work_id) select  cust_cd, '" & fund_cd & "', '33330303', '" & fr_dt & "', '" & fund_nm & "', '" & peer_cd & "', bm_cd, '" & co_cd & "', '" & co_nm & "', '" & work_id & "' from am_sgm010 where cust_cd = '" & cust_cd & "' and peer_cd = '" & peer_cd & "'"
	response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>