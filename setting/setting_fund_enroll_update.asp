<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, fund_cd, fund_nm, fund_snm, qty_unit, fst_set_qty, fst_set_amt, invst_pool_gb, fst_trd_dt, set_dt, sell_co_nm, invst_std_rt, invst_min_rt, invst_max_rt, work_id
	
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
	work_id = Request("work_id")

	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "update AM_FBM010 set fund_nm = '" + fund_nm + "', fund_snm = '" + fund_snm + "', set_dt = '" + set_dt + "', fst_trd_dt = '" + fst_trd_dt + "', invst_pool_gb = '" + invst_pool_gb + "', sell_co_nm = '" + sell_co_nm + "', invst_std_rt = '" + invst_std_rt + "', invst_min_rt = '" + invst_min_rt + "', qty_unit = '" + qty_unit + "', fst_set_qty = '" + fst_set_qty + "', fst_set_amt = '" + fst_set_amt + "', invst_max_rt = '" + invst_max_rt + "', work_id = '" + work_id + "' where   cust_cd = '" + cust_cd +"' and     fund_cd = '" + fund_cd + "'"
	ConnFF.Execute strSQL
	'response.write(strSQL)
%>