<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim ConnFF, strSQL
	Dim cust_cd, fund_cd_s, fund_cd, fund_nm, fund_snm, qty_unit, fst_set_qty, fst_set_amt, invst_pool_gb, fst_trd_dt, set_dt, sell_co_nm, invst_std_rt, invst_min_rt, invst_max_rt, fr_dt, co_cd, co_nm, peer_cd, work_id
	
	cust_cd = Request("cust_cd")
	fund_cd_s = Request("fund_cd_s")
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
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	
	strSQL = "update am_fbm010 set parent_gb = '11' where cust_cd = '" & cust_cd &  "' and fund_cd = '" & fund_cd_s & "'"
	ConnFF.Execute strSQL

	strSQL = "INSERT INTO AM_FBM010 "
	strSQL = strSQL & "(CUST_CD, "
	strSQL = strSQL & "FUND_CD, "
	strSQL = strSQL & "FUND_NM, "
	strSQL = strSQL & "FUND_SNM, "
	strSQL = strSQL & "QTY_UNIT, "
	strSQL = strSQL & "FST_SET_QTY, "
	strSQL = strSQL & "FST_SET_AMT, "
	strSQL = strSQL & "INVST_POOL_GB, "
	strSQL = strSQL & "FST_TRD_DT, "
	strSQL = strSQL & "SET_DT, "
	strSQL = strSQL & "SELL_CO_NM, "
	strSQL = strSQL & "INVST_STD_RT, "
	strSQL = strSQL & "INVST_MIN_RT, "
	strSQL = strSQL & "INVST_MAX_RT, "
	strSQL = strSQL & "CO_CD, "
	strSQL = strSQL & "CO_NM, "
	strSQL = strSQL & "PEER_CD, "
	strSQL = strSQL & "BM_CD, "
	strSQL = strSQL & "CO_FUND_CD, "
	strSQL = strSQL & "PARENT_GB, "
	strSQL = strSQL & "CLASS_GB, "
	strSQL = strSQL & "STATUS_GB, "
	strSQL = strSQL & "WORK_ID) "
	strSQL = strSQL & "SELECT   '" & cust_cd & "', "
	strSQL = strSQL & "'" & fund_cd & "', "
	strSQL = strSQL & "'" & fund_nm & "', "
	strSQL = strSQL & "'" & fund_snm & "', "
	strSQL = strSQL & "'" & qty_unit & "', "
	strSQL = strSQL & "'" & fst_set_qty & "', "
	strSQL = strSQL & "'" & fst_set_amt & "', "
	strSQL = strSQL & "'" & invst_pool_gb & "', "
	strSQL = strSQL & "'" & fst_trd_dt & "', "
	strSQL = strSQL & "'" & set_dt & "', "
	strSQL = strSQL & "'" & sell_co_nm & "', "
	strSQL = strSQL & "'" & invst_std_rt & "', "
	strSQL = strSQL & "'" & invst_min_rt & "', "
	strSQL = strSQL & "'" & invst_max_rt & "', "
	strSQL = strSQL & "'" & co_cd & "', "
	strSQL = strSQL & "'" & co_nm & "', "
	strSQL = strSQL & "'" & peer_cd & "', "
	strSQL = strSQL & "bm_cd, "
	strSQL = strSQL & "'00', "
	strSQL = strSQL & "'1M', "
	strSQL = strSQL & "'00', "
	strSQL = strSQL & "'0', "	
	strSQL = strSQL & "'" & work_id & "' "
	strSQL = strSQL & "FROM am_sgm010 "
	strSQL = strSQL & "WHERE cust_cd = '" & cust_cd & "' "
	strSQL = strSQL & "AND peer_cd = '" & peer_cd & "' "
	'response.write(strSQL)
	ConnFF.Execute strSQL
	
	strSQL = "insert into am_fbt010 (cust_cd, fund_cd, std_dt, fr_dt, fund_nm, peer_cd, bm_cd, co_cd, co_nm, work_id) select  cust_cd, '" & fund_cd & "', '33330303', '" & fr_dt & "', '" & fund_nm & "', '" & peer_cd & "', bm_cd, '" & co_cd & "', '" & co_nm & "', '" & work_id & "' from am_sgm010 where cust_cd = '" & cust_cd & "' and peer_cd = '" & peer_cd & "'"
	'response.write(strSQL)
	ConnFF.Execute strSQL

	strSQL = "insert into am_fbm020 values ('" & cust_cd & "', '" & fund_cd_s & "', '" & fund_cd & "', '3', '" & work_id &  "', sysdate)"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>